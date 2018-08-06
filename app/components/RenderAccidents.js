import React, { Component } from "react";
import { InfoWindow } from "react-google-maps";
import displayData from "../functions/displayData";
import AnimateCircle from "./AnimateCirlce";

class RenderAccidents extends Component {
  constructor() {
    super();
    this.state = { isOpen: false, showIdx: -1 };
  }

  handleClick = idx => {
    this.setState({
      showIdx: idx,
      isOpen: !this.state.isOpen
    });
  };
  handleClose = () => {
    this.setState({
      showIdx: -1,
      isOpen: !this.state.isOpen
    });
  };

  render() {
    return this.props.accidents.map((accidentMap, idx) => {
      const [cyclistsInjured, cyclistsKilled, percentageTotal] = displayData(
        accidentMap
      );
      const totalAffected = cyclistsInjured + cyclistsKilled;
      const position = accidentMap.keys().next().value; //access latlng coordinates in Map
      return (
        <div key={idx}>
          <AnimateCircle
            maxRadius={totalAffected}
            position={position}
            handleClick={this.handleClick}
            idx={idx}
          />
          {this.state.isOpen &&
            this.state.showIdx === idx && (
              <InfoWindow
                options={{ position: position }}
                onCloseClick={this.handleClose}
              >
                <div>
                  <div>
                    <strong>Cyclists injured: </strong> {cyclistsInjured}
                  </div>
                  <div>
                    <strong>Cyclists killed: </strong> {cyclistsKilled}
                  </div>
                  <div>
                    <strong>Percent total accidents: </strong> {percentageTotal}
                  </div>
                </div>
              </InfoWindow>
            )}
        </div>
      );
    });
  }
}

export default RenderAccidents;
