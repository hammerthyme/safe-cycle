import React from "react";
import { GoogleMap, DirectionsRenderer } from "react-google-maps";
import RenderAccidents from "./RenderAccidents";

const RenderMap = props => {
  const center = {
    lat: 40.7128, //NYC coordinates
    lng: -74.006
  };
  const zoom = 9;
  return (
    <div>
      <GoogleMap defaultCenter={center} defaultZoom={zoom}>
        {props.directions && (
          <DirectionsRenderer directions={props.directions} />
        )}
        {props.accidents ? (
          <RenderAccidents accidents={props.accidents} />
        ) : (
          <h1>loading</h1>
        )}
      </GoogleMap>
    </div>
  );
};

export default RenderMap;
