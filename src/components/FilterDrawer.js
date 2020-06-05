import React, { useState } from "react";
import { Drawer, Button, Affix } from "antd";
import SliderFilter from "./SliderFilter";

const FilterDrawer = () => {
  const [visible, setVisible] = useState(false);
  const [top, setTop] = useState(120);

  const showDrawer = () => {
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
  };

  return (
    <>
      <Affix offsetTop={top}>
        <Button type="primary" onClick={showDrawer}>
          Filter
        </Button>
      </Affix>
      <Drawer
        title="Filters"
        placement="left"
        closable={true}
        onClose={onClose}
        visible={visible}
        width="320"
        keyboard
        footer={"Powered by ALIADOS"}
      >
        <p>Edibility Rating</p>
        <SliderFilter min={0} max={5} />
        <p>Medicinal Rating</p>
        <SliderFilter min={0} max={5} />
        <p>Other Uses Rating</p>
        <SliderFilter min={0} max={5} />
        <p>Soil - Acid to Alkaline</p>
        <SliderFilter min={0} max={14} />
        <p>Plant Height(meters)</p>
        <SliderFilter min={0} max={50} />
        <p>Plant Width (meters)</p>
        <SliderFilter min={0} max={50} />
      </Drawer>
    </>
  );
};

export default FilterDrawer;
