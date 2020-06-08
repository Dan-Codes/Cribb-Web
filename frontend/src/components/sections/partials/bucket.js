import React, { Component } from "react";
import axios from "axios";

class bucket extends Component {
  constructor() {
    super();
    this.state = {
      buck: [],
    };
  }
  async componentWillMount() {
    await axios
      .get(`http://localhost:9000`)
      .then((messages) => messages.data)
      .then((buck) => this.setState({ buck }));
    console.log(this.state.buck);
  }
  render() {
    console.log("test");
    return (
      <div>
        <h1>Hello</h1>
        <ul className="m-0 mb-32 reveal-from-bottom" data-reveal-delay="500">
          {this.state.buck.map((element) => (
            <li key={element.id}>{element.name}</li>
          ))}
        </ul>
      </div>
    );
  }
}

export default bucket;
