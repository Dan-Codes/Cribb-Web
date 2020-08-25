import React from "react";
import Input from "../components/elements/Input";
import Button from "../components/elements/Button";

import validateInput from "../../src/validations/login";
import FormLabel from "../components/elements/FormLabel";
import axios from "axios";
import lodash from "lodash";
import GenericSection from "../components/sections/GenericSection";

class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      errors: {},
      isLoading: false,
      admin: false,
      showError: false,
      invalidInput: false,
    };
    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
    //this.onChange = this.isValid.bind(this);
  }

  isValid() {
    const { errors, isValid } = validateInput(this.state);
    if (!isValid) {
      this.setState({ errors });
      console.log("Empty");
    }
    return isValid;
  }

  onSubmit(e) {
    e.preventDefault();
    this.setState({ showError: false, invalidInput: false });
    if (this.isValid()) {
      axios
        .post("http://localhost:9000/signup", this.state)
        .then((response) => {
          console.log(response);
          const status = response.status;
          if (status == 200) {
            window.location = "/login";
          }
        })
        .catch((error) => {
          console.log("error caught: ", error.message);
          this.setState({ showError: true, invalidInput: true });
        });
    }
  }
  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    const {
      errors,
      email,
      password,
      isLoading,
      firstName,
      lastName,
    } = this.state;
    return (
      <form onSubmit={this.onSubmit} className="reveal-from-bottom">
        <div>
          {this.state.showError ? (
            <p className="text-xxs text-color-error"> User already exists</p>
          ) : null}
          {this.state.invalidInput ? (
            <p className="text-xxs text-color-error">Invalid inputs</p>
          ) : null}
          <Input
            type="text"
            name="firstName"
            label="First Name"
            value={this.state.firstName}
            hint={errors.firstName}
            onChange={this.onChange}
            className="mb-32"
            data-reveal-delay="180"
          />
        </div>

        <Input
          type="text"
          name="lastName"
          label="Last Name"
          value={this.state.lastName}
          hint={errors.lastName}
          onChange={this.onChange}
          className="mb-32"
          data-reveal-delay="190"
        />
        <Input
          type="email"
          name="email"
          label="Username/ Email"
          value={this.state.email}
          hint={errors.email}
          onChange={this.onChange}
          className="mb-32"
          data-reveal-delay="200"
        />
        <Input
          type="password"
          name="password"
          label="Password"
          value={this.state.password}
          hint={errors.password}
          onChange={this.onChange}
          type="password"
          className="mb-32"
        />
        <div className="form-group">
          <Button className="mt-16 btn btn-primary btn-lg" disabled={isLoading}>
            Login
          </Button>
        </div>
      </form>
    );
  }
}

export default LoginForm;
