/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/prop-types */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable no-underscore-dangle */
/* eslint-disable react/display-name */
import { useContext, createContext } from "react";

export const CMSContext = createContext({});

export default (Component) => (props) => {
  if (props.__next_ssg_error) {
    // render error page
    return <h1>{props.__next_ssg_error} Error</h1>;
  }

  return (
    <CMSContext.Provider value={props.__next_ssg_data || {}}>
      <Component {...props} />
    </CMSContext.Provider>
  );
};
