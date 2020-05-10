import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import CardMedia from "@material-ui/core/CardMedia";
import CardHeader from "@material-ui/core/CardHeader";
import Avatar from "@material-ui/core/Avatar";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import { authenticate, getUser } from "./Utils";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    "& > *": {
      margin: "1rem",
      width: "100vw",
      backgroundColor: "#F6A8FF",
    },
  },
  media: {
    height: 0,
    paddingTop: "25%", // 16:9
  },
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
}));

const Login = (props) => {
  const classes = useStyles();
  const [state, setState] = useState({
    name: "",
    password: "",
  });

  const { name, password } = state;

  useEffect(() => {
    getUser() && props.history.push("/");
  }, []);

  const onChange = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    await axios
      .post(`${process.env.REACT_APP_URL}/login`, { name, password })
      .then((res) => {
        authenticate(res, () => props.history.push("/"));
      })
      .catch((err) => {
        console.log(err.response);
        setState({ name: "", password: "" });
      });
  };

  return (
    <div className={classes.root}>
      <Card>
        <CardHeader
          style={{ textAlign: "center" }}
          title="Welcome!"
          subheader={new Date().toLocaleString()}
        />

        <CardMedia
          className={classes.media}
          image="https://www.greenandvibrant.com/sites/default/files/field/image/purple-flowers.jpg"
          title="My Blog"
        />
      </Card>
      <Card
        style={{
          margin: "3.5rem",
          textAlign: "center",
          backgroundColor: "#F6A8FF",
        }}
      >
        <CardActionArea>
          <div className={classes.paper}>
            <Avatar className={classes.avatar}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>

            <form
              style={{ margin: "2em" }}
              noValidate
              autoComplete="off"
              onSubmit={onSubmit}
            >
              <div style={{ width: "80rem" }}>
                <TextField
                  type="text"
                  label="Name"
                  name="name"
                  required
                  variant="outlined"
                  margin="normal"
                  value={name}
                  onChange={onChange}
                />
              </div>
              <div style={{ height: "20em", width: "80rem" }}>
                <TextField
                  value={password}
                  onChange={onChange}
                  variant="outlined"
                  margin="normal"
                  required
                  name="password"
                  label="Password"
                  type="password"
                  autoComplete="current-password"
                />
              </div>
              <div>
                <Button
                  style={{ width: "20em" }}
                  variant="contained"
                  color="primary"
                  type="submit"
                >
                  Login
                </Button>
              </div>
            </form>
          </div>
        </CardActionArea>
      </Card>
    </div>
  );
};

export default Login;
