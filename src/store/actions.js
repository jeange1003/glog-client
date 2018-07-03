import {
  fetchPosts,
  fetchPost
} from '../api';

export default {
  FETCH_POST_LIST: ({ commit }) => {
    return fetchPosts().then(posts => {
      commit('SET_POST_LIST', posts);
    });
  },
  FETCH_POST: ({ commit }, filePath) => {
    return fetchPost(filePath).then(post => {
      commit('SET_POST_DETAIL', post);
    });
  }
};
