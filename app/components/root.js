import React from "react";
import Directions from "./Directions";
import GoogleMap from "./GoogleMap";
import Navbar from "./Navbar";
import { Route, Switch } from "react-router-dom";

const Root = () => {
  return (
    <Switch>
      <Route exact path="/" component={Directions} />
      <Route path="/map" component={Navbar} />
    </Switch>
  );
};

export default Root;
