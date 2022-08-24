const Upvote = require('../models/upvoteModel')

const upvoteComment = async (req, res) => {
  try {
    // assuming req.body has user_id and comment_id
    const duplicate = await Upvote.findOne(req.body)
    if (duplicate) return res.status(409).json({status:"fail", msg:"this user has already upvoted this comment"})
    const upvote = new Upvote(req.body)
    await upvote.save()
    res.status(201).json({status:"success", msg: "Successfully upvoted comment"})
  } catch (e) {
    console.log("Error from route: "+e)
    res.status(500).json({
        status: "fail",
        msg:"Internal Server Error"
    })
  }
}

const getUpvotesForComment = async (req, res) => {
  try {
    const count = await Upvote.count({comment_id: req.body.comment_id})
    console.log(count)
    res.status(200).json(count)
  } catch (e) {
    console.log("Error from route: "+e)
    res.status(500).json({
        status: "fail",
        msg:"Internal Server Error"
    })
  }
}

const deleteUpvote = async (req, res) => {
  try {
    const upvote = await Upvote.findOneAndDelete(req.body)
    if (!upvote) return res.status(404).json({status: "fail", msg: "Comment not found"})
    res.status(200).json({status: "success", msg: "Removed upvote successfully"})
  } catch (e) {
    console.log("Error from route: "+e)
    res.status(500).json({
        status: "fail",
        msg:"Internal Server Error"
    })
  }
}

module.exports = { upvoteComment, getUpvotesForComment, deleteUpvote }
