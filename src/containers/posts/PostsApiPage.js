import React, { Component } from "react";
import { Helmet } from "react-helmet";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import PostList from "../../components/PostList";

import fetchPostsIfNeeded from "../../actions/posts";

class PostsApiPage extends Component {
  static fetchData(store) {
    return store.dispatch(fetchPostsIfNeeded());
  }

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(fetchPostsIfNeeded());
  }

  render() {
    const { posts } = this.props;
    return (
      <div>
        <Helmet>
          <title>Posts</title>
        </Helmet>

        <h1>Posts</h1>
        <PostList posts={posts} />
      </div>
    );
  }
}

PostsApiPage.propTypes = {
  posts: PropTypes.shape(PropTypes.object).isRequired,
  dispatch: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  posts: state.posts.items
});

export default connect(mapStateToProps)(PostsApiPage);
