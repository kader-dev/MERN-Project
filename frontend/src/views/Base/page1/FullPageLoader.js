import Spinner from "./spinner.gif";
import React from "react";
const FullPageLoader = () => {
  return (
    <div className="fp-container">
      <img src={Spinner} className="fp-loader" alt="loading" />
    </div>
  );
};

export default FullPageLoader;
