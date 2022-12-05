'use strict';

import mongoose from 'mongoose';
import crypto from 'crypto';

const Schema = mongoose.Schema

const userSchema = new Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
})

const User = mongoose.model('User', userSchema)

// 初始化用户
const md5 = crypto.createHash('md5')
const username = 'admin'
const password = '123456'
const digest = md5.update(username + password, 'utf8').digest('hex')

User.findOne({ username, password: digest }).then(user => {
  if (!user) {
    User.create({ username, password: digest }).then(()=> {
      console.log('初始化用户成功！')
    })
  }
})

export default User
