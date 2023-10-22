import React from "react";
import { Helmet } from "react-helmet";

const Meta = (props) => {
  return (
    <Helmet>
      <meta charSet="urf-8" />
      <title>{props.title}</title>
      {/* <link rel='canonical' href='http://swiperjs.com' /> */}
    </Helmet>
  );
};

export default Meta;
