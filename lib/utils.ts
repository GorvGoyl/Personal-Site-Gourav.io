export const isProd = process.env.NODE_ENV === "production";

// also replicate change in generate-rss.js
export const webpackPath = "/_next/static/media/pages";

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
