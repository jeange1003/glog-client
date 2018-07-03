import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:3000';

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

export function fetchPost(filePath) {
  return axios.get(`posts/${encodeURIComponent(filePath)}`).then(
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
