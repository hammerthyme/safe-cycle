import React, { Component } from "react";
import { compose, withProps } from "recompose";
import { withScriptjs, withGoogleMap, GoogleMap } from "react-google-maps";

const MyMap = compose(
  withProps({
    googleMapURL:
      "https://maps.googleapis.com/maps/api/js?key=AIzaSyDr3cIycd9ql4MFBqYfOb80LcZSzFLmDVo&v=3.exp",
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: `100vh` }} />,
    mapElement: <div style={{ height: `100%` }} />
  }),
  withScriptjs,
  withGoogleMap
)(() => {
  const center = {
    lat: 40.7128, //NYC coordinates
    lng: -74.006
  };
  const zoom = 10;
  return (
    <div>
      <GoogleMap defaultCenter={center} defaultZoom={zoom} />
    </div>
  );
});

export default MyMap;

// style = {{ height: "100vh", width: "100%" }}
