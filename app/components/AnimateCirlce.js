import React, { Component } from "react";
import { Circle } from "react-google-maps";

class AnimateCircle extends Component {
  constructor() {
    super();
    this.state = {
      radius: 0,
      maxRadius: 1000
    };
  }
  componentDidMount() {
    this.setState({
      radius: this.state.radius + 10,
      maxRadius: this.props.maxRadius * 20
    });
  }
  componentDidUpdate(prevState) {
    if (this.state.radius !== prevState.radius) {
      setInterval(() => {
        let { radius } = this.state;
        if (radius < this.state.maxRadius) {
          this.setState({ radius: this.state.radius + 10 });
        }
      }, 200);
    }
  }
  render() {
    return (
      <Circle
        center={this.props.position}
        radius={this.state.radius}
        options={{
          strokeColor: "#FF0000",
          strokeWeight: 0.5,
          fillColor: "red"
        }}
        onMouseDown={() => this.props.handleClick(this.props.idx)}
      />
    );
  }
}

export default AnimateCircle;
