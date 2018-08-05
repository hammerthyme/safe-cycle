import React, { Component } from "react";
import { Circle, InfoWindow } from "react-google-maps";

class RenderAccidents extends Component {
  constructor() {
    super();
    this.state = {
      isOpen: false,
      showIdx: -1,
      cyclistsInjured: 0,
      cyclistsKilled: 0,
      percentageTotal: 0
    };
  }

  handleClick = idx => {
    const [cyclistsInjured, cyclistsKilled, percentageTotal] = this.displayData(
      this.props.accidents[idx]
    );
    this.setState({
      showIdx: idx,
      isOpen: !this.state.isOpen,
      cyclistsInjured,
      cyclistsKilled,
      percentageTotal
    });
  };
  handleClose = () => {
    this.setState({
      showIdx: -1,
      isOpen: !this.state.isOpen,
      cyclistsInjured: 0,
      cyclistsKilled: 0,
      percentageTotal: 0
    });
  };
  displayData = accidentMap => {
    let cyclistsInjured = 0;
    let cyclistsKilled = 0;
    const latlngAccidentsArr = accidentMap.values().next().value;
    latlngAccidentsArr.forEach(accident => {
      cyclistsInjured += Number(accident.number_of_cyclist_injured);
      cyclistsKilled += Number(accident.number_of_cyclist_killed);
    });
    const percentageTotal = (
      (cyclistsInjured + cyclistsKilled) /
      latlngAccidentsArr.length
    ).toLocaleString(undefined, { style: "percent", minimumFractionDigits: 0 });

    return [cyclistsInjured, cyclistsKilled, percentageTotal];
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
                    <strong>Cyclists injured: </strong>{" "}
                    {this.state.cyclistsInjured}
                  </div>
                  <div>
                    <strong>Cyclists killed: </strong>{" "}
                    {this.state.cyclistsKilled}
                  </div>
                  <div>
                    <strong>Percent total accidents: </strong>{" "}
                    {this.state.percentageTotal}
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
