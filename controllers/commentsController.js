const Comment = require('../models/commentModel')

const createComment = async (req, res) => {
  try {
    const comment = new Comment(req.body)
    await comment.save()
    res.status(201).json({status:"success", msg: "Successfully created new comment"})
  } catch (e) {
    console.log("Error from route: "+e)
    res.status(500).json({
        status: "fail",
        msg:"Internal Server Error"
    })
  }
}

const getComments = async (req, res) => {
  try {
    const question_id = req.query.question_id
    const comments = await Comment.find({question_id: question_id})
    return res.status(200).json(comments)
  } catch (e) {
    console.log("Error from route: "+e)
    res.status(500).json({
        status: "fail",
        msg:"Internal Server Error"
    })
  }
}

const updateComment = async (req, res) => {
  try {
    const comment_id = req.body.comment_id
    const comment = await Comment.findByIdAndUpdate(
      {_id: comment_id}, 
      {
        comment: req.body.comment,
        last_modified: Date.now()
      })
    if (!comment) return res.status(404).json({status: "fail", msg: "Comment not found"})
    res.status(200).json({status: "success", msg: "Updated comment successfully"})
  } catch (e) {
    console.log("Error from route: "+e)
    res.status(500).json({
        status: "fail",
        msg:"Internal Server Error"
    })
  }
}

const deleteComment = async(req, res) => {
  try{
    const comment = await Comment.findByIdAndDelete({_id: req.body.comment_id})
    if (!comment) return res.status(404).json({status: "fail", msg: "Comment not found"})
    res.status(200).json({status: "success", msg: "Deleted comment successfully"})
  } catch (e) {
    console.log("Error from route: "+e)
    res.status(500).json({
        status: "fail",
        msg:"Internal Server Error"
    })
  }
}

module.exports = { createComment, getComments, updateComment, deleteComment }