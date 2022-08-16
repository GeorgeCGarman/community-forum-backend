const Question = require("../models/questionModel")
const Comment = require("../models/commentModel")

const createQuestion = async(req, res, next) => {
  try{
    const question = new Question({
      ...req.body
    })
    await question.save()
    // res.status(201).json({status:"success", msg: "Successfully created new question"})
    next()
  } catch (e) {
    console.log("Error from route: "+e)
    res.status(500).json({
        status: "fail",
        msg:"Internal Server Error"
    })
  }
}

const getQuestion = async(req, res, next) => {
  try {
    const {topic, question_id} = req.query
    var questions
    var comments = []
    if (question_id) {
      questions = await Question.find({_id: question_id})
      comments = await Comment.find({question_id: question_id})
    } else if (topic) {
      questions = await Question.find({topic: topic})
    } else {
      questions = await Question.find()
    }
    if (!questions) return res.status(404).json({status: "fail", msg: "Question not found"})
    // res.status(200).json(question)
    req.questions = questions
    req.comments = comments
    next()
  } catch (e) {
    console.log("Error from route: "+e)
    res.status(500).json({
        status: "fail",
        msg:"Internal Server Error"
    })
  }
}

const updateQuestion = async(req, res) => {
  try{
    const question = 
    await Question.findByIdAndUpdate(
      {_id: req.query.question_id}, 
      {
        title: req.body.title, 
        body: req.body.body,
        last_modified: Date.now(),
        upvotes: req.body.upvotes // change
      })
    if (!question) return res.status(404).json({status: "fail", msg: "Question not found"})
    res.status(200).json({status: "success", msg: "Updated question successfully"})

  } catch (e) {
    console.log("Error from route: "+e)
    res.status(500).json({
        status: "fail",
        msg:"Internal Server Error"
    })
  }
}

const deleteQuestion = async(req, res) => {
  try{
    const question = await Question.findByIdAndDelete({_id: req.query.question_id})
    if (!question) return res.status(404).json({status: "fail", msg: "Question not found"})
    res.status(200).json({status: "success", msg: "Deleted question successfully"})
  } catch (e) {
    console.log("Error from route: "+e)
    res.status(500).json({
        status: "fail",
        msg:"Internal Server Error"
    })
  }
}



module.exports = { createQuestion, getQuestion, updateQuestion, deleteQuestion }