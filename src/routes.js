// import { createOnEnter } from "redux-auth-wrapper/history3/redirect";
import HomePage from "./containers/home";
import LoginPage from "./containers/login";
import PostsApiPage from "./containers/posts/PostsApiPage";
import PostComments from "./containers/posts/PostComments";
import NoMatch from "./components/NoMatch";

const routes = [
  {
    path: "/",
    exact: true,
    restricted: false,
    component: HomePage
  },
  {
    path: "/login",
    restricted: false,
    component: LoginPage
  },
  {
    path: "/mustlogin",
    restricted: true,
    component: HomePage
  },
  {
    path: "/posts",
    restricted: false,
    component: PostsApiPage,
    routes: [
      {
        path: "/posts/withcommentsfor/:id",
        restricted: false,
        component: PostComments
      }
    ]
  },
  {
    component: NoMatch
  }
];

export default routes;
