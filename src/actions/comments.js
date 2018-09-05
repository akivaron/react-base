import RECEIVE from "../types/comments";

const receiveComments = (postid, json) => ({
  type: RECEIVE,
  postid,
  comments: json
});

const fetchComments = postid => dispatch =>
  fetch(`https://jsonplaceholder.typicode.com/posts/${postid}/comments`)
    .then(response => response.json())
    .then(json => dispatch(receiveComments(postid, json)));

const shouldFetchComments = (postid, state) => {
  const comments = state.comments.byPost[postid];

  if (!comments) {
    return true;
  }
  if (comments.items) {
    return false;
  }

  return true;
};

const fetchCommentsIfNeeded = postid => (dispatch, getState) => {
  if (shouldFetchComments(postid, getState())) {
    return dispatch(fetchComments(postid));
  }
  return true;
};

export default fetchCommentsIfNeeded;
