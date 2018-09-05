import React from "react";
import { hydrate } from "react-dom";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";

import configureStore from "./utils/store";
import ScrollToTop from "./components/ScrollToTop";
import App from "./containers/App";
import registerServiceWorker from "./utils/registerServiceWorker";

// If provided by server, use it, else let the reducers handle initial state
const initialState = window.DATA ? window.DATA : {};
const store = configureStore(initialState);

hydrate(
  <Provider store={store}>
    <BrowserRouter>
      <ScrollToTop>
        <App />
      </ScrollToTop>
    </BrowserRouter>
  </Provider>,
  document.getElementById("root")
);
registerServiceWorker();
