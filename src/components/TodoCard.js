import React from "react";
import { Card } from "antd";
import { Link } from "react-router-dom";
import { HeartTwoTone } from "@ant-design/icons";

const { Meta } = Card;
const IconText = ({ icon, text }) => (
  <div style={{ textAlign: "right", paddingBottom: "5px" }}>
    {React.createElement(icon)}
    {text}
  </div>
);

export default function TodoCard(props) {
  return (
    <div>
      <Link to={`/todo/${props._id}`}>
        <Card
          hoverable
          size="small"
          style={{ width: "20vw", minWidth: 288, minHeight: 328 }}
          cover={
            <div
              style={{
                height: 160,
                width: "20vw",
                minWidth: 288,
                overflow: "hidden",
              }}
            >
              image
            </div>
          }
        >
          <Meta title={props.title} description={props.body} />
          <IconText
            icon={HeartTwoTone}
            text={props.liked}
            key="list-vertical-like-o"
          />
        </Card>
      </Link>
    </div>
  );
}
