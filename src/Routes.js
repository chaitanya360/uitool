import React, { useContext, useState } from "react";
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
import Dashboard from "./Pages/Dashboard/Dashboard";
import MainLayout from "./layouts/MainLayout";

const Routes = (props) => {
  const [justRegistered, setJustRegistered] = useState(false);
  return (
    <Router {...props}>
      <Switch>
        <Route exact path="/workspace/:id" component={MainLayout} />
        <Route path="/login">
          <Login
            justRegistered={justRegistered}
            setJustRegistered={setJustRegistered}
          />
        </Route>
        <Route path="/register">
          <Register setJustRegistered={setJustRegistered} />
        </Route>
        <Route path="/landing">
          <Landing />
        </Route>
        <Route path="/dashboard">
          <Dashboard />
        </Route>
        <Route exact path="/">
          <Redirect to="/dashboard" />
        </Route>
        <Route path="*">
          <NotFound />
        </Route>
      </Switch>
    </Router>
  );
};
export default Routes;
