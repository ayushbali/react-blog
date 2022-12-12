import React, { useState } from "react";
import { useHistory } from "react-router-dom";
const Create = () => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [author, setAuthor] = useState("");

  const history = useHistory();
  // handle submit
  const handleSubmit = (e) => {
    e.preventDefault();
    const blog = { title, body, author };
    // console.log(blog);

    // Making a POST req
    fetch("http://localhost:8000/blogs", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(blog),
    }).then(() => {
      console.log("new blog added...");
      history.push("/");
    });
  };

  return (
    <div className="create">
      <h2>Add a new Blog!</h2>
      <form>
        <label>Blog title</label>
        <input
          type="text"
          required
          value={title}
          onChange={(e) => {
            let value = e.target.value;
            setTitle(value);
            console.log(e.target.value);
          }}
        />
        <label>Blog body:</label>
        <textarea
          required
          value={body}
          onChange={(e) => {
            let val = e.target.value;
            setBody(val);
          }}
        ></textarea>
        <label>Blog author</label>
        <input
          value={author}
          onChange={(e) => {
            let val = e.target.value;
            setAuthor(val);
            console.log("Current selected author is : " + val);
          }}
        ></input>
        <button onClick={handleSubmit}>Add Blog</button>
      </form>
      <h3>{title}</h3>
      <p>{body}</p>
      <p> {author}</p>
    </div>
  );
};

export default Create;
