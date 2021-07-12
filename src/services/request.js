import Toast from '@/components/Toast';
import RootStore from '@/stores';
import axios from 'axios';
const token = RootStore.token;

const instance = axios.create({
  headers: {
    'content-type': 'application/json',
  },
});
// 添加请求拦截器
instance.interceptors.request.use(
  function (config) {
    Toast.showLoading('请求中');
    return config;
  },
  error => {
    return Promise.reject(error);
  },
);

// 添加响应拦截器
instance.interceptors.response.use(
  function (response) {
    Toast.hideLoading();
    return response;
  },
  error => {
    console.log('返回错误：', error);
    const response = error.response;
    return Promise.reject(error);
  },
);
export default {
  get: instance.get,
  post: instance.post,
  privateGet: (url, data = {}, options = {}) => {
    const token = RootStore.token;
    const headers = options.headers || {};
    return instance.get(url, {
      ...options,
      params: data,
      headers: {
        token: `Bearer ${token}`,
        ...headers,
      },
    });
  },
  // post 自动带上token
  privatePost: (url, data = {}, options = {}) => {
    const token = RootStore.token;
    const headers = options.headers || {};
    return instance
      .post(url, data, {
        ...options,
        headers: {
          token: `Bearer ${token}`,
          ...headers,
        },
      })
      .then(function (response) {
        console.log('123');
      })
      .catch(function (err) {
        console.log(err);
      });
  },
};
