import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import CardHeader from "@material-ui/core/CardHeader";
import renderHTML from "react-render-html";
import { getUser } from "../components/Utils";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    "& > *": {
      margin: "1rem",
      width: "100vw",
      backgroundColor: "violet",
    },
  },
  button: {
    margin: theme.spacing(1),
  },
  media: {
    height: 0,
    paddingTop: "25%", // 16:9
  },
}));

const Home = () => {
  const classes = useStyles();
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

  const deleteConfirm = (slug) => {
    let answer = window.confirm(
      "Are you sure you want to delete this Blog post"
    );
    if (answer) {
      deletePost(slug);
    }
  };

  const deletePost = (slug) => {
    console.log("delete", slug);
    axios
      .delete(`${process.env.REACT_APP_URL}/blogpost/${slug}`)
      .then((res) => {
        alert(res.data.message);
        getPosts();
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className={classes.root}>
      <Card>
        <CardHeader
          style={{ textAlign: "center" }}
          title="Enjoy a Blog Post"
          subheader={new Date().toLocaleString()}
        />

        <CardMedia
          className={classes.media}
          image="https://hgtvhome.sndimg.com/content/dam/images/hgtv/stock/2018/2/27/0/iStock-purple-geraniums-542945456.jpg.rend.hgtvcom.966.725.suffix/1519754224444.jpeg"
          title="My Blog"
        />
      </Card>

      {blogPosts.map((blog, i) => (
        <div key={blog._id}>
          <Card>
            <CardContent>
              <Link style={{ textDecoration: "none" }} to={`/${blog.slug}`}>
                <Typography
                  align="center"
                  variant="h2"
                  color="primary"
                  gutterBottom
                >
                  {blog.title}
                </Typography>
              </Link>
              <Typography variant="h4" gutterBottom>
                {renderHTML(blog.content.substring(0, 75))}
              </Typography>
              <div style={{ textAlign: "center" }}>
                <Typography variant="h5" gutterBottom>
                  Author: {blog.user}
                </Typography>
                <Typography variant="h6" gutterBottom>
                  Created: {new Date(blog.createdAt).toLocaleString()}
                </Typography>
                {getUser() && (
                  <div>
                    <Link
                      style={{ textDecoration: "none" }}
                      to={`/update/${blog.slug}`}
                    >
                      <Button
                        variant="contained"
                        color="primary"
                        className={classes.button}
                      >
                        Update
                      </Button>
                    </Link>

                    <Button
                      variant="contained"
                      color="secondary"
                      className={classes.button}
                      onClick={() => deleteConfirm(blog.slug)}
                    >
                      Delete
                    </Button>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      ))}
    </div>
  );
};

export default Home;
