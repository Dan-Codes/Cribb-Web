import React, { Component, useState, useEffect } from "react";
import axios from "axios";
import ListItem from "./ListItem";
import { useHistory } from "react-router-dom";
import Button from "../../elements/Button";

function Bucket(props) {
  const [search, setSearch] = useState();

  useEffect(() => {
    axios
      .get(`http://localhost:9000/viewCribb`)
      .then((result) => {
        setSearch(result.data);
      })
      .catch((err) => console.log(err));

    console.log(props.className);
  }, []);

  const history = useHistory();

  function listingClicked(listing) {
    console.log("Listing Clicked", listing);
    history.push(
      `/listing/${listing.streetaddress}&${listing.address_id}`,
      listing
    );
  }

  return (
    <>
      {search ? (
        <>
          {Object.keys(search).map((item, index) => (
            <ListItem
              {...props}
              key={search[item].address_id}
              listing={search[item]}
              onClick={() => listingClicked(search[item])}
            ></ListItem>
          ))}
        </>
      ) : (
        <></>
      )}
    </>
  );
}

export default Bucket;
