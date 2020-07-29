import React, { Component, useState } from "react";
import axios from "axios";
import ListItem from "./ListItem";

class Bucket extends Component {
  constructor() {
    super();
    this.state = {
      search: [],
    };
  }

  componentDidMount() {
    axios
      .get(`http://localhost:9000/viewCribb`)
      .then((result) => {
        this.setState({ search: result.data });
        console.log("Search State: ", this.state);
      })
      .catch((err) => console.log(err));

    console.log(this.props.className);
  }

  render() {
    {
      console.log("Rendering!");
    }
    return (
      <>
        {this.state.search ? (
          <>
            {Object.keys(this.state.search).map((item, index) => (
              <ListItem
                {...this.props}
                key={this.state.search[item].address_id}
                listing={this.state.search[item]}
              ></ListItem>
            ))}
          </>
        ) : (
          <></>
        )}
      </>
    );
  }
}

export default Bucket;
