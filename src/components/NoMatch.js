import { Component } from "react";
import PropTypes from "prop-types";

class NoMatch extends Component {
  static contextTypes = {
    router: PropTypes.shape({
      staticContext: PropTypes.object
    }).isRequired
  };

  componentWillMount() {
    const { router } = this.context;
    if (router.staticContext) router.staticContext.statusCode = 404;
  }

  shouldComponentUpdate() {
    return false;
  }

  render() {
    return "Sorry, page not found";
  }
}

export default NoMatch;
