import { randomUUID } from 'crypto';
import fs from 'fs';
import http from 'http';
import https from 'https';
import path from 'path';
import { pipeline } from 'stream/promises';
import { retryWithExponentialBackoff } from './utils';

const maxAttempts = 3;
const maxRedirects = 5;
const redirectStatusCodes = [301, 302, 303, 307, 308];
/** an attempt fails once its connection has been silent this long, so that a stalled download gets retried */
const idleTimeoutMs = 30_000;

/**
 * Download a resource from `url` to `dest`.
 * The response is written to a temporary file next to `dest` that replaces `dest` only once the whole response
 * arrived, so a failed or interrupted download never leaves a partial file at `dest`. Failed attempts are retried.
 * @param {string} url - Valid URL to attempt download of resource
 * @param {string} dest - Valid path to save the file. ex: `\Users\mee\docs\file.txt`
 * @param {boolean} duplicateCase - how to handle when a file already exists at `dest`
 * @param retryDelayMs - wait before the first retry, doubled for each further one
 * @returns {Promise<void>} - Returns asynchronously when successfully completed download
 */
export async function downloadFile(
    url: string,
    dest: string,
    duplicateCase: 'overwrite' | 'skip' | 'throw error',
    retryDelayMs = 1000,
): Promise<void> {
    // Check if file exists before hitting network
    if (fs.existsSync(dest)) {
        if (duplicateCase === 'skip') {
            return;
        }
        if (duplicateCase === 'throw error') {
            throw new Error(`file already exist: ${dest}`);
        }
    }
    fs.mkdirSync(path.dirname(dest), { recursive: true });

    await retryWithExponentialBackoff(
        async () => {
            try {
                await downloadOnce(url, dest);
            } catch (error) {
                const failure = new Error(`couldn't download ${dest}`, { cause: error });
                console.warn(`${failure.message}: ${(error as Error).message}`);
                throw failure;
            }
        },
        maxAttempts,
        retryDelayMs,
    );
}

/** Downloads `url` to a temporary file next to `dest`, then renames it to `dest` */
async function downloadOnce(url: string, dest: string): Promise<void> {
    const response = await get(url, maxRedirects);
    const tempFile = `${dest}.${randomUUID()}.tmp`;
    try {
        const file = fs.createWriteStream(tempFile);
        // rejects if the connection drops before the response ended
        await pipeline(response, file);
        const contentLength = response.headers['content-length'];
        if (contentLength !== undefined && file.bytesWritten !== Number(contentLength)) {
            throw new Error(`got ${file.bytesWritten} of ${contentLength} bytes`);
        }
        fs.renameSync(tempFile, dest);
    } catch (error) {
        fs.rmSync(tempFile, { force: true });
        throw error;
    }
}

/** Requests `url`, and resolves with the response once one arrives with status 200 */
function get(url: string, redirectsLeft: number): Promise<http.IncomingMessage> {
    return new Promise((resolve, reject) => {
        const client = new URL(url).protocol === 'http:' ? http : https;
        const request = client.get(url, { timeout: idleTimeoutMs }, (response) => {
            const { statusCode, statusMessage, headers } = response;
            if (statusCode === 200) {
                resolve(response);
                return;
            }
            // free the connection: there's nothing to save from this response
            response.resume();
            if (statusCode !== undefined && redirectStatusCodes.includes(statusCode) && headers.location) {
                if (redirectsLeft === 0) {
                    reject(new Error(`more than ${maxRedirects} redirects`));
                    return;
                }
                //Recursively follow redirects, only a 200 will resolve.
                resolve(get(new URL(headers.location, url).href, redirectsLeft - 1));
                return;
            }
            reject(new Error(`Server responded with ${statusCode}: ${statusMessage}`));
        });
        request.on('timeout', () => {
            request.destroy(new Error(`no data for ${idleTimeoutMs / 1000} seconds`));
        });
        // stays subscribed after the response arrived: an 'error' without a listener would crash the process
        request.on('error', reject);
    });
}
