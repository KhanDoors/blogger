import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import Button from "@material-ui/core/Button";
import axios from "axios";
import Typography from "@material-ui/core/Typography";
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
  media: {
    height: 0,
    paddingTop: "25%", // 16:9
  },
}));

const Create = () => {
  const classes = useStyles();
  const [state, setState] = useState({
    title: "",
    content: "",
    user: "",
  });

  const { title, content, user } = state;

  const onChange = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    // console.table({ title, content, user });
    await axios
      .post(`${process.env.REACT_APP_URL}/blogpost`, { title, content, user })
      .then((res) => {
        console.log(res);
        setState({ title: "", content: "", user: "" });
      })
      .catch((err) => {
        console.log(err.response);
        setState({ title: "", content: "", user: "" });
      });
  };

  return (
    <div className={classes.root}>
      <Card>
        <CardHeader
          style={{ textAlign: "center" }}
          title="Write Something Amazing!"
          subheader={new Date().toLocaleString()}
        />

        <CardMedia
          className={classes.media}
          image="https://i.ytimg.com/vi/DvoSYxYa9Bs/maxresdefault.jpg"
          title="My Blog"
        />
      </Card>
      <Card
        style={{
          margin: "3.5rem",
          textAlign: "center",
        }}
      >
        <CardActionArea>
          <form
            style={{ margin: "2em" }}
            noValidate
            autoComplete="off"
            onSubmit={onSubmit}
          >
            <div style={{ width: "80rem" }}>
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
            <div style={{ height: "20em", width: "80rem" }}>
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
            <div style={{ width: "80rem" }}>
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
                Create
              </Button>
            </div>
          </form>
        </CardActionArea>
      </Card>
    </div>
  );
};

export default Create;
