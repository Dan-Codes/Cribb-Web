import React, { Component, useState, useEffect } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import GenericSection from "../GenericSection";
import { Rate } from "antd";
import classNames from "classnames";

import { FrownOutlined, MehOutlined, SmileOutlined } from "@ant-design/icons";
import CommentView from "./CommentView";
import ListingRating from "./ListingRating";
import Button from "../../elements/Button";

function Listing({ address, ...props }) {
  console.log("address: ", address);

  const tilesClasses = classNames("tiles-wrap center-content");
  const history = useHistory();
  function writeReivew() {
    console.log("writeReivew Clicked");
    history.push(
      `/review/?add=${address.streetaddress}&id=${address.address_id}`,
      {
        address: address.streetaddress,
        id: address.address_id,
      }
    );
  }
  return (
    <>
      <GenericSection className="reveal-from-bottom">
        <div className="container">
          <div className="has-bottom-divider">
            <h1>{address.streetaddress}</h1>
          </div>
          <Rate allowHalf defaultValue={address.avgoverallrating} disabled />
          <span className="ant-rate-text">
            {address.avgoverallrating} Rating
          </span>
          <br></br>

          <div className="mb-16">
            <ListingRating
              location={address.avglocation}
              management={address.manage}
              amenitites={address.avgamenitites}
            ></ListingRating>
          </div>

          <CommentView></CommentView>
          <Button color="primary" wide onClick={writeReivew}>
            Write a Review
          </Button>
        </div>
      </GenericSection>
    </>
  );
}

export default Listing;
