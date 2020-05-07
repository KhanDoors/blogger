import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";

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

  return (
    <div className={classes.root}>
      <Typography variant="h2" style={{ textAlign: "center" }}>
        Blog Posts
      </Typography>
      {blogPosts.map((blog, i) => (
        <div key={blog._id}>
          <Card>
            <CardContent>
              <Link to={`/${blog.slug}`}>
                <Typography variant="h2" color="primary" gutterBottom>
                  Title: {blog.title}
                </Typography>
              </Link>
              <Typography variant="h4" gutterBottom>
                {blog.content.substring(0, 100)}
              </Typography>
              <Typography variant="h5" gutterBottom>
                Author: {blog.user}
              </Typography>
              <Typography variant="h6" gutterBottom>
                Created At: {new Date(blog.createdAt).toLocaleString()}
              </Typography>

              <Button
                variant="contained"
                color="primary"
                className={classes.button}
              >
                Update
              </Button>
              <Button
                variant="contained"
                color="secondary"
                className={classes.button}
              >
                Delete
              </Button>
            </CardContent>
          </Card>
        </div>
      ))}
    </div>
  );
};

export default Home;
