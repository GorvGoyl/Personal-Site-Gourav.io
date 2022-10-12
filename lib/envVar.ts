export const isClient = typeof window !== "undefined";
export const isServer = typeof window === "undefined";
export const isProd = process.env.NEXT_PUBLIC_VERCEL_ENV === "production"; //avoid process.env.NODE_ENV as it always returns "production"

export const NEXT_PUBLIC_BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "";

NEXT_PUBLIC_BASE_URL || console.error("NEXT_PUBLIC_BASE_URL");

export const BUTTONDOWN_API_KEY = process.env.BUTTONDOWN_API_KEY || "";

isServer && (BUTTONDOWN_API_KEY || console.error("BUTTONDOWN_API_KEY"));

export const MOCK_SUBSCRIBE_API = process.env.MOCK_SUBSCRIBE_API || "";

isServer && (MOCK_SUBSCRIBE_API || console.error("MOCK_SUBSCRIBE_API"));

export const GA_GOOGLE_CLIENT_EMAIL = process.env.GA_GOOGLE_CLIENT_EMAIL || "";

isServer && (GA_GOOGLE_CLIENT_EMAIL || console.error("GA_GOOGLE_CLIENT_EMAIL"));

export const GA_GOOGLE_CLIENT_ID = process.env.GA_GOOGLE_CLIENT_ID || "";

isServer && (GA_GOOGLE_CLIENT_ID || console.error("GA_GOOGLE_CLIENT_ID"));

export const GA_GOOGLE_PRIVATE_KEY = process.env.GA_GOOGLE_PRIVATE_KEY || "";

isServer && (GA_GOOGLE_PRIVATE_KEY || console.error("GA_GOOGLE_PRIVATE_KEY"));

export const NOTION_API_KEY = process.env.NOTION_API_KEY || "";

isServer && (NOTION_API_KEY || console.error("NOTION_API_KEY"));

export const NOTION_BLOGPOSTS_DB = process.env.NOTION_BLOGPOSTS_DB || "";

isServer && (NOTION_BLOGPOSTS_DB || console.error("NOTION_BLOGPOSTS_DB"));

export const GA_PROPERTY_ID = process.env.GA_PROPERTY_ID || "";

isServer && (GA_PROPERTY_ID || console.error("GA_PROPERTY_ID"));
