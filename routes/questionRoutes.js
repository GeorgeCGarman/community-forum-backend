const express = require('express')
const ejs = require('ejs')
const { createQuestion, getQuestion, updateQuestion, deleteQuestion } = require("../controllers/questionController");
const router = express.Router();

router.post("/", createQuestion, (req, res) => {
  res.redirect("/questions")
})
router.get("/", getQuestion, (req, res) => {
  // Individual question
  if (req.questions.length === 1) {
    console.log(req.comments)
    res.render('pages/question', {question: req.questions[0], comments: req.comments})
  } else { // Multiple questions
    const sortedQuestions = req.questions.sort((qa, qb) => qa.upvotes > qb.upvotes ? 1 : -1).reverse()
    res.render('pages/questions', {
      heading: req.query.topic? req.query.topic : 'All Questions', 
      questions: sortedQuestions
    })
  }
})
router.put("/", updateQuestion)
router.delete("/", deleteQuestion)
router.get("/ask", (req, res) => {
  res.render('pages/ask')
})


module.exports = router;