import React from "react";
// import { compose, withProps, lifecycle } from "recompose";
import { withScriptjs, withGoogleMap } from "react-google-maps";
import RenderMapWrapper from "./RenderMap";

const GenerateGoogleMap = withScriptjs(
  withGoogleMap(() => <RenderMapWrapper />)
);

export default GenerateGoogleMap;

// style = {{ height: "100vh", width: "100%" }}
