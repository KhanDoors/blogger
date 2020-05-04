import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Home = () => {
  const [blogPosts, setBlogPosts] = useState([]);

  const getPosts = () => {
    axios
      .get(`${process.env.REACT_APP_URL}/blogpost`)
      .then((res) => {
        setBlogPosts(res.data);
      })
      .catch((err) => {
        console.log(err.response);
      });
  };

  useEffect(() => {
    getPosts();
  }, []);

  return (
    <div>
      <h1>Blog Posts</h1>
      {blogPosts.map((blog, i) => (
        <div key={blog._id}>
          <Link to={`/${blog.slug}`}>
            <h2>{blog.title}</h2>
          </Link>
          <p>{blog.content.substring(0, 100)}</p>
          <h5>{blog.user}</h5>
          <h5>{new Date(blog.createdAt).toLocaleString()}</h5>
        </div>
      ))}
    </div>
  );
};

export default Home;
