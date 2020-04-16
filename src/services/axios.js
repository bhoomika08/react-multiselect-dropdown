import axios from 'axios';
import APP_CONSTANTS from '../constants/app-constants';

const instance = axios.create({
  baseURL: APP_CONSTANTS.axiosBaseUrl,
});

instance.defaults.headers.common['Authorization'] = 'AUTH TOKEN FROM INSTANCE';

export default instance;