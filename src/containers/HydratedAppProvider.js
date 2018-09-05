import React, { Component } from "react";
import { Provider } from "react-redux";
import PropTypes from "prop-types";
import { persistStore } from "redux-persist";

class HydratedAppProvider extends Component {
  constructor() {
    super();
    this.state = { rehydrated: false };
  }

  componentWillMount() {
    const { store } = this.props;
    persistStore(store, {}, () => {
      this.setState({ rehydrated: true });
    });
  }

  render() {
    const { store, children } = this.props;
    const { rehydrated } = this.state;
    if (!rehydrated) {
      return <span>Loading</span>;
    }
    return <Provider store={store}>{children}</Provider>;
  }
}

HydratedAppProvider.propTypes = {
  store: PropTypes.shape(PropTypes.object).isRequired,
  children: PropTypes.shape(PropTypes.object).isRequired
};

export default HydratedAppProvider;
