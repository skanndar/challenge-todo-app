import React from "react";
import { Row, Col } from "antd";
import { Link } from "react-router-dom";

function Home() {
  return (
    <Row className="logoRow" justify="center" align="middle">
      <Col className="homeLogo" span={24}>
        <Link to="/login">
          <img src="/vertical-horizontal.svg" alt="logo-home" />
        </Link>
      </Col>
    </Row>
  );
}

export default Home;
