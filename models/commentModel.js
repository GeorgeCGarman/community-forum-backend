const mongoose = require("mongoose")

const commentSchema = new mongoose.Schema({
  user_id: { type: String, required: true },
  question_id: { type: String, required: true },
  date_created: { type: Date, default: Date.now() },
  comment: { type: String, required: true },
  upvotes: { type: Number },
})

const Comment = mongoose.model("Comment", commentSchema)

module.exports = Comment
