import axios from 'axios';
import User from '../util/user';

axios.defaults.baseURL =
  process.env.VUE_ENV === 'server'
    ? `http://localhost:${process.env.API_PORT}`
    : `${process.env.BASE_ROUTE ? process.env.BASE_ROUTE : ''}/api`;

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

export function creatPost({ title, content }) {
  const token = User.getToken();
  return axios
    .post(
      '/posts',
      { title, content },
      {
        headers: {
          token
        }
      }
    )
    .then(
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

export function updatePost({ id, title, content }) {
  const token = User.getToken();
  return axios
    .put(
      `/posts/${id}`,
      { title, content },
      {
        headers: {
          token
        }
      }
    )
    .then(
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

export function deletePost({ id }) {
  const token = User.getToken();
  return axios({
    url: `/posts/${id}`,
    method: 'delete',
    headers: {
      token
    }
  });
}

export function login({ password }) {
  return axios.post('/user/login', { password }).then(
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
