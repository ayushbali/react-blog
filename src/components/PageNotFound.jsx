import React from "react";
import { Link } from "react-router-dom";

const PageNotFound = () => {
  return (
    <div>
      <p>Sorry this page does not exists</p>
      <p>yeh page maujood nahi hai</p>
      <Link to="/">Click here to go back</Link>
    </div>
  );
};

export default PageNotFound;
