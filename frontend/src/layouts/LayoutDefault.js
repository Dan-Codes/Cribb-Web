import React, { useState, useEffect, useContext } from "react";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import axios from "axios";
import { CribbContext } from "../CribbContext";

export const LayoutDefault = ({ children }) => {
  const [isLoggedin, setisLoggedin] = useState(false);
  const value = useContext(CribbContext);
  console.log("this is the context: ", value[0].auth);
  useEffect(() => {
    axios
      .get("http://localhost:9000/check_login", { withCredentials: true })
      .then((response) => {
        console.log("logged in?", response.status);
        setisLoggedin(true);
        value[0].auth = true;
      })
      .catch((error) => {
        console.log("Check login error", error);
        value[0].auth = false;
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
