import React, { Component } from "react";

class bucket extends Component {
  constructor() {
    super();
    this.state = {
      buck: [],
    };
  }

  async componentDidMount() {
    fetch(`/`, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
      .then((response) => response.json())
      .then((messages) => {
        console.log("messages");
      });
  }

  render() {
    return (
      <div>
        <h1 className="m-0 mb-32 reveal-from-bottom" data-reveal-delay="500">
          Hello
        </h1>
      </div>
    );
  }
}

export default bucket;
