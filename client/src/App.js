import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import Home from "./pages/Home";
import Create from "./components/Create";
import Nav from "./components/Nav";
import BlogPost from "./components/BlogPost";
import UpdateBlogPost from "./components/UpdateBlogPost";
import Login from "./components/Login";
import PrivateRoute from "./components/PrivateRoute";

const App = () => {
  return (
    <Router>
      <Nav />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/login" component={Login} />
        <PrivateRoute exact path="/create" component={Create} />
        <Route exact path="/:slug" component={BlogPost} />
        <PrivateRoute exact path="/update/:slug" component={UpdateBlogPost} />
        <Redirect to="/" />
      </Switch>
    </Router>
  );
};

export default App;
