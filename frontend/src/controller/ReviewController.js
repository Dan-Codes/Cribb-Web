import React, { Component, useState, useEffect, useContext } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import GenericSection from "../components/sections/GenericSection";
import ReviewForm from "../components/sections/partials/ReviewForm";
import { CribbContext } from "../CribbContext";

function ReviewController(props) {
  const str = props.location.pathname;
  var res = str.split("/");
  res = res[2].split("&");
  res = res[0];
  const id = res[1];

  const cribb = useContext(CribbContext);

  useEffect(() => {
    const user_id = cribb[0];
    console.log("Cribb Context", user_id);
    axios
      .get("http://localhost:9000/previousReview", { user_id })
      .then((response) => {
        console.log("REsponse from ReviewController", response.data);
      });
  }, []);

  return (
    <>
      <ReviewForm></ReviewForm>
    </>
  );
}

export default ReviewController;
