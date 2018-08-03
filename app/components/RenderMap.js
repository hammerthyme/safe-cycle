import React from "react";
import { GoogleMap, DirectionsRenderer } from "react-google-maps";
import axios from "axios";

const MapLatLngDirections = coordsArr => {
  let mappedLatLng = coordsArr.map(latlng => {
    let [lat, lng] = [latlng.lat(), latlng.lng()];
    return [lat, lng];
  });
  return mappedLatLng;
};

const AccidentData = latlngArr => {
  const apiURL = "https://data.cityofnewyork.us/resource/qiz3-axqb.json?";
  const appToken = "&$$app_token=3Ar5xAFNG5NV39cgZQlF9cZ6y";
  let dataStore = [];

  latlngArr.forEach(async latlng => {
    let lat, lng;
    [lat, lng] = [latlng[0], latlng[1]];
    const latlngParam = `$where=within_circle(location,${lat},${lng},10)`;
    const url = `${apiURL}${latlngParam}${appToken}`;
    let res = await axios.get(url);
    let accidentData = res.data;
    let currDataMap = new Map();
    currDataMap.set([lat, lng], accidentData);
    dataStore.push(currDataMap);
  });
  return dataStore;
};

const RenderMap = props => {
  let latlngArr;

  if (props.directions) {
    latlngArr = MapLatLngDirections(props.directions.routes[0].overview_path);
    let accidents = AccidentData(latlngArr);
    console.log("ACCIDENT DATA", accidents);
  }

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
      </GoogleMap>
    </div>
  );
};

export default RenderMap;
