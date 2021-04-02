export const isProd = process.env.NODE_ENV === "production";

// also replicate change in generate-rss.js
export const webpackPath = "/_next/static/media/pages";

// YYYY-MM-DD or YYYY-M-D
export function readableDate(date: string): string {
  const dateFormatter = new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
  console.log("date: " + date);

  const YYYY = date.split("-")[0];

  //convert M->MM i.e. 2->02
  const MM =
    date.split("-")[1].length == 1
      ? "0" + date.split("-")[1]
      : date.split("-")[1];

  //convert D->DD i.e. 2->02
  const DD =
    date.split("-")[2].length == 1
      ? "0" + date.split("-")[2]
      : date.split("-")[2];

  console.log("YYYY + MM + DD: " + YYYY + MM + DD);

  const dateObj = new Date(YYYY + MM + DD);

  console.log("dateObj: " + dateObj);
  const dateString = dateFormatter.format(dateObj);
  console.log("dateString: " + dateString);

  return dateString;
}
