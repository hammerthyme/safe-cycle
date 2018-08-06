import React, { Component } from "react";
import { Circle, InfoWindow } from "react-google-maps";
import displayData from "../functions/displayData";
import AnimateCircle from "./AnimateCirlce";

class RenderAccidents extends Component {
  constructor() {
    super();
    this.state = { isOpen: false, showIdx: -1 };
  }
  // componentDidMount() {
  //   this.setState({ radius: this.state.radius + 1 });
  //   const [cyclistsInjured, cyclistsKilled, percentageTotal] = displayData(
  //      accidentMap
  //      )
  // }
  // componentDidUpdate(prevState) {
  //   if (this.state.radius !== prevState.radius) {
  //     setInterval(() => {
  //       let { radius } = this.state;
  //       let maxRadius;
  //       if (radius < 500) this.setState({ radius: this.state.radius + 10 });
  //     }, 500);
  //   }
  // }

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
      const radiusLength = totalAffected * 15;

      const position = accidentMap.keys().next().value; //access latlng coordinates in Map
      return (
        <div key={idx}>
          {/* <AnimateCircle maxRadius={totalAffected} /> */}
          <Circle
            center={position}
            radius={radiusLength}
            options={{
              strokeColor: "#FF0000",
              strokeWeight: 0.5,
              fillColor: "red"
            }}
            onMouseDown={() => this.handleClick(idx)}
            onRadiusChanged={() => console.log("fired")}
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
