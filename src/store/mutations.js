export default {
  SET_POST_LIST: (state, posts) => {
    state.posts = posts;
  },
  SET_POST_DETAIL: (state, post) => {
    state.currentPost = post;
  }
};
