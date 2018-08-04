import React from "react";
import { compose, withProps, lifecycle } from "recompose";
import { withScriptjs, withGoogleMap } from "react-google-maps";
import RenderMap from "./RenderMap";
// HELPER FUNCTIONS //
import fetchAccidentData from "../functions/fetchAccidentData";
import mapLatLngDirections from "../functions/mapLatLngDirections";

const MyMap = compose(
  withProps({
    googleMapURL:
      "https://maps.googleapis.com/maps/api/js?key=AIzaSyDr3cIycd9ql4MFBqYfOb80LcZSzFLmDVo&v=3.exp",
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: `95vh` }} />,
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
        async (result, status) => {
          if (status === google.maps.DirectionsStatus.OK) {
            const latlngArr = mapLatLngDirections(
              result.routes[0].overview_path
            ); //set of coordinates for entire directions route
            const accidents = await fetchAccidentData(latlngArr);
            console.log("ACCIDENTS", accidents);

            this.setState({
              directions: result,
              accidents: accidents
            });
          } else {
            console.error("error fetching directions");
          }
        }
      );
    }
  })
)(props => {
  return RenderMap(props);
});

export default MyMap;

// style = {{ height: "100vh", width: "100%" }}
