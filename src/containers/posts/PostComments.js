import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { isEqual } from "lodash";
import fetchCommentsIfNeeded from "../../actions/comments";

class PostComments extends Component {
  static fetchData(store, match) {
    return store.dispatch(fetchCommentsIfNeeded(match.params.id));
  }

  componentDidMount() {
    this.fetchCommentsData();
  }

  shouldComponentUpdate(nextProps) {
    const { comments } = this.props;
    if (!isEqual(comments, nextProps.comments)) {
      return true;
    }
    return false;
  }

  componentDidUpdate(prevProps) {
    const { match } = this.props;
    if (match.params.id !== prevProps.match.params.id) {
      this.fetchCommentsData();
    }
  }

  fetchCommentsData() {
    const { dispatch, match } = this.props;
    dispatch(fetchCommentsIfNeeded(match.params.id));
  }

  render() {
    const { comments, match } = this.props;

    return (
      <div>
        <h3>
          Comments to Post
          {match.params.id}
        </h3>
        <ul>
          {comments &&
            comments.map(comment => (
              <li key={comment.id}>
                <strong>{comment.email}</strong>
                {comment.body}
              </li>
            ))}
        </ul>
      </div>
    );
  }
}

PostComments.propTypes = {
  comments: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      email: PropTypes.string.isRequired,
      body: PropTypes.string
    })
  ).isRequired,
  match: PropTypes.shape(PropTypes.object).isRequired,
  dispatch: PropTypes.func.isRequired
};

const mapStateToProps = (state, ownProps) => {
  const byPostMatch = state.comments.byPost[ownProps.match.params.id];

  return {
    comments: byPostMatch ? byPostMatch.items : null
  };
};

export default connect(mapStateToProps)(PostComments);
