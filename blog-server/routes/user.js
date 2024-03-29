'use strict';

import express from 'express';
import user_controller from '../controller/user.js';

const router = express.Router()

// 用户登录
router.post('/login', user_controller.userLogin)

export default router
