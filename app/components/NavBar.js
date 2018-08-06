import React from "react";
import GenerateGoogleMap from "./GenerateGoogleMap";
import { Input, Menu, Header, Button } from "semantic-ui-react";
import { connect } from "react-redux";
import { fetchDirections, clearDirections } from "../reducers/directions";

const googleMapProps = {
  googleMapURL:
    "https://maps.googleapis.com/maps/api/js?key=AIzaSyDr3cIycd9ql4MFBqYfOb80LcZSzFLmDVo&v=3.exp",
  loadingElement: <div style={{ height: `100%` }} />,
  containerElement: <div style={{ height: `95vh` }} />,
  mapElement: <div style={{ height: `100%` }} />
};

class NavBar extends React.Component {
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
    const { start, end } = this.state;
    this.props.fetchDirections(start, end);
    this.setState({ start: "", end: "" });
  };
  handleClear = () => {
    this.props.clearDirections();
  };

  render() {
    return (
      <div>
        <div>
          <Menu>
            <Menu.Item>
              <Header>Safe Cycle</Header>
            </Menu.Item>
            <Menu.Item>
              <Input
                name="start"
                value={this.state.start}
                placeholder="Start"
                onChange={this.handleChange}
              />
            </Menu.Item>
            <Menu.Item>
              <Input
                name="end"
                value={this.state.end}
                placeholder="End"
                onChange={this.handleChange}
              >
                <input />
                {this.props.isLoading ? (
                  <Button loading color="teal" />
                ) : (
                  <Button
                    type="submit"
                    content="Go"
                    color="teal"
                    onClick={this.handleSubmit}
                  />
                )}
              </Input>
            </Menu.Item>
            {this.props.directions.status && (
              <Menu.Item>
                <Button basic color="red" onClick={this.handleClear}>
                  Clear Search
                </Button>
              </Menu.Item>
            )}
          </Menu>
        </div>
        <div>
          <GenerateGoogleMap {...googleMapProps} />
        </div>
      </div>
    );
  }
}
const mapState = state => ({
  directions: state.directions,
  isLoading: state.isLoading
});
const mapDispatch = dispatch => ({
  fetchDirections: (start, end) => dispatch(fetchDirections(start, end)),
  clearDirections: () => dispatch(clearDirections())
});

export default connect(
  mapState,
  mapDispatch
)(NavBar);
