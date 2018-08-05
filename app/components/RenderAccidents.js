import React, { Component } from "react";
import { Circle, InfoWindow } from "react-google-maps";
import displayData from "../functions/displayData";

class RenderAccidents extends Component {
  constructor() {
    super();
    this.state = {
      isOpen: false,
      showIdx: -1
    };
  }
  componentDidMount() {}

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
      const percentTotal =
        (totalAffected / accidentMap.values().next().value.length) * 100;
      const radiusLength = (0.8 * totalAffected + 0.2 * percentTotal) * 15;
      const position = accidentMap.keys().next().value; //access latlng coordinates in Map
      return (
        <div key={idx}>
          <Circle
            center={position}
            radius={radiusLength}
            options={{
              strokeColor: "#FF0000",
              strokeWeight: 0.5,
              fillColor: "red"
            }}
            onMouseDown={() => this.handleClick(idx)}
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
