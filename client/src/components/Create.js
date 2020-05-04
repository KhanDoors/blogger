import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import Button from "@material-ui/core/Button";
import axios from "axios";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: "1em",
      width: "40vw",
    },
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
    <>
      <Card>
        <CardActionArea style={{ margin: "2em", textAlign: "center" }}>
          <form
            className={classes.root}
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
                Create
              </Button>
            </div>
          </form>
        </CardActionArea>
      </Card>
    </>
  );
};

export default Create;
