const express = require('express')
const { upvoteComment, getUpvotesForComment, deleteUpvote } = require("../controllers/UpvotesController");
const router = express.Router();

router.post("/", upvoteComment)
router.get("/", getUpvotesForComment)
// router.put("/", updateUpvote)
router.delete("/", deleteUpvote)

module.exports = router;