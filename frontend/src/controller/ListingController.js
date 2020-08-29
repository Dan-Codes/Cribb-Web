import React, { Component, useState, useEffect } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import GenericSection from "../components/sections/GenericSection";
import Listing from "../components/sections/partials/Listing";
import { add } from "lodash";
import CommentView from "../components/sections/partials/CommentView";

function ListingController(props) {
  const str = props.location.pathname;
  const res = str.split("&");
  console.log(res.last);
  const id = res[res.length - 1];
  const [reviewData, setReviewData] = useState([]);
  const [listingData, setListingData] = useState([]);

  useEffect(() => {
    axios
      .get("/passReviews", {
        params: { address_id: id },
      })
      .then((response) => {
        console.log(response);
        setReviewData(response.data);
      })
      .catch((error) => {
        console.log(error);
      });

    axios
      .get("/listing", {
        params: { address_id: id },
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
