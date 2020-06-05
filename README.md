# TODO challenge

<br>

## Description

This is app aims to help the user manage a TODO list

## User Stories

- **404:** As an anon/user I can see a 404 page if I try to reach a page that does not exist so that I know it's my fault
- **Signup:** As an anon I can sign up in the platform so that I can start searching for plants
- **Login:** As a user I can login to the platform so that I can search for plants
- **Logout:** As a user I can logout from the platform so no one else can use it on my behalf
- **Create todo** As a user I want to create a new todo/task with title and body and save it in the database.
- **List todos** As a user I want to see all my todos in a list.
- **Delete todo** As a user I want to delete a todo from the list when I don't want it anymore.

## Backlog

- Update todo A a user I want to be able to modify an existing todo.
- Done As a user I want to mark my todo as done.
- Move todos As a user I want to rearrange my todos

<br>

# Client / Frontend

## React Router Routes (React App)

| Path      | Component  | Permissions                | Behavior                                                      |
| --------- | ---------- | -------------------------- | ------------------------------------------------------------- |
| `/`       | SplashPage | public `<Route>`           | Home page                                                     |
| `/signup` | SignupPage | anon only `<AnonRoute>`    | Signup form, link to login, navigate to homepage after signup |
| `/login`  | LoginPage  | anon only `<AnonRoute>`    | Login form, link to signup, navigate to homepage after login  |
| `/logout` | n/a        | user only `<PrivateRoute>` | Navigate to homepage after logout, expire session             |
| `/todos`  | TodosList  | user only `<PrivateRoute>` | todos list, add todo, link to todo detail, delete todo        |

## Components

- LoginPage
- SignupPage
- SplashPage
- TodosList

## Services

- Auth Service
  - auth.login(userObj)
  - auth.signup(userObj)
  - auth.logout()
  - auth.me()
- Todos Service

  - getAllTodos()
  - getTodo()
  - createTodo()
  - updateTodo()
  - deleteTodo()

<br>

# Server / Backend

## Models

Todo model

```javascript
 title: {
    type: String
  },
  body: {
    type: String
  }
},{ timestamps: true }
```

## API Endpoints (backend routes)

| HTTP Method | URL             | Request Body                           | Success status | Error Status | Description                                                                                                                     |
| ----------- | --------------- | -------------------------------------- | -------------- | ------------ | ------------------------------------------------------------------------------------------------------------------------------- |
| GET         | `/auth/profile` | Saved session                          | 200            | 404          | Check if user is logged in and return profile page                                                                              |
| POST        | `/auth/signup`  | {fName, lName, email, genre, password} | 201            | 404          | Checks if fields not empty (422) and user not exists (409), then create user with encrypted password, and store user in session |
| POST        | `/auth/login`   | {email, password}                      | 200            | 401          | Checks if fields not empty (422), if user exists (404), and if password matches (404), then stores user in session              |
| POST        | `/auth/logout`  | (empty)                                | 204            | 400          | Logs out the user                                                                                                               |
| GET         | `/todos`        |                                        | 200            | 404          | Show all todos                                                                                                                  |
| GET         | `/todos/:id`    | {id}                                   | 200            | 404          | Show specific todo                                                                                                              |
| PUT         | `/todos/:id`    | {title, body}                          | 200            | 400          | Edit todo                                                                                                                       |
| DELETE      | `/todos/:id`    | {id}                                   | 201            | 400          | delete todo                                                                                                                     |
| POST        | `/todos/`       | {title, body}                          | 201            | 400          | Create and save a new todo                                                                                                      |

<br>

## Links

### Trello/Kanban

[Link]()

### Git

The url to your repository and to your deployed project

[Client repository Link](https://github.com/skanndar/challenge-todo-app)

[Server repository Link](https://github.com/skanndar/challenge-todo-api)

[Deployed App Link]()

### Slides

The url to your presentation slides

[Slides Link]()
