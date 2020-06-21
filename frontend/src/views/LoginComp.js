import React, { Component } from "react";
import FormLabel from "../components/elements/FormLabel";
import Input from "../components/elements/Input";
import Button from "../components/elements/Button";

import validateInput from "../../src/validations/login";
import axios from "axios";

export default class LoginComp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      errors: {},
      isLoading: false,
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
    if (this.isValid()) {
      axios
        .post("http://localhost:9000/login", this.state, {
          withCredentials: true,
        })
        .then(function (response) {
          console.log(response);
          window.location;
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  }
  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    const { errors, email, password, isLoading } = this.state;
    return (
      <form onSubmit={this.onSubmit}>
        <h3>Sign In</h3>

        <div className="form-group">
          <FormLabel>Email address</FormLabel>
          <Input
            type="email"
            name="email"
            className="form-control"
            placeholder="Enter email"
            value={this.state.email}
            hint={errors.email}
            onChange={this.onChange}
          />
        </div>

        <div className="form-group">
          <FormLabel>Password</FormLabel>
          <Input
            type="password"
            name="password"
            className="form-control"
            placeholder="Enter password"
            value={this.state.password}
            hint={errors.password}
            onChange={this.onChange}
          />
        </div>

        <div className="form-group">
          <div className="custom-control custom-checkbox">
            <input
              type="checkbox"
              className="custom-control-input"
              id="customCheck1"
            />
            <FormLabel className="custom-control-label" htmlFor="customCheck1">
              Remember me
            </FormLabel>
          </div>
        </div>

        <Button
          type="submit"
          className="btn btn-primary btn-block"
          disabled={isLoading}
        >
          Submit
        </Button>
        <p className="forgot-password text-right">
          Forgot <a href="#">password?</a>
        </p>
      </form>
    );
  }
}
