import React, { Component } from "react";
import { Circle } from "react-google-maps";
import displayData from "../functions/displayData";

class AnimateCircle extends Component {
  constructor() {
    super();
    this.state = {
      radius: 1,
      maxRadius: 1000
    };
  }
  componentDidMount() {
    this.setState({
      radius: this.state.radius + 10,
      maxRadius: this.props.maxRadius * 25
    });
  }
  componentDidUpdate(prevState) {
    if (this.state.radius !== prevState.radius) {
      setInterval(() => {
        let { radius } = this.state;
        if (radius < this.state.maxRadius) {
          this.setState({ radius: this.state.radius + 10 });
        }
      }, 100);
    }
  }
  render() {
    console.log(this.state.radius);
    return (
      <Circle
        center={this.props.position}
        radius={this.state.radius}
        options={{
          strokeColor: "#FF0000",
          strokeWeight: 0.5,
          fillColor: "red"
        }}
      />
    );
  }
}

export default AnimateCircle;
