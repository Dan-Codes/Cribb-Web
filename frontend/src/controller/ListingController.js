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
  console.log("history", useHistory());
  console.log("Props ", props);

  return <>{<Listing address={props.location.state}></Listing>}</>;
}

export default ListingController;
