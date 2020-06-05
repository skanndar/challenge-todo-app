import React, { Component } from "react";
import { Row, Col, Carousel, Card, Button } from "antd";
import { HeartTwoTone, HeartOutlined } from "@ant-design/icons";
import axios from "axios";
import Reviews from "../components/Reviews";
import AddTodoForm from "../components/AddTodoForm";
import Axios from "axios";
import { withAuth } from "../lib/Auth";

const tabList = [
  {
    key: "tab1",
    tab: "Characteristics",
  },
  {
    key: "tab2",
    tab: "Reviews",
  },
];

const IconText = ({ icon, text }) => (
  <div style={{ textAlign: "right", paddingBottom: "5px" }}>
    {React.createElement(icon)}
    {text}
  </div>
);

class PlantDetail extends Component {
  state = {
    todo: null,
    reviews: null,
    key: "tab1",
    isLoading: true,
    favorite: null,
  };

  // addReview = (review) => {
  //   // console.log("review :>> ", review);
  //   const todoCopy = { ...this.state.todo };
  //   todoCopy.reviews.unshift(review);
  //   this.setState({ todo: todoCopy });
  // };

  addReview = (review) => {
    this.search();
  };

  search = () => {
    //Get the id from props.match.params.id
    const name = this.props.match.params.title;
    // console.log("todoLatinName :>> ", name);
    axios
      .get(process.env.REACT_APP_API_URL + `/api/todo/${name}`, {
        withCredentials: true,
      })
      .then((response) => {
        console.log("response", response);
        // this.props.me()

        const { user } = this.props;
        console.log("user from favorites :>> ", user);

        const todo = response.data;
        console.log("todo._id :>> ", todo._id);

        const isFavorite = user.favorites.find((favorite) => {
          console.log("favorite._id :>> ", favorite._id);
          return favorite._id === todo._id;
        });

        console.log("isFavorite :>> ", isFavorite);

        this.setState({
          todo: response.data,
          reviews: response.data.reviews,
          isLoading: false,
          favorite: isFavorite,
        });
      })
      .catch((err) => console.log(err));
  };

  componentDidMount() {
    this.search();
  }

  onTabChange = (key, type) => {
    // console.log(key, type);
    this.setState({ [type]: key });
  };

  handleClick = () => {
    const { todo, favorite } = this.state;
    const action = favorite ? "remove" : "add";
    const todoId = todo._id;

    Axios.put(
      process.env.REACT_APP_API_URL + `/api/favorites/`,
      { todoId, action },
      {
        withCredentials: true,
      }
    )
      .then((response) => {
        this.setState({ favorite: !this.state.favorite }, () =>
          this.props.me()
        );

        console.log(response);
      })
      .catch((err) => console.log(err));
  };

  render() {
    const { todo, isLoading, favorite } = this.state;
    console.log("this.state.favorite :>> ", this.state.favorite);
    let contentList;
    if (todo && !isLoading) {
      contentList = {
        tab1: (
          <>
            <Card style={{ marginTop: 16 }} type="inner" title="Common Name">
              {todo.commonName}
            </Card>
            <Card style={{ marginTop: 16 }} type="inner" title="Family">
              {todo.characteristics.family}
            </Card>
            <Card style={{ marginTop: 16 }} type="inner" title="Habitats">
              {todo.characteristics.habitats}
            </Card>
            <Card
              style={{ marginTop: 16 }}
              type="inner"
              title="Edibility Rating"
            >
              {todo.characteristics.edibilityRating}
            </Card>
            <Card
              style={{ marginTop: 16 }}
              type="inner"
              title="Medicinal Rating"
            >
              {todo.characteristics.medicinalRating}
            </Card>
            <Card style={{ marginTop: 16 }} type="inner" title="Other Uses">
              {todo.characteristics.otherUses}
            </Card>
            <Card style={{ marginTop: 16 }} type="inner" title="Care">
              {todo.characteristics.care.imgUrl.map((img) => {
                return (
                  <>
                    <img src={img} alt="" />{" "}
                  </>
                );
              })}
            </Card>

            <Card style={{ marginTop: 16 }} type="inner" title="Range">
              {todo.characteristics.range}
            </Card>
            <Card style={{ marginTop: 16 }} type="inner" title="Weed Potential">
              {todo.characteristics.weedPotential}
            </Card>
            <Card
              style={{ marginTop: 16 }}
              type="inner"
              title={
                <>
                  Known Hazards{" "}
                  <img src={todo.characteristics.knownHazards.imgUrl} alt="" />
                </>
              }
            >
              {todo.characteristics.knownHazards.text}
            </Card>
            <Card style={{ marginTop: 16 }} type="inner" title="USDA Hardiness">
              {todo.characteristics.USDAHardiness}
            </Card>
            <Card style={{ marginTop: 16 }} type="inner" title="Liked">
              {todo.characteristics.liked}
            </Card>
          </>
        ),
        tab2: (
          <Reviews key={Math.floor(Math.random() * 1000)} data={todo}></Reviews>
        ),
      };
    } else {
      contentList = {
        tab1: <div>loading</div>,
        tab2: <div>loading</div>,
      };
    }

    return todo ? (
      <Row className="todoDetail" justify="center" align="top">
        <Col>
          <Carousel autoplay style={{ maxHeight: "400px" }}>
            {todo.img.map((img) => {
              return (
                <>
                  <img
                    src={img}
                    style={{
                      minWidth: "100vw",
                      maxHeight: "auto",
                      transform: "translate(-0%, -30%)",
                    }}
                    alt={todo.title}
                  />
                </>
              );
            })}
          </Carousel>
        </Col>

        <Card
          style={{ width: "100%" }}
          title={
            <>
              <Row style={{ justifyContent: "space-between" }}>
                <h1> {todo.title}</h1>
                {this.state.key === "tab2" ? (
                  <AddTodoForm
                    addReview={this.addReview}
                    search={this.search}
                    todo={todo}
                  />
                ) : null}
                <Button onClick={this.handleClick}>
                  {favorite ? (
                    <IconText
                      icon={HeartTwoTone}
                      // text={todo.liked}
                      key="list-vertical-like-o"
                    />
                  ) : (
                    <HeartOutlined />
                  )}
                </Button>
              </Row>
            </>
          }
          tabList={tabList}
          activeTabKey={this.state.key}
          onTabChange={(key) => {
            this.onTabChange(key, "key");
          }}
        >
          {contentList[this.state.key]}
        </Card>
      </Row>
    ) : null;
  }
}

export default withAuth(PlantDetail);
