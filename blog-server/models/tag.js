'use strict';

import mongoose from 'mongoose';

const Schema = mongoose.Schema

const tagSchema = new Schema({
  name: { type: String, required: true },
  create_at: { type: Date, default: Date.now },
})

const Tag = mongoose.model('Tag', tagSchema)

export default Tag
