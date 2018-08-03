import React from "react";
import { GoogleMap, DirectionsRenderer } from "react-google-maps";

const RenderMap = props => {
  const center = {
    lat: 40.7128, //NYC coordinates
    lng: -74.006
  };
  const zoom = 9;
  props.directions && console.log(props.directions);
  //accessing lat/long of each step
  //console.log(props.directions.routes[0].legs[0].steps[0].start_location.lat());
  return (
    <div>
      <GoogleMap defaultCenter={center} defaultZoom={zoom}>
        {props.directions && (
          <DirectionsRenderer directions={props.directions} />
        )}
      </GoogleMap>
    </div>
  );
};

export default RenderMap;
