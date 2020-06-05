import React, { Component } from "react";
import "./App.less";
import { Switch, Route } from "react-router-dom";

// PAGES & COMPONENTS
import Home from "./pages/Home";
import LoginForm from "./pages/LoginForm";
import Todos from "./pages/Todos";
import PlantDetail from "./pages/PlantDetail";
import RegistrationForm from "./pages/RegistrationForm";
import PublicRoute from "./components/PublicRoute";
import PrivateRoute from "./components/PrivateRoute";
import Navbar from "./components/Navbar";

import { Layout, Row, Col } from "antd";
import NotFound from "./pages/NotFound";

const { Content, Footer } = Layout;

class App extends Component {
  state = {
    isLoading: true,
  };

  componentDidMount() {
    setTimeout(() => {
      this.setState({ isLoading: false });
    }, 1000);
  }

  render() {
    let { isLoading } = this.state;

    return (
      <>
        {isLoading ? (
          <Row className="loading" justify="center" align="middle">
            <Col>loading...</Col>
          </Row>
        ) : (
          <Layout>
            <Navbar></Navbar>

            <Content
              className="site-layout"
              style={{ padding: "0 10px", marginTop: 114 }}
            >
              <div
                className="site-layout-background"
                style={{ padding: 14, minHeight: "73vh" }}
              >
                <Switch>
                  <PrivateRoute
                    exact
                    path="/todo/:title"
                    component={PlantDetail}
                  />
                  <Route exact path="/" component={Home} />
                  <PublicRoute
                    exact
                    path="/signup"
                    component={RegistrationForm}
                  />
                  <PublicRoute exact path="/login" component={LoginForm} />
                  <PrivateRoute exact path="/todos" component={Todos} />
                  <PrivateRoute exact path="/search" component={Todos} />
                  <Route component={NotFound} />
                </Switch>
              </div>
            </Content>
            <Footer style={{ textAlign: "center" }}>
              TODOS ©{new Date().getFullYear()} <br /> Powered by ME
            </Footer>
          </Layout>
        )}
      </>
    );
  }
}

export default App;
