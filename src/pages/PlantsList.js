import React, { Component } from "react";
import { withAuth } from "./../lib/Auth";
import PlantCard from "../components/PlantCard";
import { List, Row, Col } from "antd";
import FilterDrawer from "../components/FilterDrawer";
import AplantidaIcon from "../components/AplantidaIcon";

class PlantsList extends Component {
  state = {
    plants: [],
    isLoading: true,
  };
  componentDidMount() {
    // console.log("this.props.location.state :>> ", this.props.location.state);
    if (this.props.location.state) {
      const { plants } = this.props.location.state;
      setTimeout(() => {
        this.setState({ plants, isLoading: false });
      }, 1000);
    }
  }

  componentDidUpdate(prevProps) {
    const { plants: newPlants } = this.props.location.state;
    const { plants: oldPlants } = prevProps.location.state;

    if (newPlants !== oldPlants) {
      this.setState({ isLoading: true });
      setTimeout(() => {
        this.setState({ plants: newPlants, isLoading: false });
      }, 500);
    }
  }

  render() {
    const plants = this.state.plants;
    const { isLoading } = this.state;
    return (
      <>
        {isLoading ? (
          <Row className="loadingSearch" justify="center" align="middle">
            <Col>
              <AplantidaIcon
                className="logoLoading"
                style={{ fontSize: "200px" }}
              />
              {/* <Spin indicator={antIcon} /> */}
            </Col>
          </Row>
        ) : (
          <div>
            <h1>Found {plants.length} plants</h1>
            <FilterDrawer />
            <List
              className="site-card-wrapper"
              grid={{
                gutter: 16,
                xs: 1,
                sm: 2,
                md: 2,
                lg: 3,
                xl: 4,
                xxl: 4,
              }}
              dataSource={plants}
              renderItem={(onePlant) => (
                <List.Item>
                  <PlantCard {...onePlant} />
                </List.Item>
              )}
            />
          </div>
        )}
      </>
    );
  }
}

export default withAuth(PlantsList);
