import React, { Component } from "react";
import { Slider } from "antd";
import { FrownOutlined, SmileOutlined } from "@ant-design/icons";
import { withAuth } from "../lib/Auth";

class SliderFilter extends Component {
  state = {
    value: 0,
  };

  handleChange = (value) => {
    this.setState({ value });
  };

  render() {
    const { max, min } = this.props;
    const { value } = this.state;
    const mid = ((max - min) / 2).toFixed(5);
    const preColorCls = value >= mid ? "" : "icon-wrapper-active";
    const nextColorCls = value >= mid ? "icon-wrapper-active" : "";
    return (
      <div className="icon-wrapper">
        <FrownOutlined className={preColorCls} />
        <Slider
          range
          step={1}
          defaultValue={[0, 5]}
          min={this.props.min}
          max={this.props.max}
          onChange={this.handleChange}
          onAfterChange={this.handleChange}
        />
        <SmileOutlined className={nextColorCls} />
      </div>
    );
  }
}

export default withAuth(SliderFilter);
