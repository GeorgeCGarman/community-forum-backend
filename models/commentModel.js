const mongoose = require('mongoose')

const commentSchema = new mongoose.Schema({
  user_id: {type: String, required: true},
  question_id: {type: String, required: true},
  date_created: {type: Date, default: Date.now()},
  last_modified: {type: Date, default: Date.now()},
  comment: {type: String, required: true}
})

const Comment = mongoose.model("Comment", commentSchema)

module.exports = Comment