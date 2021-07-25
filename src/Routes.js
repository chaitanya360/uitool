import React, { useState } from "react";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import Login from "./Pages/Login/Login";
import Register from "./Pages/Register/Register";
import NotFound from "./Pages/NotFound/NotFound";
import Landing from "./Pages/Landing/Landing";
import Dashboard from "./Pages/Dashboard/Dashboard";
import Project from "./Pages/Project/Project";

const Routes = (props) => {
  const [justRegistered, setJustRegistered] = useState(false);
  return (
    <Router {...props}>
      <Switch>
        <Route exact path="/workspace/:id" component={Project} />
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

        <Route path="/dashboard" component={Dashboard} />
        <Route exact path="/" component={Dashboard} />
        <Route path="/project/:id/:tour" component={Project} />
        <Route path="*">
          <NotFound />
        </Route>
      </Switch>
    </Router>
  );
};
export default Routes;
