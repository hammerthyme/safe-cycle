import React, { Component } from "react";
import { Circle, InfoWindow } from "react-google-maps";

class RenderAccidents extends Component {
  constructor() {
    super();
    this.state = {
      isOpen: false,
      showIdx: -1
    };
  }
  handleHover = idx => {
    this.setState({ showIdx: idx, isOpen: !this.state.isOpen });
  };
  handleClose = () => {
    this.setState({ showIdx: -1, isOpen: !this.state.isOpen });
  };
  render() {
    return this.props.accidents.map((accidentMap, idx) => {
      const position = accidentMap.keys().next().value; //access latlng coordinates in Map
      return (
        <div key={idx}>
          <Circle
            center={position}
            radius={accidentMap.values().next().value.length}
            options={{
              strokeColor: "#FF0000",
              strokeWeight: 0.5,
              fillColor: "red"
            }}
            onMouseDown={() => this.handleHover(idx)}
          />
          {this.state.isOpen &&
            this.state.showIdx === idx && (
              <InfoWindow
                options={{ position: position }}
                onCloseClick={this.handleClose}
              >
                <span>test</span>
              </InfoWindow>
            )}
        </div>
      );
    });
  }
}

export default RenderAccidents;
