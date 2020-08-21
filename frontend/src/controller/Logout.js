import React, { Component, useState, useEffect } from "react";
import axios from "axios";
import { useCookies } from "react-cookie";

function Logout(props) {
  //const [cookies, setCookie, removeCookie] = useCookies(["user_id"]);

  useEffect(() => {
    axios
      .get("http://localhost:9000/logout", {
        withCredentials: true,
      })
      .then((response) => {
        window.location = "/";
      })
      .catch((error) => {
        console.log(error);
      });
  });
  return <></>;
}

export default Logout;
