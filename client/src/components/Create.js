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
      margin: theme.spacing(1),
      width: 200,
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
        <CardActionArea style={{ margin: ".5em" }}>
          <form
            className={classes.root}
            noValidate
            autoComplete="off"
            onSubmit={onSubmit}
          >
            <div style={{ width: "20em" }}>
              <TextField
                itemType="text"
                placeholder="Title"
                name="title"
                required
                value={title}
                onChange={onChange}
              />
            </div>
            <div style={{ width: "200em" }}>
              <TextField
                itemType="text"
                multiline
                rows={4}
                required
                fullwidth="true"
                placeholder="Content"
                name="content"
                value={content}
                onChange={onChange}
              />
            </div>
            <div style={{ width: "20em" }}>
              <TextField
                itemType="text"
                placeholder="Your Name"
                name="user"
                value={user}
                onChange={onChange}
              />
            </div>
            <Button variant="contained" color="primary" type="submit">
              Create
            </Button>
          </form>
        </CardActionArea>
      </Card>
    </>
  );
};

export default Create;
