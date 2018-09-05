import { createStore, applyMiddleware, compose } from "redux";
import thunkMiddleware from "redux-thunk";
import { createLogger } from "redux-logger";
import reducers from "../reducers";

const logger = createLogger();

export default function configureStore(initialState = {}) {
  const middlewares = [thunkMiddleware, logger];
  const enhancers = [applyMiddleware(...middlewares)];
  const store = createStore(reducers, initialState, compose(...enhancers));

  store.asyncReducers = {}; // Async reducer registry

  return store;
}
