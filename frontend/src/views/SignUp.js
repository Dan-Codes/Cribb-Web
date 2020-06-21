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
          <div className="col-md-4 col-md-offset-4">
            <GenericSection>
              <LoginForm />
              <Link
                to="/login"
                className="col-md-4 col-md-offset-4 reveal-from-bottom"
              >
                Already have an account
              </Link>
            </GenericSection>
          </div>
        </div>
      </>
    );
  }
}

export default SignUp;
