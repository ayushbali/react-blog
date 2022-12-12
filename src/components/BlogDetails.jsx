import React from "react";
import { useParams, useHistory } from "react-router-dom";
import useFetch from "../useFetch";
const BlogDetails = () => {
  const { id } = useParams();
  const history = useHistory();
  const {
    data: blog,
    isLoading,
    err,
  } = useFetch(`http://localhost:8000/blogs/${id}`);

  const handleDelete = () => {
    fetch(`http://localhost:8000/blogs/${id}`, {
      method: "DELETE",
    }).then(() => {
      console.log("blog deleted...");
      history.push("/");
    });
  };
  return (
    <div className="blog-details">
      {isLoading && <div>Loading...</div>}
      {err && <div>{err}</div>}
      {blog && (
        <article>
          <h2>{blog.title}</h2>
          <p>Written by {blog.author}</p>
          <div> {blog.body} </div>
          <button onClick={handleDelete}>Delete blog</button>
        </article>
      )}
    </div>
  );
};

export default BlogDetails;
