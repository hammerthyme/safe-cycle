import React from "react";
import { compose, withProps, lifecycle } from "recompose";
import { withScriptjs, withGoogleMap } from "react-google-maps";
import RenderMap from "./RenderMap";

const MyMap = compose(
  withProps({
    googleMapURL:
      "https://maps.googleapis.com/maps/api/js?key=AIzaSyDr3cIycd9ql4MFBqYfOb80LcZSzFLmDVo&v=3.exp",
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: `100vh` }} />,
    mapElement: <div style={{ height: `100%` }} />
  }),
  withScriptjs,
  withGoogleMap,
  lifecycle({
    componentDidMount() {
      const DirectionsService = new google.maps.DirectionsService();
      DirectionsService.route(
        {
          origin: new google.maps.LatLng(40.681181, -73.946858),
          destination: new google.maps.LatLng(40.705076, -74.00916),
          travelMode: "BICYCLING" //was google.maps.TravelMode.BYCYCLING
        },
        //upon retrieving directions, invokes callback passing in DirectionsResult and DirectionsStatus
        (result, status) => {
          if (status === google.maps.DirectionsStatus.OK) {
            this.setState({
              directions: result
            });
          } else {
            console.error("error fetching directions");
          }
        }
      );
    }
  })
)(props => RenderMap(props));

export default MyMap;

// style = {{ height: "100vh", width: "100%" }}
