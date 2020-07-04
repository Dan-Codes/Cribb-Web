import React, { useState, useEffect } from "react";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import axios from "axios";

export const LayoutDefault = ({ children }) => {
  const [isLoggedin, setisLoggedin] = useState(false);
  useEffect(() => {
    axios
      .get("http://localhost:9000/check_login", { withCredentials: true })
      .then((response) => {
        console.log("logged in?", response.status);
        setisLoggedin(true);
      })
      .catch((error) => {
        console.log("Check login error", error);
      });
  });
  return (
    <>
      {!isLoggedin ? (
        <Header navPosition="right" className="reveal-from-bottom" />
      ) : (
        <Header
          navPosition="right"
          className="reveal-from-bottom"
          hideSignin={true}
        />
      )}
      <main className="site-content">{children}</main>
      <Footer />
    </>
  );
};
