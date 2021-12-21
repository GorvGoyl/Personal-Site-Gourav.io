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
export function readableDate(date: string): string {
  try {
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
