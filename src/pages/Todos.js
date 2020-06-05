import React, { Component } from "react";
import { withAuth } from "../lib/Auth";
import TodoCard from "../components/TodoCard";
import { List, Row, Col } from "antd";
import FilterDrawer from "../components/FilterDrawer";
import AddTodoForm from "../components/AddTodoForm";

class Todos extends Component {
  state = {
    todos: [],
    isLoading: false,
  };
  componentDidMount() {
    // console.log("this.props.location.state :>> ", this.props.location.state);
    if (this.props.location.state) {
      const { todos } = this.props.location.state;
      setTimeout(() => {
        this.setState({ todos, isLoading: false });
      }, 1000);
    }
  }

  componentDidUpdate(prevProps) {
    const { todos: newtodos } = this.props.location.state;
    const { todos: oldtodos } = prevProps.location.state;

    if (newtodos !== oldtodos) {
      this.setState({ isLoading: true });
      setTimeout(() => {
        this.setState({ todos: newtodos, isLoading: false });
      }, 500);
    }
  }

  render() {
    const todos = this.state.todos;
    const { isLoading } = this.state;
    return (
      <>
        {isLoading ? (
          <Row className="loadingSearch" justify="center" align="middle">
            <Col>loading...</Col>
          </Row>
        ) : (
          <div>
            <AddTodoForm></AddTodoForm>
            <h1>Found {todos.length} todos</h1>
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
              dataSource={todos}
              renderItem={(oneTodo) => (
                <List.Item>
                  <TodoCard {...oneTodo} />
                </List.Item>
              )}
            />
          </div>
        )}
      </>
    );
  }
}

export default withAuth(Todos);
