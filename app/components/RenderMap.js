import React, { Component } from "react";
import { GoogleMap, DirectionsRenderer } from "react-google-maps";
import RenderAccidents from "./RenderAccidents";
import { connect } from "react-redux";

class RenderMap extends Component {
  render() {
    const center = {
      lat: 40.7128, //NYC coordinates
      lng: -74.006
    };
    const zoom = 9;
    console.log(this.props);
    return (
      <div>
        <GoogleMap defaultCenter={center} defaultZoom={zoom}>
          {this.props.directions.status && (
            <DirectionsRenderer directions={this.props.directions} />
          )}
          {this.props.accidents.length && (
            <RenderAccidents accidents={this.props.accidents} />
          )}
        </GoogleMap>
      </div>
    );
  }
}

const mapState = state => ({
  directions: state.directions,
  accidents: state.accidents
});

export default connect(mapState)(RenderMap);
