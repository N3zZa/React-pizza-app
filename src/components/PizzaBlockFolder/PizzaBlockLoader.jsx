import React from "react";
import ContentLoader from "react-content-loader";

const MyLoader = (props) => (
  <ContentLoader
    speed={1}
    width={315}
    height={475}
    viewBox="0 0 280 475"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    {...props}
  >
    <rect x="10" y="20" rx="100" ry="100" width="260" height="260" />
    <rect x="0" y="297" rx="0" ry="0" width="280" height="26" />
    <rect x="0" y="336" rx="10" ry="10" width="280" height="76" />
    <rect x="0" y="427" rx="10" ry="10" width="280" height="46" />
  </ContentLoader>
);


export default MyLoader;
