import { fetchPosts, fetchPost, creatPost, updatePost } from '../api';

export default {
  FETCH_POST_LIST: ({ commit }) => {
    return fetchPosts().then(posts => {
      posts.sort((a, b) => new Date(b.createTime) - new Date(a.createTime))
      commit('SET_POST_LIST', posts);
    });
  },
  FETCH_POST: ({ commit }, id) => {
    return fetchPost(id).then(post => {
      commit('SET_POST_DETAIL', post)
    });
  },
  CREATE_POST: (context, { title, content }) => {
    return creatPost({ title, content });
  },
  UPDATE_POST: ({ dispatch }, { id, title, content }) => {
    return updatePost({ id, title, content })
  }
};
