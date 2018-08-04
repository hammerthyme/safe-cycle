import React from "react";
import GoogleMap from "./GoogleMap";

const NavBar = () => {
  return (
    <div>
      <div>
        <h1>Safe-Cycle</h1>
      </div>
      <div>
        <GoogleMap />
      </div>
    </div>
  );
};

export default NavBar;
