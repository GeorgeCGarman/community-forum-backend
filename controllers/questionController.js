const Question = require("../models/questionModel")

const createQuestion = async(req, res) => {
  try{
    const question = new Question(req.body)
    await question.save()
    res.status(201).json({status:"success", msg: "Successfully created new question"})
  } catch (e) {
    console.log("Error from route: "+e)
    res.status(500).json({
        status: "fail",
        msg:"Internal Server Error"
    })
  }
}

const getQuestion = async(req, res) => {
  try {
    const {topic, question_id} = req.query // use req.query?
    var questions
    if (question_id) { // Correct way?
      questions = await Question.find({_id: question_id})
      await Question.find({_id: question_id})
    } else if (topic) {
      questions = await Question.find({topic: topic})
    } else {
      questions = await Question.find()
    }
    questions.forEach(async question => {
      const newQuestion = question
      if (newQuestion.views) newQuestion.views = parseInt(newQuestion.views) + 1
      else newQuestion.views = 1
      await newQuestion.save()
    })
    if (!questions) return res.status(404).json({status: "fail", msg: "Question not found"})
    res.status(200).json(questions)
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
        last_modified: Date.now()
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