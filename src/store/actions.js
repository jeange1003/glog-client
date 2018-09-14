import {
  fetchPosts,
  fetchPost,
  creatPost
} from '../api';

export default {
  FETCH_POST_LIST: ({ commit }) => {
    return fetchPosts().then(posts => {
      commit('SET_POST_LIST', posts);
    });
  },
  FETCH_POST: ({ commit }, id) => {
    return fetchPost(id).then(post => {
      commit('SET_POST_DETAIL', post);
    });
  },
  CREATE_POST: (context, {title, content}) => {
    return creatPost({title, content})
  }
};
