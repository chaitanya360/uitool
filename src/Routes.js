import React from "react";
import {
  Route,
  BrowserRouter as Router,
  Switch,
  Redirect,
} from "react-router-dom";
import Login from "./Pages/Login/Login";
import Register from "./Pages/Register/Register";
import NotFound from "./Pages/NotFound/NotFound";
import Landing from "./Pages/Landing/Landing";
import VideoCard from "./components/VideoCard";
import MainLayout from "./layouts/MainLayout";
const Routes = (props) => (
  <Router {...props}>
    <Switch>
      <Route path="/login">
        <Login />
      </Route>
      <Route path="/register">
        <Register />
      </Route>
      <Route path="/landing">
        <Landing />
      </Route>
      <Route path="/dashboard">
        <MainLayout />
      </Route>
      <Route exact path="/">
        <Redirect to="/landing" />
      </Route>
      <Route path="*">
        <NotFound />
      </Route>
    </Switch>
  </Router>
);
export default Routes;
