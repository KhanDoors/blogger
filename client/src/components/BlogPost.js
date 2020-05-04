import React, { useState, useEffect } from "react";
import axios from "axios";

const BlogPost = (props) => {
  const [blogPost, setBlogPost] = useState("");

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_URL}/blogpost/${props.match.params.slug}`)
      .then((res) => setBlogPost(res.data))
      .catch((err) => {
        console.log(err.response);
      });
  }, []);

  return (
    <div>
      <h1>{blogPost.title}</h1>
      <h3>{blogPost.content}</h3>
      <h3>{blogPost.user}</h3>
      <h3>{new Date(blogPost.createdAt).toLocaleString()}</h3>
    </div>
  );
};

export default BlogPost;
