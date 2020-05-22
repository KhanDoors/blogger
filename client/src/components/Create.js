import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Card from "@material-ui/core/Card";
import Button from "@material-ui/core/Button";
import axios from "axios";
import CardMedia from "@material-ui/core/CardMedia";
import CardHeader from "@material-ui/core/CardHeader";
import { getUser, getToken } from "./Utils";
import CardContent from "@material-ui/core/CardContent";
import CKEditor from "react-ckeditor-component";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    "& > *": {
      margin: "1rem",
      width: "100vw",
      backgroundColor: "violet",
      textAlign: "center",
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
    user: getUser(),
  });

  const [content, setContent] = useState("");

  const { title, user } = state;

  const onChange = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  const handleContent = (e) => {
    const newContent = e.editor.getData();
    setContent(newContent);
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    await axios
      .post(
        `${process.env.REACT_APP_URL}/blogpost`,
        { title, content, user },
        {
          headers: {
            authorization: `Bearer ${getToken()}`,
          },
        }
      )
      .then((res) => {
        console.log(res);
        setState({ title: "", user: "" });
        setContent("");
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
          image="https://www.desktopbackground.org/p/2014/12/14/871389_scanner-test-african-violets-ellis-hollow_1200x662_h.jpg"
          title="My Blog"
        />
      </Card>
      <Card>
        <CardContent style={{ backgroundColor: "#F6A8FF" }}>
          <form
            style={{ margin: "2em" }}
            noValidate
            autoComplete="off"
            onSubmit={onSubmit}
          >
            <div style={{ width: "72.5rem" }}>
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
            <br />
            <div>
              <CKEditor
                name="content"
                content={content}
                events={{
                  change: handleContent,
                }}
              />
            </div>

            <div style={{ width: "72.5rem" }}>
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
        </CardContent>
      </Card>
    </div>
  );
};

export default Create;
