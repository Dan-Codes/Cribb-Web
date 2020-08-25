import React from "react";
import LoginForm from "./LoginForm";
import classNames from "classnames";
import GenericSection from "../components/sections/GenericSection";
import Button from "../components/elements/Button";
import { Link } from "react-router-dom";

class SignUp extends React.Component {
  render() {
    const classes = classNames();
    return (
      <>
        <div className={classes}>
          <GenericSection>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
              }}
            >
              <LoginForm />
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
              }}
            >
              <Link to="/login" className="reveal-from-bottom">
                Already have an account
              </Link>
            </div>
          </GenericSection>
        </div>
      </>
    );
  }
}

export default SignUp;
