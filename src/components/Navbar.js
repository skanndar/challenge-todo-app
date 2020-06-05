import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import { withAuth } from "./../lib/Auth";
import { UserOutlined, LogoutOutlined } from "@ant-design/icons";
import { Input, Layout, Menu, Alert, Avatar } from "antd";
import axios from "axios";
import AplantidaIcon from "./AplantidaIcon";

const { Header } = Layout;

const { Search } = Input;

class Navbar extends Component {
  state = {
    plants: [],
    errorMessage: undefined,
  };

  search = (searchStr) => {
    axios
      .post(
        process.env.REACT_APP_API_URL + "/api/plants",
        { searchStr },
        { withCredentials: true }
      )
      .then((response) => {
        this.setState(
          { plants: response.data, errorMessage: undefined },
          () => {
            this.props.history.push({
              pathname: "/search",
              state: { plants: this.state.plants },
            });
          }
        );
      })
      .catch((err) => {
        this.setState({
          errorMessage: "Please login or register to be able to search",
        });
        setTimeout(() => {
          this.setState({ errorMessage: undefined });
        }, 2500);
        console.log("this is error -->", err);
      });
  };
  
  // displayError = () => {
  //   return (
  //     this.state.errorMessage,
  //     setTimeout(() => {
  //       this.setState({ errorMessage: undefined });
  //     }, 1000)
  //   );
  // };

  render() {
    // `user`, `logout`, `isLoggedIn` are coming from the AuthProvider
    // and are injected by the withAuth HOC
    const { logout, isLoggedIn, isLoading, user } = this.props;
    const { search } = this;
    const { errorMessage } = this.state;

    return (
      <Header style={{ position: "fixed", zIndex: 1, width: "100%" }}>
        <span className="containerLogo">
          <Link to={"/"}>
            <AplantidaIcon className="logoNav" style={{ fontSize: "50px" }} />
          </Link>
        </span>

        {!isLoading ? (
          isLoggedIn ? (
            <>
              <Menu
                className="menu"
                theme="dark"
                mode="horizontal"
                defaultSelectedKeys={["2"]}
              >
                {/* <Menu.Item key="1">
                <Link to={"/plants"}>
                  <SyncOutlined spin />
                </Link>
              </Menu.Item> */}
                <Menu.Item key="2">
                  <Link to={"/profile"}>
                    {user.image ? (
                      <Avatar src={user.image} />
                    ) : (
                      <Avatar>{user.fName}</Avatar>
                    )}
                  </Link>
                </Menu.Item>
                <Menu.Item key="3" onClick={logout}>
                  <LogoutOutlined />
                </Menu.Item>
              </Menu>
              <Search
                ref={(input) => input && input.focus()}
                className="searchBar"
                placeholder={
                  isLoggedIn ? "Search plants" : "Login to search plants"
                }
                enterButton="search"
                // loading
                size="large"
                allowClear
                onSearch={(value) => {
                  search(value);
                }}
              ></Search>
            </>
          ) : (
            <Menu
              className="menu"
              theme="dark"
              mode="horizontal"
              defaultSelectedKeys={["2"]}
            >
              <Menu.Item key="1">
                <Link to={"/profile"}>
                  <UserOutlined />
                </Link>
              </Menu.Item>
            </Menu>
          )
        ) : null}
      </Header>
    );
  }
}

export default withRouter(withAuth(Navbar));
