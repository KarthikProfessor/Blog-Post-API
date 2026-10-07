const express = require("express")

const router = express.Router()

const { 
  createPost, 
  getAllPosts,
  getSinglePost,
  updatePost,
  deletePost,
  likePost
} = require("../controllers/postController")

const { 
  createComment,
  getPostComments
 } = require("../controllers/commentController") 

const protect = require("../middleware/authMiddleware")

const adminOnly = require("../middleware/adminMiddleware")

// post routes
router.post("/", protect, createPost)
router.get("/", getAllPosts)
router.get("/:id", getSinglePost)
router.put("/:id", protect, updatePost)
router.delete("/:id", protect, deletePost)
router.post("/:id/like", protect, likePost)

// comment routes
router.post("/:postId/comments", protect, createComment)
router.get("/:postId/comments", getPostComments)

module.exports = router