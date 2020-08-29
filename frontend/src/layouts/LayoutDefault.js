import React, { useState, useEffect, useContext } from "react";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import axios from "axios";
import { CribbContext } from "../CribbContext";

export const LayoutDefault = ({ children }) => {
  const [isLoggedin, setisLoggedin] = useState(false);
  const [cribbData, setcribbData] = useContext(CribbContext);
  //console.log("this is the context: ", value);
  useEffect(() => {
    axios
      .get("/check_login", { withCredentials: true })
      .then((response) => {
        console.log("logged in?", response);
        console.log("isLoggedin: ", isLoggedin);
        setisLoggedin(true);
        setcribbData((prevState) => ({
          ...prevState,
          auth: true,
          user_id: response.data.user_id,
        }));
        console.log("logged in!", cribbData);
      })
      .catch((error) => {
        console.log("Check login error", error);
        cribbData.auth = false;
      });
  }, [isLoggedin]);
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
