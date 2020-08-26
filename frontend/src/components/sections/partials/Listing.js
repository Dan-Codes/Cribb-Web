import React, { Component, useState, useEffect } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import GenericSection from "../GenericSection";
import { Rate, Typography } from "antd";

import classNames from "classnames";

import { FrownOutlined, MehOutlined, SmileOutlined } from "@ant-design/icons";
import CommentView from "./CommentView";
import ListingRating from "./ListingRating";
import Button from "../../elements/Button";
import lodash from "lodash";
import Money from "../../elements/Money";
import Phone from "../../elements/Phone";
import User from "../../elements/User";

function Listing({ address, reviews, ...props }) {
  const { Paragraph } = Typography;
  console.log("address: ", address);
  console.log("LISTING REVIEWS", reviews);
  const [average, setAverage] = useState(address.avgoverallrating);
  console.log("average overall rating", average);
  const [location, setLocation] = useState(0);
  const [amenitites, setAmenitites] = useState(0);
  const [manage, setManage] = useState(0);

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
          <div className="has-bottom-divider">
            <div>{address.city + ", " + address.state_id}</div>
            <div></div>
            <Rate allowHalf value={address.avgoverallrating} disabled />
            <span className="ant-rate-text">({reviews.length})</span>
            <br></br>

            <div className="mb-16">
              <Money cost={Number(address.rent)} />
            </div>
            <div>
              {address.landlord && <User></User>}
              {address.landlord && " " + address.landlord}
            </div>
            <div>
              {address.phonenumber && <Phone></Phone>}
              {address.phonenumber && " " + address.phonenumber}
            </div>
          </div>

          <div className="has-bottom-divider">
            <ListingRating
              location={address.avglocation}
              management={address.avgmanage}
              amenities={address.avgamenities}
            ></ListingRating>
          </div>
          <>
            {Object.keys(reviews).map((review) => (
              <CommentView data={reviews[review]}></CommentView>
            ))}
          </>
          <Button color="primary" wide onClick={writeReivew}>
            Write a Review
          </Button>
        </div>
      </GenericSection>
    </>
  );
}

export default Listing;
