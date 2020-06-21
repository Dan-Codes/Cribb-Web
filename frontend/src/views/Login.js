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
          <div className="col-md-4 col-md-offset-4">
            <GenericSection>
              <LoginComp />
            </GenericSection>
          </div>
        </div>
      </>
    );
  }
}

export default Login;
