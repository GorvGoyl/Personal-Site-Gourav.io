/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable no-underscore-dangle */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { useContext } from "react";

import { CMSContext } from "./with-cms-page";

export default function CMS({ endpoint, children }) {
  const data = useContext(CMSContext);

  if (typeof data[endpoint] !== "undefined") {
    // render the value
    if (typeof children === "function") {
      return children(data[endpoint]);
    }
    return data[endpoint];
  }

  const IS_SSG =
    typeof window === "undefined" &&
    typeof global !== "undefined" &&
    global.__next_ssg_requests;

  // data not ready, still in SSG
  if (IS_SSG) {
    global.__next_ssg_requests.push(endpoint);
  }

  return null;
}
