import React from "react";
import GoogleMap from "./GoogleMap";
import { Input, Menu, Header } from "semantic-ui-react";

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
  handleClick = evt => {
    evt.preventDefault();
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
                action={{
                  type: "submit",
                  content: "Go",
                  color: "teal",
                  onClick: this.handleClick
                }}
                placeholder="End"
                onChange={this.handleChange}
              />
            </Menu.Item>
          </Menu>
        </div>
        <div>
          <GoogleMap />
        </div>
      </div>
    );
  }
}

export default NavBar;
