import React from "react";

import useFetch from "../useFetch";
import BlogsList from "./BlogsList";

const Home = () => {
  // as we have imported our custom hook useFetch we are destructuring it
  // and our useFetch hook takes in a parameter url.
  const {
    data: blog, // we are importing data as blog
    isLoading,
    err,
  } = useFetch("http://localhost:8000/blogs"); // we want to fetch data from this url and this resource /blogs

  return (
    <div className="home">
      {/* we conditionally render the template */}
      {/* the template will render to the DOM if and only if both sides are true
          for that first the value at LHS should evaluate to true then only it will go to the RHS
      */}
      {err && <div>{err}</div>}
      {isLoading && <div>Loading... </div>}
      {blog && <BlogsList blogs={blog} title="All Blogs" />}
      {/* {data && <BlogsList blogs={data} title="All Blogs" /} */}
    </div>
  );
};

export default Home;
