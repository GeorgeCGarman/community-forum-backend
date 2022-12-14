const mongoose = require('mongoose')

const questionSchema = new mongoose.Schema({
  user_id: {type: String, required: true},
  date_created: {type: Date, default: Date.now()},
  topic: {type: String, required: true},
  title: {type: String, required: true},
  last_modified: {type: Date, default: Date.now()},
  body: {type: String},
  views: {type: Number}
})

const Question = mongoose.model("Question", questionSchema)

module.exports = Question
