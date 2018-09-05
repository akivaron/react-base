import React, { Component } from "react";
import { Helmet } from "react-helmet";
import { connect } from "react-redux";

import { Link } from "react-router-dom";

class LoginPage extends Component {
  shouldComponentUpdate() {
    return false;
  }

  render() {
    return (
      <div>
        <Helmet>
          <title>Login Page</title>
        </Helmet>

        <h1>Login Page</h1>
      </div>
    );
  }
}

LoginPage.propTypes = {};

const mapStateToProps = () => ({});

export default connect(mapStateToProps)(LoginPage);
