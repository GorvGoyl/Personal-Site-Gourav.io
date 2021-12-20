import { BetaAnalyticsDataClient } from "@google-analytics/data";
import { google } from "googleapis";
import { NextApiRequest, NextApiResponse } from "next";

export default async function pageViews(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<NextApiResponse> {
  const startDate = (req.query.startDate as string) || "2020-01-01";
  const slug = req.body as string[];

  try {
    const auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: process.env.GA_GOOGLE_CLIENT_EMAIL,
        client_id: process.env.GA_GOOGLE_CLIENT_ID,
        private_key: process.env.GA_GOOGLE_PRIVATE_KEY,
      },
    });

    // Using a default constructor instructs the client to use the credentials
    // specified in GOOGLE_APPLICATION_CREDENTIALS environment variable.
    const analyticsDataClient = new BetaAnalyticsDataClient({
      auth,
    });

    // Runs a simple report.
    // eslint-disable-next-line no-inner-declarations
    const response = await analyticsDataClient.runReport({
      property: `properties/${process.env.GA_PROPERTY_ID}`,
      dateRanges: [
        {
          startDate: startDate,
          endDate: "today",
        },
      ],
      dimensionFilter: {
        filter: {
          inListFilter: {
            values: slug,
          },
          fieldName: "pagePath",
          // stringFilter: {
          //   value: slug,
          // },
        },
      },
      dimensions: [
        {
          name: "pagePath",
        },
      ],
      metrics: [
        {
          name: "screenPageViews",
        },
      ],
    });

    const data = {};
    response[0].rows.forEach((x) => {
      data[x.dimensionValues[0].value] = x.metricValues[0].value;
    });

    res.status(200).json({
      data,
    });

    return res;
  } catch (err: any) {
    console.log(err);
    res.status(500).json({ error: err.message });
    return res;
  }
}
