import React from "react";
import LoginForm from "./LoginForm";
import GenericSection from "../components/sections/GenericSection";

class SignUp extends React.Component {
  render() {
    return (
      <>
        <div className="row">
          <div className="col-md-4 col-md-offset-4">
            <GenericSection>
              <LoginForm />
            </GenericSection>
          </div>
        </div>
      </>
    );
  }
}

export default SignUp;
