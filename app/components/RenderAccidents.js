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
    // console.log(this.props.accidents)
    return this.props.accidents.map((locationAccidents, idx) => {
      const [cyclistsInjured, cyclistsKilled, percentageTotal] = displayData(locationAccidents);
      const totalAffected = cyclistsInjured + cyclistsKilled;
      const { lat, lng } = locationAccidents; //access latlng coordinates in Map
      // console.log('posITION!!,', position)
      return (
        <div key={idx}>
          {totalAffected > 0 && (
            <AnimateCircle
              maxRadius={totalAffected}
              position={{lat, lng}}
              handleClick={this.handleClick}
              idx={idx}
            />
          )}
          {this.state.isOpen &&
            this.state.showIdx === idx && (
              <InfoWindow
                options={{ position: {lat, lng} }}
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
