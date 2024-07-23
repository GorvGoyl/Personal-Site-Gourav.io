// credits: Lee Robinson

import type { NextApiRequest, NextApiResponse } from "next";
import { BUTTONDOWN_API_KEY, MOCK_SUBSCRIBE_API, isProd } from "../../lib/envVar";


const PROD_API = "https://api.buttondown.email/v1/subscribers";
const PROD_API_KEY = BUTTONDOWN_API_KEY;
const MOCK_API = MOCK_SUBSCRIBE_API;
const isMOCK = false;

export default async function subscribe(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<NextApiResponse> {
  const { email, referrer_url, referrer } = req.body;

  let addSubscriberAPI: string;
  let API_KEY: string;

  if (!isProd && isMOCK) {
    addSubscriberAPI = MOCK_API;
    API_KEY = "";
  } else {
    addSubscriberAPI = PROD_API;
    API_KEY = PROD_API_KEY;
  }

  if (!email) {
    res.status(400).json({ error: "Email is required" });
    return res;
  }

  const tags = [] as string[];
  if (referrer) {tags.push(referrer as string);}
  if (referrer_url) {tags.push(referrer_url as string);}

  try {
    const response = await fetch(addSubscriberAPI, {
      body: JSON.stringify({
        email,
        tags,
        referrer_url: referrer_url.substring(0, 500), // max length can be 500
        notes: referrer,
      }),
      headers: {
        Authorization: `Token ${API_KEY}`,
        "Content-Type": "application/json",
      },
      method: "POST",
    });

    if (response.status >= 400) {
      const text = await response.text();

      if (text.includes("already subscribed")) {
        res.status(400).json({
          error: `You're already subscribed to the newsletter :)`,
        });
        return res;
      }

      res.status(400).json({
        error: text,
      });
      return res;
    }

    res.status(201).json({ error: "" });
    return res;
  } catch (error: any) {
    res.status(500).json({ error: error.message || error.toString() });
    return res;
  }
}
