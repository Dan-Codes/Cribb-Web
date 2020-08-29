import React, { Component, useState, useEffect, useContext } from "react";
import axios from "axios";
import { useCookies } from "react-cookie";
import { CribbContext } from "../CribbContext";

function ProfileController(props) {
  const [fetechedData, setFetchedData] = useState("");
  const [cribb, setCribb] = useContext(CribbContext);

  useEffect(() => {
    axios
      .get("/profile")
      .then((response) => {
        console.log(response.data);
        setFetchedData(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  return <></>;
}

export default ProfileController;
