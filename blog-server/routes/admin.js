'use strict';

import express from 'express';
import admin_controller from '../controller/admin.js';

const router = express.Router()

// 文章列表
router.get('/article-list', admin_controller.getArticleList)
// 创建或更新文章
router.post('/article-upsert', admin_controller.createOrUpdateArticle)

// 标签列表
router.get('/tag-list', admin_controller.getTagList)
// 创建新标签
router.post('/tag-create', admin_controller.createTag)
// to test
// 删除标签，且删除存在文章中的该标签
router.post('/tag-delete', admin_controller.deleteTag)

// 分类列表
router.get('/category-list', admin_controller.getCategoryList)
// 创建新分类
router.post('/category-create', admin_controller.createCategory)

export default router
