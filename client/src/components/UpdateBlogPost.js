import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardActionArea from "@material-ui/core/CardActionArea";
import TextField from "@material-ui/core/TextField";

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

const UpdateBlogPost = (props) => {
  const classes = useStyles();
  const [state, setState] = useState({
    title: "",
    content: "",
    slug: "",
    user: "",
  });

  const { title, slug, user, content } = state;

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_URL}/blogpost/${props.match.params.slug}`)
      .then((res) => {
        const { title, content, slug, user } = res.data;
        setState({ ...state, title, content, slug, user });
      })
      .catch((err) => {
        console.log(err.response);
      });
  }, []);

  const onChange = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    await axios
      .put(`${process.env.REACT_APP_URL}/blogpost/${slug}`, {
        title,
        content,
        user,
      })
      .then((res) => {
        console.log(res);
        const { title, content, slug, user } = res.data;
        setState({ ...state, title, content, slug, user });
        alert(`Blog Post ${title} is Updated`);
      })
      .catch((err) => {
        console.log(err.response);
      });
  };

  return (
    <div className={classes.root}>
      <Typography variant="h2" style={{ textAlign: "center" }}>
        {title}
      </Typography>

      <div>
        <Card>
          <CardActionArea style={{ margin: "2em", textAlign: "center" }}>
            <form
              style={{ marginLeft: "9em" }}
              noValidate
              autoComplete="off"
              onSubmit={onSubmit}
            >
              <div style={{ width: "60em" }}>
                <TextField
                  itemType="text"
                  placeholder="Title"
                  name="title"
                  required
                  fullWidth
                  value={title}
                  onChange={onChange}
                />
              </div>
              <div style={{ height: "20em", width: "60em" }}>
                <TextField
                  itemType="text"
                  multiline
                  required
                  fullWidth
                  rows={12}
                  placeholder="Content"
                  name="content"
                  value={content}
                  onChange={onChange}
                />
              </div>
              <div style={{ width: "60em" }}>
                <TextField
                  itemType="text"
                  fullWidth
                  placeholder="Your Name"
                  name="user"
                  value={user}
                  onChange={onChange}
                />
              </div>
              <br />
              <div>
                <Button
                  style={{ width: "20em" }}
                  variant="contained"
                  color="primary"
                  type="submit"
                >
                  Update
                </Button>
              </div>
            </form>
          </CardActionArea>
        </Card>
      </div>
    </div>
  );
};

export default UpdateBlogPost;
