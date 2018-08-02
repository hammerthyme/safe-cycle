import React, { Component } from "react";
import { Header, Input, Button } from "semantic-ui-react";
import { fetchDirections } from "../reducers/directions";
import { connect } from "react-redux";

class Directions extends Component {
  constructor() {
    super();
    this.state = {
      start: "",
      end: ""
    };
  }

  handleChange = evt => {
    this.setState({
      [evt.target.name]: evt.target.value
    });
  };
  handleSubmit = evt => {
    evt.preventDefault();
    const { start } = this.state;
    const { end } = this.state;
    this.props.fetchDirections(start, end);
  };
  render() {
    return (
      <div style={{ textAlign: "center" }}>
        <div>
          <Header
            as="h2"
            dividing
            content="Enter Start and End destinations"
            textAlign="center"
            style={{ marginTop: "1em" }}
          />
        </div>
        <div>
          <Input
            name="start"
            value={this.state.start}
            placeholder="start address"
            focus
            onChange={this.handleChange}
          />
        </div>
        <div>
          <Input
            name="end"
            value={this.state.end}
            placeholder="end address"
            focus
            onChange={this.handleChange}
          />
        </div>
        <div style={{ textAlign: "center", marginTop: "2em" }}>
          <Button
            primary
            type="submit"
            style={{ height: "2.5em", marginLeft: "0.5em" }}
            onClick={this.handleSubmit}
          >
            Submit
          </Button>
        </div>
      </div>
    );
  }
}

const mapState = state => ({
  directions: state.directions
});
const mapDispatch = dispatch => ({
  fetchDirections: (start, end) => dispatch(fetchDirections(start, end))
});

export default connect(
  mapState,
  mapDispatch
)(Directions);
