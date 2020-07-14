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
      .then((response) => {
        console.log(response.data);
        this.setState({ search: response.data });
      })
      .then((result) => {
        console.log("Search State: ", this.state.search);
        this.render();
      });
  }
  render() {
    {
      console.log("Rendering!");
    }
    return (
      <>
        {this.state.search ? (
          <>
            {this.state.search.map((listing, index) => (
              <ListItem key={listing.address_id} listing={listing}></ListItem>
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
