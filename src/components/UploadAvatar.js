import { Upload, message } from "antd";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import React, { Component } from "react";
import { withAuth } from "../lib/Auth";

function getBase64(img, callback) {
  const reader = new FileReader();
  reader.addEventListener("load", () => callback(reader.result));
  reader.readAsDataURL(img);
}

function beforeUpload(file) {
  const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
  if (!isJpgOrPng) {
    message.error("You can only upload JPG/PNG file!");
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error("Image must smaller than 2MB!");
  }
  return isJpgOrPng && isLt2M;
}

class UploadAvatar extends Component {
  state = {
    loading: false,
    imageUrl: this.props.user.image,
  };

  handleChange = (info) => {
    console.log("info :>> ", info);
    if (info.file.status === "uploading") {
      this.setState({ loading: true });
      return;
    }
    if (info.file.status === "done") {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj, (imageUrl) =>
        this.setState(
          {
            imageUrl,
            loading: false,
          },
          () => {
            this.props.me();
            this.props.updateUser();
          }
        )
      );
    }
  };

  render() {
    const uploadButton = (
      <div>
        {this.state.loading ? <LoadingOutlined /> : <PlusOutlined />}
        <div className="ant-upload-text">Upload</div>
      </div>
    );
    const { imageUrl } = this.state;
    return (
      <Upload
        name="photo"
        listType="picture-card"
        className="avatar-uploader"
        showUploadList={false}
        action={process.env.REACT_APP_API_URL + "/todos-picture"}
        withCredentials="true"
        beforeUpload={beforeUpload}
        onChange={this.handleChange}
      >
        {imageUrl ? (
          <img src={imageUrl} alt="avatar" style={{ width: "100%" }} />
        ) : (
          uploadButton
        )}
      </Upload>
    );
  }
}
export default withAuth(UploadAvatar);
