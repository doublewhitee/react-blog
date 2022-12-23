'use strict';
import crypto from 'crypto';
import jwt from 'jsonwebtoken';
import config from 'config';

import UserModel from '../models/user.js';
import { setDecrypt } from '../utils/secret.js';

class user_controller {
  // 用户登录
  async userLogin(req, res, next) {
    try {
      let { username, password } = req.body
      const md5 = crypto.createHash('md5')
      const digest = md5.update(username + setDecrypt(password), 'utf8').digest('hex')
      
      const user = await UserModel.findOne({ username, password: digest })
      if (user) {
        // 生成jwt
        const payload = {
          _id: user._id,
          username
        }
        const token = jwt.sign(payload, config.jwt_key, { expiresIn: '1d' })
        res.send({ status: 1, message: '登陆成功', token })
      } else {
        res.send({ status: 0, message: '用户名或密码不正确' })
      }
    } catch (e) {
      res.send({ status: 0, message: '登陆失败' })
    }
  }
}

export default new user_controller()