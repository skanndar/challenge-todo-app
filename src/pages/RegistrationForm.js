import React from "react";
import { withAuth } from "../lib/Auth";

import { Form, Input, Alert, Row, Col, Checkbox, Button, Radio } from "antd";
import { KeyOutlined, UserOutlined, MailOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";

const formItemLayout = {
  labelCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 8,
    },
  },
  wrapperCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 24,
    },
  },
};
const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 24,
      offset: 0,
    },
  },
};

const RegistrationForm = (props) => {
  const [form] = Form.useForm();

  const onFinish = (values) => {
    const { agreement, confirm, email, fName, genre, lName, password } = values;
    // console.log("props :>> ", props);
    props.signup(agreement, confirm, email, fName, genre, lName, password);

    // console.log(
    //   "Received values of form: ",
    //   agreement,
    //   confirm,
    //   email,
    //   fName,
    //   genre,
    //   lName,
    //   password
    // );
  };

  const { errorMessage } = props;

  return (
    <Row className="signupRow" justify="center" align="middle">
      <Col className="homeLogo">
        <img src="/isoLogo.png" alt="logo-home" />
        <Form
          {...formItemLayout}
          form={form}
          name="register"
          onFinish={onFinish}
          scrollToFirstError
        >
          <Form.Item
            ref={(input) => input && input.focus()}
            name="fName"
            rules={[
              {
                required: true,
                message: "Your Name is required!",
                whitespace: true,
              },
            ]}
          >
            <Input
              ref={(input) => input && input.focus()}
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="Name"
            />
          </Form.Item>

          <Form.Item
            name="lName"
            rules={[
              {
                required: true,
                message: "Your Lastname is required!",
                whitespace: true,
              },
            ]}
          >
            <Input
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="Lastname"
            />
          </Form.Item>

          <Form.Item
            name="email"
            rules={[
              {
                type: "email",
                message: "The input is not valid E-mail!",
              },
              {
                required: true,
                message: "Please input your E-mail!",
              },
            ]}
          >
            <Input
              prefix={<MailOutlined className="site-form-item-icon" />}
              placeholder="email"
            />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                message: "Please input your password!",
              },
            ]}
            hasFeedback
          >
            <Input.Password
              prefix={<KeyOutlined className="site-form-item-icon" />}
              placeholder="password"
            />
          </Form.Item>

          <Form.Item
            name="confirm"
            dependencies={["password"]}
            hasFeedback
            rules={[
              {
                required: true,
                message: "Please confirm your password!",
              },
              ({ getFieldValue }) => ({
                validator(rule, value) {
                  if (!value || getFieldValue("password") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    "The two passwords that you entered do not match!"
                  );
                },
              }),
            ]}
          >
            <Input.Password
              prefix={<KeyOutlined className="site-form-item-icon" />}
              placeholder="confirm password"
            />
          </Form.Item>

          <Form.Item
            name="genre"
            rules={[
              {
                required: true,
                message: "Gender is required!",
                whitespace: true,
              },
            ]}
          >
            <Radio.Group>
              <Radio value={"male"}>Male</Radio>
              <Radio value={"female"}>Female</Radio>
            </Radio.Group>
          </Form.Item>

          <Form.Item
            name="agreement"
            valuePropName="checked"
            rules={[
              {
                validator: (_, value) =>
                  value
                    ? Promise.resolve()
                    : Promise.reject("Should accept agreement"),
              },
            ]}
            {...tailFormItemLayout}
          >
            <Checkbox>
              I have read the <Link to="#">agreement</Link>
            </Checkbox>
          </Form.Item>
          <Form.Item {...tailFormItemLayout}>
            <Button type="primary" htmlType="submit">
              Register
            </Button>
          </Form.Item>
        </Form>
        {errorMessage ? (
          <Alert message={errorMessage} type="error" showIcon closable />
        ) : null}
      </Col>
    </Row>
  );
};

export default withAuth(RegistrationForm);
