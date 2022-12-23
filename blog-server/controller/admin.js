'use strict';

import TagModel from '../models/tag.js';
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
}

export default new admin_controller()