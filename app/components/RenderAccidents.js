import React from "react";
import { Circle } from "react-google-maps";

const RenderAccidents = props => {
  return props.accidents.map((accidentMap, idx) => {
    return (
      <Circle
        key={idx}
        center={accidentMap.keys().next().value}
        radius={accidentMap.values().next().value.length}
        options={{ fillColor: "red" }}
      />
    );
  });
};

export default RenderAccidents;
