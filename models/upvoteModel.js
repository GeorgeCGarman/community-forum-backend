const mongoose = require('mongoose')

const upvoteSchema = new mongoose.Schema({
  user_id: {type: String, required: true},
  comment_id: {type: String, required: true}
})

const Upvote = mongoose.model("Upvote", upvoteSchema)

module.exports = Upvote
