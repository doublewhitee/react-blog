'use strict';

import mongoose from 'mongoose';

const Schema = mongoose.Schema

const articleSchema = new Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  cover: { type: String, default: '' },
  tags: [{ type: Schema.Types.ObjectId, ref: 'Tag' }],
  category: { type: Schema.Types.ObjectId, ref: 'Category', required: true },
  lock: { type: Boolean, default: false }, // 是否仅自己可见
  draft: { type: Boolean, default: false }, // 是否为草稿
  create_at: { type: Date, default: Date.now },
  update_at: { type: Date, default: Date.now },
})

const Article = mongoose.model('Article', articleSchema)

export default Article
