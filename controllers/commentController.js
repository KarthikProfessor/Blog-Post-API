const Comment = require("../models/Comment")
const Post = require("../models/Post")

const createComment = async(req, res, next) => {
  try {

    const { postId } = req.params
    const { text } = req.body

    if (!text) {
      return res.status(400).json({
        message: "Comment text is required"
      })
    }

    const post = await Post.findById(postId)

    if (!post) {
      return res.status(404).json({
        message: "Post not found"
      })
    }

    const comment = await Comment.create({
      text,
      author: req.user.userId,
      post: postId
    })

    const populatedComment = await comment.populate("author", "name email")

    res.status(201).json({
      message: "Comment added successfully",
      comment: populatedComment
    })

  } catch (error) {

    next(error)

  }
}

const getPostComments = async(req, res, next) => {
  try {

    const { postId } = req.params

    const post = await Post.findById(postId)

    if (!post) {
      return res.status(404).json({
        message: "Post not found"
      })
    }

    const comments = await Comment.find({ post: postId }).populate("author", "name email").sort({ createdAt: -1 })

    res.status(201).json({
      count: comments.length,
      comments
    })


  } catch (error) {

    next(error)

  }
}

const deleteComment = async(req, res, next) => {
  try {

    const { id } = req.params

    // Authorization Check and delete
    const comment = await Comment.findOneAndDelete({
      _id: id,
      author: req.user.userId
    })

    if (!comment) {
      return res.status(404).json({
        message: "Comment not found or you're not the owner"
      })
    }

    res.status(200).json({
      message: "Comment deleted successfully"
    })

  } catch (error) {

    next(error)

  }
}

module.exports = {
  createComment,
  getPostComments,
  deleteComment
}