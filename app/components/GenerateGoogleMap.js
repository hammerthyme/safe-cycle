import React from "react";
import { withScriptjs, withGoogleMap } from "react-google-maps";
import RenderMap from "./RenderMap";

const GenerateGoogleMap = withScriptjs(withGoogleMap(() => <RenderMap />));

export default GenerateGoogleMap;
