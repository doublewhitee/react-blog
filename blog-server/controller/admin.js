'use strict';

import TagModel from '../models/tag.js';
import CategoryModel from '../models/category.js';
import ArticleModel from '../models/article.js';

class admin_controller {
  async getArticleList(req, res, next) {
    try {
      if (!req.headers.authorization) {
        res.status(401).send('No authorization token was found')
        return
      }
      res.send({ status: 1, data: [{ id: 1, title: 'aaa' }] })
    } catch (e) {
      console.log(e)
    }
  }

  // 标签列表
  async getTagList(req, res, next) {
    try {
      if (!req.headers.authorization) {
        res.status(401).send('No authorization token was found')
        return
      }
      const { search } = req.query
      const tags = await TagModel.find(
        {
          name: { $regex: new RegExp(`^${search}`, 'g') }
        },
        { create_at: 0 }
      )
      res.send({ status: 1, data: tags })
    } catch (e) {
      res.send({ status: 0, message: '获取标签信息失败' })
    }
  }

  // 创建新标签
  async createTag(req, res, next) {
    try {
      if (!req.headers.authorization) {
        res.status(401).send('No authorization token was found')
        return
      }
      const { name } = req.body
      if (!name || name.trim() === '') {
        res.send({ status: 0, message: '标签名不能为空' })
        return
      }
      if (name.trim().length > 10) {
        res.send({ status: 0, message: '标签名长度不能超过10个字符' })
        return
      }
      const hasTag = await TagModel.findOne({ name })
      if (hasTag) {
        res.send({ status: 0, message: '标签名已存在' })
      } else {
        const newTag = await TagModel.create({ name })
        res.send({ status: 1, data: newTag, message: '创建标签成功' })
      }
    } catch (e) {
      res.send({ status: 0, message: '新增标签失败' })
    }
  }

  // 删除标签，且删除存在文章中的该标签
  async deleteTag(req, res, next) {
    try {
      if (!req.headers.authorization) {
        res.status(401).send('No authorization token was found')
        return
      }
      const { id } = req.body
      if (!id) {
        res.send({ status: 0, message: '标签id不能为空' })
        return
      }
      await ArticleModel.updateMany({ tags: id }, { $pull: { tags: id } })
      await TagModel.findByIdAndDelete({ _id: id })
      res.send({ status: 1, message: '删除标签成功' })
    } catch (e) {
      res.send({ status: 0, message: '删除标签失败' })
    }
  }

  // 分类列表
  async getCategoryList(req, res, next) {
    try {
      if (!req.headers.authorization) {
        res.status(401).send('No authorization token was found')
        return
      }
      const { page } = req.query
      const options = { sort: { update_at: -1 } }
      // 若不存在page字段，则请求全部数据
      if (page) {
        options.skip = (parseInt(page) * 10)
        options.limit = 10
      }
      const categories = await CategoryModel.find({}, { create_at: 0 }, options)
      res.send({ status: 1, data: categories })
    } catch (e) {
      res.send({ status: 0, message: '获取分类信息失败' })
    }
  }

  // 创建新分类
  async createCategory(req, res, next) {
    try {
      if (!req.headers.authorization) {
        res.status(401).send('No authorization token was found')
        return
      }
      const { name, cover, lock } = req.body
      if (!name || name.trim() === '') {
        res.send({ status: 0, message: '分类名不能为空' })
        return
      }
      if (name.trim().length > 20) {
        res.send({ status: 0, message: '分类名称长度不能超过20个字符' })
        return
      }
      const data = { name }
      if (cover) data.cover = cover
      if (lock) data.lock = lock
      const newTag = await CategoryModel.create(data)
      res.send({ status: 1, data: newTag, message: '创建分类成功' })
    } catch (e) {
      res.send({ status: 0, message: '新增标签失败' })
    }
  }
}

export default new admin_controller()