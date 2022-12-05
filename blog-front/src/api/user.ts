import { instance } from './request';

export function reqLogin (username: string, password: string) {
  return instance({
    url: '/user/login',
    method: 'post',
    data: { username, password }
  })
}