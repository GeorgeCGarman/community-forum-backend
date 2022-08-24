const express = require('express')
const { createComment, getComments, updateComment, deleteComment } = require("../controllers/commentsController");
const router = express.Router();

router.post("/", createComment)
router.get("/", getComments)
router.put("/", updateComment)
router.delete("/", deleteComment)


module.exports = router;