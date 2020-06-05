import React, { Component } from "react";
import { Form, Input, Modal, Button, Rate } from "antd";
import { HeartOutlined } from "@ant-design/icons";
import ImageDragger from "./ImageDragger";
import Axios from "axios";

const layout = {
  wrapperCol: {
    span: 24,
  },
};
let validateMessages = {
  required: "${name} is required!",
};

class ReviewModal extends Component {
  state = {
    ModalText: "",
    visible: false,
    confirmLoading: false,
  };

  onFinish = (values) => {
    console.log("this is the new review --> ", values);
    // const { title, text, user, plant, likes, stars } = req.body;

    //   Axios.post(process.env.REACT_APP_API_URL + `/review/${reviewId}`, {
    //     withCredentials: true,
    //   })
    //     .then((response) => {
    //       console.log("response.data :>> ", response.data);
    //       const reviewId = response.data._id;
    //       const newReviewsArray = reviews.filter((review) => {
    //         return review._id !== reviewId;
    //       });
    //       console.log("newReviewsArray :>> ", newReviewsArray);
    //       setReviews(newReviewsArray);
    //     })
    //     .catch((err) => console.log("error :>> ", err));
  };

  showModal = () => {
    this.setState({
      visible: true,
    });
  };

  handleOk = () => {
    this.setState({
      ModalText: "The modal will be closed after two seconds",
      confirmLoading: true,
    });
    setTimeout(() => {
      this.setState({
        visible: false,
        confirmLoading: false,
      });
    }, 2000);
  };

  handleCancel = () => {
    console.log("Clicked cancel button");
    this.setState({
      visible: false,
    });
  };

  render() {
    const { visible, confirmLoading, ModalText } = this.state;
    return (
      <div style={{ textAlign: "right" }}>
        <Button type="primary" onClick={this.showModal}>
          Add Review
        </Button>
        <Modal
          title="New Review"
          visible={visible}
          // onOk={() => {
          //   this.handleOk();
          //   this.onFinish();
          // }}
          // okText="Send"
          confirmLoading={confirmLoading}
          onCancel={this.handleCancel}
          footer={null}
        >
          {
            <Form
              {...layout}
              name="nest-messages"
              onFinish={() => {
                this.onFinish();
                this.handleOk();
              }}
              validateMessages={validateMessages}
            >
              <p>{ModalText}</p>
              {/* <Form.Item name="stars" rules={[{ required: true }]}>
                <Rate
                  defaultValue={parseInt(Math.random() * 6)}
                  character={<HeartOutlined />}
                  allowHalf
                />
              </Form.Item> */}
              <Form.Item name="title" rules={[{ required: true }]}>
                <Input placeholder="Title" />
              </Form.Item>
              <Form.Item name="text" rules={[{ required: true }]}>
                <Input.TextArea placeholder="Write your comment here..." />
              </Form.Item>
              <Form.Item name="image">
                <ImageDragger />
              </Form.Item>
              <Form.Item wrapperCol={{ ...layout.wrapperCol }}>
                <Button type="primary" htmlType="submit">
                  Submit
                </Button>
              </Form.Item>
            </Form>
          }
        </Modal>
      </div>
    );
  }
}

export default ReviewModal;


import React, { Component, useState } from "react";
import { Form, Input, Modal, Button, Rate, Checkbox } from "antd";
import { HeartOutlined } from "@ant-design/icons";
import ImageDragger from "./ImageDragger";
import Axios from "axios";
import { UserOutlined, LockOutlined } from "@ant-design/icons";

const layout = {
  wrapperCol: {
    span: 24,
  },
};
let validateMessages = {
  required: "${name} is required!",
};

const ReviewModal = () => {
  const [ModalText, setModalText] = useState("");
  const [Visible, setVisible] = useState(false);
  const [ConfirmLoading, setConfirmLoading] = useState(false);

  const onFinish = (values) => {
    console.log("this is the new review --> ", values);
    // const { title, text, user, plant, likes, stars } = req.body;

    //   Axios.post(process.env.REACT_APP_API_URL + `/review/${reviewId}`, {
    //     withCredentials: true,
    //   })
    //     .then((response) => {
    //       console.log("response.data :>> ", response.data);
    //       const reviewId = response.data._id;
    //       const newReviewsArray = reviews.filter((review) => {
    //         return review._id !== reviewId;
    //       });
    //       console.log("newReviewsArray :>> ", newReviewsArray);
    //       setReviews(newReviewsArray);
    //     })
    //     .catch((err) => console.log("error :>> ", err));
  };

  const showModal = () => {
    setVisible(true);
  };

  const handleOk = () => {
    setModalText("The modal will be closed after two seconds");
    setConfirmLoading(true);
    setTimeout(() => {
      setVisible(false);
      setConfirmLoading(false);
    }, 2000);
  };

  const handleCancel = () => {
    console.log("Clicked cancel button");
    setVisible(false);
  };

  return (
    <div style={{ textAlign: "right" }}>
      <Button type="primary" onClick={showModal}>
        Add Review
      </Button>
      <Modal
        title="New Review"
        visible={Visible}
        // onOk={() => {
        //   handleOk();
        //   onFinish();
        // }}
        // okText="Send"
        confirmLoading={ConfirmLoading}
        onCancel={handleCancel}
        footer={null}
      >
        <Form
          {...layout}
          name="normal_login"
          className="login-form"
          initialValues={{
            remember: true,
          }}
          onFinish={() => {
            onFinish();
            handleOk();
          }}
        >
          {/* <Form
  
  name="nest-messages"
  initialValues={{
            remember: true,
          }}
  onFinish={() => {
    onFinish();
    handleOk();
  }}
  validateMessages={validateMessages}
> */}
          <Form.Item
            ref={(input) => input && input.focus()}
            name="email"
            rules={[
              {
                required: true,
                message: "Please input your Username!",
              },
            ]}
          >
            <Input
              ref={(input) => input && input.focus()}
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="email"
            />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                message: "Please input your Password!",
              },
            ]}
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

            <a className="login-form-forgot" href="#">
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
            Or <a href="/signup">register now!</a>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default ReviewModal;

{
  /* <Form
  {...layout}
  name="nest-messages"
  initialValues={{
            remember: true,
          }}
  onFinish={() => {
    onFinish();
    handleOk();
  }}
  validateMessages={validateMessages}
>
   <Form.Item name="stars" rules={[{ required: true }]}>
                <Rate
                  defaultValue={parseInt(Math.random() * 6)}
                  character={<HeartOutlined />}
                  allowHalf
                />
              </Form.Item> 
  <Form.Item name="title" rules={[{ required: true }]}>
    <Input placeholder="Title" />
  </Form.Item>
  <Form.Item name="text" rules={[{ required: true }]}>
    <Input.TextArea placeholder="Write your comment here..." />
  </Form.Item>
  <Form.Item name="image">
    <ImageDragger />
  </Form.Item>
  <Form.Item wrapperCol={{ ...layout.wrapperCol }}>
    <Button type="primary" htmlType="submit">
      Submit
    </Button>
  </Form.Item>
</Form>; */
}

