import React from "react";
import Navbar from "./Navbar";
import { Route, Switch } from "react-router-dom";

const Root = () => {
  return (
    <Switch>
      <Route exact path="/" component={Navbar} />
    </Switch>
  );
};

export default Root;
