// also replicate change in generate-rss.js
export const webpackPath = '/_next/static/media/pages';

export async function getSlugViews(slugPaths: string[]) {
    const requestHeaders = new Headers();
    requestHeaders.set('Content-Type', 'application/json');
    // requestHeaders.set("Authorization", token);

    // console.log("calling api page-views", slugPaths);
    const res = await fetch('/api/page-views', {
        body: JSON.stringify(slugPaths),
        headers: requestHeaders,
        method: 'POST',
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
    if (str.length === 0) {
        return hash;
    }
    for (i = 0; i < str.length; i++) {
        chr = str.charCodeAt(i);
        hash = (hash << 5) - hash + chr;
        hash |= 0; // Convert to 32bit integer
    }
    return hash;
}
