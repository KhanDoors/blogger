import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import { Link, withRouter } from "react-router-dom";
import { getUser, logout } from "./Utils";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

const Nav = (props) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            Blog
          </Typography>
          <Link
            style={{ color: "orange", margin: "1em", textDecoration: "none" }}
            to="/"
          >
            Home
          </Link>

          <Link
            style={{ color: "yellow", margin: "1em", textDecoration: "none" }}
            to="/create"
          >
            Create
          </Link>

          {!getUser() ? (
            <Link style={{ color: "yellow", margin: "1em" }} to="/login">
              Login
            </Link>
          ) : (
            <Button
              style={{ color: "yellow", margin: "1em" }}
              onClick={() => logout(() => props.history.push("/"))}
            >
              Logout
            </Button>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default withRouter(Nav);
