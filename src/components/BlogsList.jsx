import React from "react";
import { Link } from "react-router-dom";

const BlogsList = ({ blogs, title }) => {
  // const blogs = props.blogs;
  return (
    <div>
      <h2>{title}</h2>
      {blogs.map((blog) => (
        <div className="blog-preview" key={blog.id}>
          <Link to={`/blogs/${blog.id}`}>
            <h2>{blog.title}</h2>
          </Link>
          <p>written by {blog.author}</p>
        </div>
      ))}
    </div>
  );
};

export default BlogsList;
