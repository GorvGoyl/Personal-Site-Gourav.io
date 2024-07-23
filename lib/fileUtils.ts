import fs from "fs";
import https from "https";
import path from "path";
/**
 * Download a resource from `url` to `dest`.
 * @param {string} url - Valid URL to attempt download of resource
 * @param {string} dest - Valid path to save the file. ex: `\Users\mee\docs\file.txt`
 * @param {boolean} duplicateCase - how to handle when a file already exists at `dest`
 * @returns {Promise<void>} - Returns asynchronously when successfully completed download
 */
export function downloadFile(
  url: string,
  dest: string,
  duplicateCase: "overwrite" | "skip" | "throw error"
): Promise<void> {
  return new Promise<void>((resolve, reject) => {
    let doesFileExist = false;
    // Check if file exists before hitting network
    try {
      doesFileExist = fs.existsSync(dest);
    } catch (e: any) {
      console.error("doesFileExist Error: ", e);
    }

    if (doesFileExist) {
      if (duplicateCase === "skip") {
        resolve();
        return;
      } else if (duplicateCase === "throw error") {
        throw new Error(`file already exist: ${dest}`);
      }
    }

    const request = https.get(url, (response) => {
      if (response.statusCode === 200) {
        ensureDirectoryExistence(dest);
        const file = fs.createWriteStream(dest, { flags: "w" });
        file.on("finish", () => {return resolve()});
        file.on("error", (err: any) => {
          console.error("writing error", err);
          file.close();
          fs.unlink(dest, () => {return reject(err.message)}); // Delete temp file
        });
        response.pipe(file);
      } else if (response.statusCode === 302 || response.statusCode === 301) {
        //Recursively follow redirects, only a 200 will resolve.
        void downloadFile(
          response.headers.location || "",
          dest,
          duplicateCase
        ).then(() => {return resolve()});
      } else {
        reject(
           new Error(`Server responded with ${response.statusCode}: ${response.statusMessage}`)
        );
      }
    });

    request.on("error", (err) => {
      console.error("request error", err);
      reject(err.message);
    });
  });
}

/**
 * create folder if doesn't exist
 */
function ensureDirectoryExistence(filePath: string) {
  const dirname = path.dirname(filePath);
  if (fs.existsSync(dirname)) {
    return;
  }
  ensureDirectoryExistence(dirname);
  fs.mkdirSync(dirname);
}
