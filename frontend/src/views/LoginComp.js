import React, { Component, useState, useEffect } from "react";
// import FormLabel from "../components/elements/FormLabel";
// import Input from "../components/elements/Input";
// import Button from "../components/elements/Button";
import isEmpty from "lodash/isEmpty";
import { Form, Input, Button, Checkbox, Space } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";

import validateInput from "../../src/validations/login";
import axios from "axios";
// import FormHint from "../components/elements/FormHint";

const LoginComp = (props) => {
  const stat = {
    email: "",
    password: "",
    errors: {},
    isLoading: false,
    showError: false,
  };
  const [state, setState] = useState(stat);
  const [error, setError] = useState(false);

  const [form] = Form.useForm();
  const [, forceUpdate] = useState();

  // To disable submit button at the beginning.
  useEffect(() => {
    forceUpdate({});
  }, []);

  function isValid() {
    const { errors, isValid } = validateInput(state);
    if (!isValid) {
      setState({ errors });
      console.log("Empty");
    }
    return isValid;
  }

  const onFinish = (e) => {
    //e.preventDefault();
    console.log(e);
    axios
      .post("/login", e, {
        withCredentials: true,
      })
      .then(function (response) {
        console.log(response);
        window.location = "/";
      })
      .catch((error) => {
        console.log(error);
        setError(true);
      });
  };

  const onChange = (c) => {
    setState({ errors: "" });
  };
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
      }}
    >
      <Space direction="vertical">
        {error ? <p>Credentials are Incorrect</p> : ""}
        <Form
          name="normal_login"
          className="login-form"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onChange={onChange}
          on
        >
          <Form.Item
            name="email"
            rules={[{ required: true, message: "Please input your Email!" }]}
          >
            <Input
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="Email"
            />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{ required: true, message: "Please input your Password!" }]}
          >
            <Input
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="Password"
            />
          </Form.Item>
          <Form.Item>
            <Form.Item name="remember" valuePropName="checked" noStyle>
              <Checkbox>Remember me</Checkbox>
            </Form.Item>

            <a className="login-form-forgot" href="">
              Forgot password
            </a>
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button"
            >
              Log in
            </Button>
            Or <a href="http://localhost:3000/signup">register now!</a>
          </Form.Item>
        </Form>
      </Space>
    </div>
  );
};

export default LoginComp;
