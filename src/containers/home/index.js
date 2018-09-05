import React, { Component } from "react";
import { Helmet } from "react-helmet";
import { connect } from "react-redux";

import { Link } from "react-router-dom";

class HomePage extends Component {
  shouldComponentUpdate() {
    return false;
  }

  render() {
    return (
      <div>
        <Helmet>
          <title>Home Page</title>
        </Helmet>

        <h1>Home Page</h1>
        <Link to="/posts">
          Posts API Example
          <br />
        </Link>
        <Link to="/mustlogin">Must Login Example</Link>
      </div>
    );
  }
}

HomePage.propTypes = {};

const mapStateToProps = () => ({});

export default connect(mapStateToProps)(HomePage);
