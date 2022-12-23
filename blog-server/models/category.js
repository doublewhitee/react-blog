'use strict';

import mongoose from 'mongoose';

const Schema = mongoose.Schema

const categorySchema = new Schema({
  name: { type: String, required: true },
  cover: { type: String, default: '' },
  lock: { type: Boolean, default: false }, // 是否仅自己可见
  create_at: { type: Date, default: Date.now },
  update_at: { type: Date, default: Date.now },
})

const Category = mongoose.model('Category', categorySchema)

export default Category
