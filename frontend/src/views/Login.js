import React from "react";
import classNames from "classnames";
import GenericSection from "../components/sections/GenericSection";
import Button from "../components/elements/Button";
import LoginComp from "./LoginComp";

class Login extends React.Component {
  render() {
    const classes = classNames();
    return (
      <>
        <div className={classes}>
          <GenericSection className="reveal-from-bottom">
            <LoginComp />
          </GenericSection>
        </div>
      </>
    );
  }
}

export default Login;
