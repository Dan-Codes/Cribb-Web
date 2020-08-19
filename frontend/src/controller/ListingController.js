import React, { Component, useState, useEffect } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import GenericSection from "../components/sections/GenericSection";
import Listing from "../components/sections/partials/Listing";
import { add } from "lodash";
import CommentView from "../components/sections/partials/CommentView";

function ListingController(props) {
  const str = props.location.pathname;
  var res = str.split("/");
  res = res[2].split("&");
  res = res[0];
  const id = res[1];
  //console.log("history", useHistory())
  console.log("Props ", props.location.state);
  const [reviewData, setReviewData] = useState([]);
  const [listingData, setListingData] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:9000/passReviews", {
        params: { address_id: props.location.state.address_id },
      })
      .then((response) => {
        console.log(response);
        setReviewData(response.data);
      })
      .catch((error) => {
        console.log(error);
      });

    axios
      .get("http://localhost:9000/listing", {
        params: { address_id: props.location.state.address_id },
      })
      .then((response) => {
        console.log("Response data", response.data[0]);
        setListingData(response.data[0]);
      })
      .catch((error) => console.log(error));
  }, []);

  return <>{<Listing address={listingData} reviews={reviewData}></Listing>}</>;
}

export default ListingController;
