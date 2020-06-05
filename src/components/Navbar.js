import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import { withAuth } from "./../lib/Auth";
import { UserOutlined, LogoutOutlined } from "@ant-design/icons";
import { Input, Layout, Menu, Avatar } from "antd";
import axios from "axios";

const { Header } = Layout;

const { Search } = Input;

class Navbar extends Component {
  state = {
    todos: [],
    errorMessage: undefined,
  };

  search = (searchStr) => {
    axios
      .post(
        process.env.REACT_APP_API_URL + "/api/v1/todos",
        { searchStr },
        { withCredentials: true }
      )
      .then((response) => {
        this.setState(
          { todos: response.data, errorMessage: undefined },
          () => {
            this.props.history.push({
              pathname: "/search",
              state: { todos: this.state.todos },
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

  render() {
    // `user`, `logout`, `isLoggedIn` are coming from the AuthProvider
    // and are injected by the withAuth HOC
    const { logout, isLoggedIn, isLoading, user } = this.props;
    const { search } = this;

    return (
      <Header style={{ position: "fixed", zIndex: 1, width: "100%" }}>
        <span className="containerLogo">
          <Link to={"/"}>LOGO</Link>
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
                <Link to={"/todos"}>
                  <SyncOutlined spin />
                </Link>
              </Menu.Item> */}
                <Menu.Item key="2">
                  <Link to={"/todos"}>
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
                placeholder={isLoggedIn ? "Search Todos" : null}
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
                <Link to={"/todos"}>
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
