import React from "react";
import Input from "../components/elements/Input";
import Button from "../components/elements/Button";

import validateInput from "../../src/validations/login";
import FormLabel from "../components/elements/FormLabel";

class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      identifier: "",
      password: "",
      errors: {},
      isLoading: false,
    };
    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
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
      return;
    }
  }
  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    const { errors, identifier, password, isLoading } = this.state;
    return (
      <form onSubmit={this.onSubmit}>
        <Input
          field="identifier"
          label="Username/ Email"
          value={identifier}
          hint={errors.identifier}
          onChange={this.onChange}
        />
        <Input
          field="password"
          label="Password"
          value={password}
          hint={errors.password}
          onChange={this.onChange}
          type="password"
        />
        <div className="form-group">
          <Button className="btn btn-primary btn-lg" disabled={isLoading}>
            Login
          </Button>
        </div>
      </form>
    );
  }
}

export default LoginForm;
