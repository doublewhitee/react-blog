'use strict';

import express from 'express';
import collect_controller from '../controller/collect.js';

const router = express.Router()

// 文章列表
router.get('/article', collect_controller.getArticleList)

export default router
