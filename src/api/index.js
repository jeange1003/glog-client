import axios from 'axios';

axios.defaults.baseURL = process.env.VUE_ENV === 'server' ? `http://localhost:${process.env.API_PORT}` : `${(process.env.BASE_ROUTE ? process.env.BASE_ROUTE : '')}/api`;

export function fetchPosts() {
  return axios.get('/posts').then(
    res => {
      if (res.status === 200) {
        return Promise.resolve(res.data);
      }
    },
    () => {
      throw new Error('error');
    }
  );
}

export function fetchPost(id) {
  return axios.get(`posts/${id}`).then(
    res => {
      if (res.status === 200) {
        return Promise.resolve(res.data);
      }
    },
    () => {
      throw new Error('error');
    }
  );
}

export function creatPost({title, content}) {
  return axios.put('/posts', {title, content}).then(res => {
    if (res.status === 200) {
      return Promise.resolve(res.data)
    }
  },
  () => {
    throw new Error('error')
  })
}