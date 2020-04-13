import axios from './axios';

const instance = axios.create({
  baseURL: 'https://api.github.com/users/bhoomika08'
});

instance.defaults.headers.common['Authorization'] = 'AUTH TOKEN FROM INSTANCE';

export default instance;