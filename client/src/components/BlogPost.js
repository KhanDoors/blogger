import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import CardHeader from "@material-ui/core/CardHeader";

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

const BlogPost = (props) => {
  const classes = useStyles();
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
    <div className={classes.root}>
      <Card>
        <CardHeader
          style={{ textAlign: "center" }}
          title={blogPost.title}
          subheader={new Date().toLocaleString()}
        />

        <CardMedia
          className={classes.media}
          image="https://www.bloomsbyheinau.com/assets/images/purple-flowers-header.jpg"
          title="My Blog"
        />
      </Card>

      <div>
        <Card>
          <CardContent>
            <Typography variant="h5" gutterBottom>
              Author: {blogPost.user}
            </Typography>
            <Typography variant="h6" gutterBottom>
              Created: {new Date(blogPost.createdAt).toLocaleString()}
            </Typography>
            <Typography variant="h4" gutterBottom>
              {blogPost.content}
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
    </div>
  );
};

export default BlogPost;
