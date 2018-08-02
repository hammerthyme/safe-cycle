import React, { Component } from "react";
import axios from "axios";
import { Header, Input, Button } from "semantic-ui-react";

const api = "http://api.openweathermap.org/data/2.5/weather?q=";
const apiKey = "&appid=7b07bffd84a5722b682c4ee639b3478a";
const units = "&units=metric";

export default class Weather extends Component {
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
          <Input name="city" placeholder="start address" focus />
        </div>
        <div>
          <Input name="city" placeholder="end address" focus />
        </div>
        <div style={{ textAlign: "center", marginTop: "2em" }}>
          <Button
            primary
            type="submit"
            style={{ height: "2.5em", marginLeft: "0.5em" }}
          >
            Submit
          </Button>
        </div>
      </div>
    );
  }
}
