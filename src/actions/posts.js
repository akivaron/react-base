import RECEIVE from "../types/posts";

const receivePosts = json => ({
  type: RECEIVE,
  posts: json
});

const fetchPosts = () => dispatch =>
  fetch("https://jsonplaceholder.typicode.com/posts")
    .then(response => response.json())
    .then(json => dispatch(receivePosts(json)));

const shouldFetchPosts = state => {
  const { posts } = state;

  if (posts.items) {
    return false;
  }

  return true;
};

const fetchPostsIfNeeded = () => (dispatch, getState) => {
  if (shouldFetchPosts(getState())) {
    return dispatch(fetchPosts());
  }
  return true;
};

export default fetchPostsIfNeeded;
