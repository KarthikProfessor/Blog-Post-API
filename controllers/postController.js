const Post = require("../models/Post")

const createPost = async(req, res, next) => {
  try {

    const { title, content, category } = req.body

    if (!title || !content || !category) {
      return res.status(400).json({
        message: "Title, content and category are required"
      })
    }

    const post = await Post.create({
      title,
      content,
      category,
      author: req.user.userId
    })

    res.status(201).json({
      message: "Post created successfully",
      post
    })

  } catch (error) {

    next(error)

  }
}

const getAllPosts = async(req, res, next) => {
  try {

    const {
      search,
      category,
      sort = "newest",
      page = 1,
      limit = 10
    } = req.query

    const pageNumber = Number(page)
    const limitNumber = Number(limit)

    if (!Number.isInteger(pageNumber) || pageNumber < 1) {
      return res.status(400).json({
        message: "Page must be a positive number"
      })
    }

    if (!Number.isInteger(limitNumber) || limitNumber < 1) {
      return res.status(400).json({
        message: "Limit must be a positive number"
      })
    }

    const filter = {}
    if (search) {
      filter.$or = [
        {
          title: {
            $regex: search,
            $options: "i"
          }
        },
        {
          content: {
            $regex: search,
            $options: "i"
          }
        }
      ]
    }

    // category filter
    if (category) {
      filter.category = category
    }

    // sorting
    let sortOption = {}

    if (sort === "oldest") {
      sortOption.createdAt = 1
    } else {
      sortOption.createdAt = -1
    }

    // pagination
    const skip = (pageNumber - 1) * limitNumber

    // .find() --> gives you all documents from posts collection
    const posts = await Post.find(filter).populate('author', 'name email').sort(sortOption).skip(skip).limit(limitNumber)

    const totalPosts = await Post.countDocuments(filter)

    res.status(200).json({
      page: pageNumber,
      limit: limitNumber,
      totalPosts,
      totalPages: Math.ceil(totalPosts / limitNumber),
      posts
    })

  } catch (error) {

    next(error)

  }
}

const getSinglePost = async(req, res, next) => {
  try {

    const { id } = req.params

    const post = await Post.findById(id).populate("author", "name email")

    if (!post) {
      return res.status(404).json({
        message: "Post not found"
      })
    }

    res.status(200).json({
      post,
      likesCount: post.likes.length
    })

  } catch (error) {

    next(error)

  }
}

const updatePost = async(req, res, next) => {
  try {

    const { id } = req.params

    const { title, content, category } = req.body

    const post = await Post.findById(id)

    if (!post) {
      return res.status(404).json({
        message: "Post not found"
      })
    }

    if (post.author.toString() !== req.user.userId) {
      return res.status(403).json({
        message: "You are not allowed to update this post"
      })
    }

    if (title) {
      post.title = title
    }

    if (content) {
      post.content = content
    }

    if (category) {
      post.category = category
    }

    await post.save()

    res.status(200).json({
      message: "Post updated successfully",
      post
    })

  } catch (error) {

    next(error)

  }
}

const deletePost = async(req, res, next) => {
  try {

    const { id } = req.params

    const post = await Post.findById(id)

    if (!post) {
      return res.status(404).json({
        message: "Post not found"
      })
    }

    if (req.user.role !== "admin" && post.author.toString() !== req.user.userId) {
      return res.status(403).json({
        message: "You are not allowed to delete this post"
      })
    }

    await Post.findByIdAndDelete(id)

    res.status(200).json({
      message: "Post deleted successfully"
    })

  } catch (error) {

    next(error)

  }
}

const likePost = async(req, res, next) => {
  try {

    const { id } = req.params
    const userId = req.user.userId

    const post = await Post.findById(id)
    if(!post) {
      return res.status(404).json({
        message: "Post not found"
      })
    }

    const alreadyLiked = post.likes.some( user => user.toString() === userId )

    if (alreadyLiked) {

      await Post.findByIdAndUpdate(
        id,
        {
          $pull: {
            likes: userId
          }
        }
      )

      return res.status(200).json({
        message: "Post unliked successfully"
      })
    }

    await Post.findByIdAndUpdate(
      id,
      {
        $addToSet: {
          likes: userId
        }
      }
    )

    res.status(200).json({
      message: "Post liked successfully"
    })

  } catch (error) {

    next(error)

  }
}

module.exports = {
  createPost,
  getAllPosts,
  getSinglePost,
  updatePost,
  deletePost,
  likePost
}