import axios from 'axios';
import { message } from 'antd';
import Cookies from 'js-cookie';

import store from '../redux/store';
import { setLoginStatus } from '../redux/reducers/userSlice';

export const instance = axios.create({
  baseURL: 'http://localhost:3333/',
  timeout: 10000,
})

// 请求头中添加token
instance.interceptors.request.use(req => {
  if (req.url !== '/user/login') {
    const token = Cookies.get('token')
    if (token) {
      req.headers!.Authorization = 'Bearer ' + token
    }
  }
  return req
})

// 处理返回结果
instance.interceptors.response.use(res => {
  if (res.status !== 200) {
    message.error(res.statusText)
  } else {
    if (res.data.status === 0) {
      message.error(res.data.message)
    }
  }
  return res
}, err => {
  message.error(err.response.data)
  // token 无效，退出登录
  if (err.response.status === 401) {
    store.dispatch(setLoginStatus(false))
    Cookies.remove('token')
  }
})