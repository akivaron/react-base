import React, { Component } from "react";
import { Helmet } from "react-helmet";

import renderRoutes from "../helpers/renderRoutes";
import routes from "../routes";

class App extends Component {
  test() {
    console.log("adsdsd");
  }

  render() {
    const authed = false;
    const authPath = "/login";
    console.log(JSON.stringify(routes));

    return (
      <div>
        <Helmet defaultTitle="App" titleTemplate="%s - App">
          <meta
            name="description"
            content="This is the default meta description"
          />
        </Helmet>

        {renderRoutes(routes, authed, authPath)}
      </div>
    );
  }
}

export default App;
