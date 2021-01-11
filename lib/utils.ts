export const isProd = process.env.NODE_ENV === "production";

export const webpackPath = "/_next/static/media/pages";

export function readableDate(date: string): string {
  const dateFormatter = new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
  const dateString = dateFormatter.format(new Date(date));
  return dateString;
}
