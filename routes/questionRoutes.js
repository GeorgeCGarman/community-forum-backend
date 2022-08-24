const express = require('express')
const { createQuestion, getQuestion, updateQuestion, deleteQuestion } = require("../controllers/questionController");
const router = express.Router();

router.post("/", createQuestion)
router.get("/", getQuestion)
router.put("/", updateQuestion)
router.delete("/", deleteQuestion)

module.exports = router;