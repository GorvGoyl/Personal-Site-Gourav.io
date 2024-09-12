// also replicate change in generate-rss.js
export const webpackPath = "/_next/static/media/pages";

export async function getSlugViews(slugPaths: string[]) {
  const requestHeaders = new Headers();
  requestHeaders.set("Content-Type", "application/json");
  // requestHeaders.set("Authorization", token);

  // console.log("calling api page-views", slugPaths);
  const res = await fetch("/api/page-views", {
    body: JSON.stringify(slugPaths),
    headers: requestHeaders,
    method: "POST",
  });

  // console.log("got response", res);
  const resObject = await res.json();
  // console.log("Got data", resObject);
  return resObject;
}

/**

convert half left of number to 000  
ex:  
9 -> 9  
19 -> 10  
192 -> 100  
1945 -> 1900  
19458 -> 19000
*/
export function roundUpViewCount(num: string) {
  if (parseInt(num) < 10) {
    return parseInt(num);
  }
  const precision = Math.pow(10, Math.ceil(num.length / 2));
  return (Math.floor(parseInt(num) / precision) * precision).toLocaleString();
}

// accepts: YYYY-MM-DD or YYYY-M-D
export function getReadableDate(date: string): string {
  try {
    if (!date) {return "";}
    const dateFormatter = new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });

    const YYYY = date.split("-")[0];

    // convert M->MM i.e. 2->02
    const MM =
      date.split("-")[1].length === 1
        ? `0${date.split("-")[1]}`
        : date.split("-")[1];

    // convert D->DD i.e. 2->02
    const DD =
      date.split("-")[2].length === 1
        ? `0${date.split("-")[2]}`
        : date.split("-")[2];

    // YYYY-MM-DD
    const properDateString = `${`${YYYY}-${MM}-${DD}`}`;

    const dateObj = new Date(properDateString);

    const dateString = dateFormatter.format(dateObj);

    return dateString;
  } catch (e) {
    console.log(`Error in readableDate: ${JSON.stringify(e)}`);
    return "";
  }
}

/**
 * Returns a hash code from a string
 * @param  {String} str The string to hash.
 * @return {Number}    A 32bit integer
 * @ref https://stackoverflow.com/a/7616484/3073272
 */
export function hashCode(str: string): number {
  let hash = 0,
    i: number,
    chr: number;
  if (str.length === 0) {return hash;}
  for (i = 0; i < str.length; i++) {
    chr = str.charCodeAt(i);
    hash = (hash << 5) - hash + chr;
    hash |= 0; // Convert to 32bit integer
  }
  return hash;
}

/**
 * Retries a given operation a specified number of times with a delay between each attempt.
 * If all attempts fail, the function throws an error.
 *
 * @param operation - A function to execute with retries.
 * @param maxAttempts - The maximum number of retry attempts.
 * @param initialDelayMs - The initial delay between retries in milliseconds.
 * @returns - The result of the operation, or throws an error if all attempts fail.
 */

export async function retryWithExponentialBackoff<T>(
    operation: () => T | Promise<T>,
    maxAttempts: number,
    initialDelayMs: number,
): Promise<T> {
    let delayMs = initialDelayMs;
    for (let attempt = 1; attempt <= maxAttempts; attempt++) {
        try {
            return await operation();
        } catch (error) {
            if (attempt === maxAttempts) {
                console.error('Max retry attempts reached. Error:', error);
                throw error;
            }
            // Exponential backoff delay
            await new Promise((resolve) => {
               setTimeout(resolve, delayMs);
           });
            delayMs *= 2;
        }
    }
    // This line will never be reached due to the throw in the loop,but TypeScript requires it for type safety
    throw new Error('Max retry attempts reached');
}
