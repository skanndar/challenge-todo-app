import React, { Component } from "react";
import { Form, Input, Button, Alert } from "antd";
import Axios from "axios";
import { withAuth } from "../lib/Auth";

const layout = {
  wrapperCol: {
    span: 24,
  },
};
let validateMessages = {
  required: "${name} is required!",
};

class AddTodoForm extends Component {
  state = {
    ModalText: "",
    visible: false,
    confirmLoading: false,
  };

  onFinish = (values) => {
    // console.log("this is the new review --> ", values);
    const { title, body } = values;

    // Add todo
    Axios.post(
      process.env.REACT_APP_API_URL + `/api/v1/todos`,
      { title, body },
      {
        withCredentials: true,
      }
    )
      .then((response) => {
        console.log("response.data :>> ", response.data);
        this.handleOk();
        this.props.addReview(response.data);
        // console.log("response.data from review :>> ", response.data);
      })

      .catch((err) => console.log("error :>> ", err));
  };

  showModal = () => {
    this.setState({
      visible: true,
    });
  };

  handleOk = () => {
    let sec = 4;
    const intervalId = setInterval(() => {
      this.setState({
        ModalText: `Success ... closing in  ${sec}`,
        confirmLoading: true,
      });
      sec--;
    }, 1000);

    setTimeout(() => {
      this.setState(
        {
          visible: false,
          confirmLoading: false,
        },
        () => clearInterval(intervalId)
      );
    }, 5000);
  };

  handleCancel = () => {
    console.log("Clicked cancel button");
    this.setState({
      visible: false,
    });
  };

  render() {
    const { confirmLoading, ModalText } = this.state;
    return (
      <Form
        {...layout}
        name="nest-messages"
        onFinish={this.onFinish}
        validateMessages={validateMessages}
      >
        {confirmLoading ? <Alert message={ModalText} type="success" /> : null}

        <Form.Item name="title" rules={[{ required: true }]}>
          <Input placeholder="Title" />
        </Form.Item>
        <Form.Item name="body" rules={[{ required: true }]}>
          <Input.TextArea placeholder="Add todo description here..." />
        </Form.Item>
        <Form.Item wrapperCol={{ ...layout.wrapperCol }}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    );
  }
}

export default withAuth(AddTodoForm);
