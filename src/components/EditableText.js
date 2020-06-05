import React, { Component } from "react";
import { Typography } from "antd";

const { Paragraph } = Typography;

function EditableText(props) {
  const onChange = (str) => {
    props.updateUserData(props.fieldName, str);
  };

  return <Paragraph editable={{ onChange: onChange }}>{props.text}</Paragraph>;
}

export default EditableText;
