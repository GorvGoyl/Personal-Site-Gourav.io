// credits: Lee Robinson

// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { NextApiRequest, NextApiResponse } from "next";

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
// export default (req: NextApiRequest, res: NextApiResponse) => {
//   res.statusCode = 200;
//   res.json({ name: "John Doe" });
// };

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ error: "Email is required" });
  }

  try {
    const API_KEY = process.env.BUTTONDOWN_API_KEY;
    const response = await fetch(
      `https://api.buttondown.email/v1/subscribers`,
      {
        body: JSON.stringify({
          email,
          tags: ["test.io"],
        }),
        headers: {
          Authorization: `Token ${API_KEY}`,
          "Content-Type": "application/json",
        },
        method: "POST",
      }
    );

    console.log("response: " + response.status);
    if (response.status >= 400) {
      const text = await response.text();

      if (text.includes("already subscribed")) {
        return res.status(400).json({
          error: `You're already subscribed to the newsletter :)`,
        });
      }

      return res.status(400).json({
        error: text,
      });
    }

    return res.status(201).json({ error: "" });
  } catch (error) {
    return res.status(500).json({ error: error.message || error.toString() });
  }
};
