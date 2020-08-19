import React, { Component, useState, useEffect, useContext } from "react";
import axios from "axios";
import ListItem from "./ListItem";
import { useHistory } from "react-router-dom";
import GenericSection from "../GenericSection";
import {
  Form,
  Input,
  InputNumber,
  Button,
  Rate,
  Switch,
  Row,
  Col,
  Radio,
} from "antd";
import { CribbContext } from "../../../CribbContext";

function ReviewForm(props) {
  const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
  };
  const history = useHistory();
  const cribb = useContext(CribbContext);
  console.log("Review form context api: ", cribb);

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const onFinish = async (values) => {
    var url_string = window.location.href; //window.location.href
    var url = new URL(url_string);
    var address = url.searchParams.get("add");
    var id = url.searchParams.get("id");
    const user_id = cribb[0].user_id;
    values.address = address;
    values.id = id;
    values.user_id = user_id;
    console.log(values);
    await axios
      .post("http://localhost:9000/review", values)
      .then((res) => {
        console.log("response", res);
        history.goBack();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const validateMessages = {
    required: "${label} is required!",
    types: {
      email: "${label} is not validate email!",
      number: "${label} is not a validate number!",
    },
    number: {
      range: "${label} must be between ${min} and ${max}",
    },
  };
  return (
    <>
      <GenericSection>
        <div className="container">
          <h2>Rate this Cribb</h2>
          <h5>Tell us what you think about</h5>
          <h6>Address</h6>

          <Form
            name="nest-messages"
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            validateMessages={validateMessages}
          >
            <Form.Item
              name="avgoverallrating"
              label={<label style={{ color: "white" }}>Overall Rating</label>}
              rules={[{ required: true, message: "Please input your rating!" }]}
            >
              <Rate />
            </Form.Item>
            <Form.Item
              name="location"
              label={<label style={{ color: "white" }}>Location</label>}
              rules={[{ required: true, message: "Please input your rating!" }]}
            >
              <Rate />
            </Form.Item>
            <Form.Item
              name="amenitites"
              label={<label style={{ color: "white" }}>Amenitites</label>}
              rules={[{ required: true, message: "Please input your rating!" }]}
            >
              <Rate />
            </Form.Item>
            <Form.Item
              name="management"
              label={<label style={{ color: "white" }}>Management</label>}
              rules={[{ required: true, message: "Please input your rating!" }]}
            >
              <Rate />
            </Form.Item>
            <Form.Item
              name="comment"
              label={<label style={{ color: "white" }}>Comment</label>}
            >
              <Input.TextArea />
            </Form.Item>

            <Form.Item
              name="liveAgain"
              label={<label style={{ color: "white" }}>Will Live Again?</label>}
              rules={[{ required: true, message: "Please make a selection" }]}
            >
              <Radio.Group>
                <Radio.Button value="true">Yes</Radio.Button>
                <Radio.Button value="false">No</Radio.Button>
              </Radio.Group>
            </Form.Item>

            <Form.Item
              name="postAnonymously"
              label={
                <label style={{ color: "white" }}>Post Anonymously?</label>
              }
              rules={[{ required: true, message: "Please make a selection" }]}
            >
              <Radio.Group>
                <Radio.Button value="true">Yes</Radio.Button>
                <Radio.Button value="false">No</Radio.Button>
              </Radio.Group>
            </Form.Item>

            <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item>
          </Form>
        </div>
      </GenericSection>
    </>
  );
}

export default ReviewForm;
