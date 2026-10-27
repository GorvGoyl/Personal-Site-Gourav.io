import { randomBytes } from 'crypto';
import fs from 'fs';
import http from 'http';
import type { AddressInfo } from 'net';
import os from 'os';
import path from 'path';
import { afterAll, afterEach, beforeAll, beforeEach, describe, expect, it, vi } from 'vitest';
import { downloadFile } from '../lib/fileUtils';

const image = randomBytes(100_000);
/** requests the server got, per path */
let requestCounts: Record<string, number> = {};

/** serves `image`, or half of it before the connection drops, or redirects */
const server = http.createServer((request, response) => {
    const url = request.url ?? '';
    requestCounts[url] = (requestCounts[url] ?? 0) + 1;
    // flaky.png drops the first connection only
    if (url === '/interrupted.png' || (url === '/flaky.png' && requestCounts[url] === 1)) {
        response.writeHead(200, { 'content-length': image.length });
        response.write(image.subarray(0, image.length / 2), () => {
            response.destroy();
        });
    } else if (url === '/image.png' || url === '/flaky.png') {
        response.writeHead(200, { 'content-length': image.length });
        response.end(image);
    } else if (url === '/moved.png') {
        response.writeHead(302, { location: '/image.png' });
        response.end();
    } else if (url === '/moved-to-missing.png') {
        response.writeHead(302, { location: '/missing.png' });
        response.end();
    } else {
        response.writeHead(404);
        response.end();
    }
});

let baseUrl = '';
let dir = '';

/** downloads `urlPath` from the server to `name` in `dir`, retrying without waiting */
async function download(urlPath: string, name = 'image.png') {
    await downloadFile(`${baseUrl}${urlPath}`, path.join(dir, name), 'overwrite', 0);
}

beforeAll(async () => {
    await new Promise<void>((resolve) => {
        server.listen(0, '127.0.0.1', resolve);
    });
    baseUrl = `http://127.0.0.1:${(server.address() as AddressInfo).port}`;
});

afterAll(() => {
    server.closeAllConnections();
    server.close();
});

beforeEach(() => {
    dir = fs.mkdtempSync(path.join(os.tmpdir(), 'download-test-'));
    requestCounts = {};
    // failed attempts are logged
    vi.spyOn(console, 'warn').mockImplementation(() => {});
    vi.spyOn(console, 'error').mockImplementation(() => {});
});

afterEach(() => {
    vi.restoreAllMocks();
    fs.rmSync(dir, { recursive: true, force: true });
});

describe('downloadFile', () => {
    it('saves the whole response', async () => {
        await download('/image.png');
        expect(fs.readdirSync(dir)).toEqual(['image.png']);
        expect(fs.readFileSync(path.join(dir, 'image.png'))).toEqual(image);
    });

    it('leaves no file behind when every attempt gets cut off', async () => {
        await expect(download('/interrupted.png')).rejects.toThrow(`couldn't download ${path.join(dir, 'image.png')}`);
        expect(requestCounts['/interrupted.png']).toBe(3);
        expect(fs.readdirSync(dir)).toEqual([]);
    });

    it('keeps the file it was to replace when the download fails', async () => {
        fs.writeFileSync(path.join(dir, 'image.png'), 'previous');
        await expect(download('/interrupted.png')).rejects.toThrow();
        expect(fs.readdirSync(dir)).toEqual(['image.png']);
        expect(fs.readFileSync(path.join(dir, 'image.png'), 'utf8')).toBe('previous');
    });

    it('retries a download that got cut off', async () => {
        await download('/flaky.png');
        expect(requestCounts['/flaky.png']).toBe(2);
        expect(fs.readdirSync(dir)).toEqual(['image.png']);
        expect(fs.readFileSync(path.join(dir, 'image.png'))).toEqual(image);
    });

    it('follows redirects', async () => {
        await download('/moved.png');
        expect(fs.readFileSync(path.join(dir, 'image.png'))).toEqual(image);
    });

    it('fails when the redirect target fails', async () => {
        await expect(download('/moved-to-missing.png')).rejects.toHaveProperty(
            'cause.message',
            'Server responded with 404: Not Found',
        );
        expect(fs.readdirSync(dir)).toEqual([]);
    });
});
