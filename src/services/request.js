import axios from 'axios';
import RootStore from '@/stores';
import {Platform} from 'react-native';
//
export const baseUrl = 'http:///172.20.10.9:8803/yue';
const token = RootStore.token;

const instance = axios.create({
  baseURL: baseUrl,
  headers: {
    'content-type': 'application/json',
  },
});
// 添加请求拦截器
instance.interceptors.request.use(
  function (config) {
    console.log('请求参数：', config);
    return config;
  },
  error => {
    return Promise.reject(error);
  },
);

// 添加响应拦截器
instance.interceptors.response.use(
  function (response) {
    console.log('返回结果：', response);
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
