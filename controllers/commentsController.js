const Comment = require('../models/commentModel')

const createComment = (req, res) => {
  try {
    const newComment = new Comment(req.body)
    await newComment.save()
  } catch (e) {
    console.log("Error from route: "+e)
    res.status(500).json({
        status: "fail",
        msg:"Internal Server Error"
    })
  }
}