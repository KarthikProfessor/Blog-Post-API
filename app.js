const express = require('express')

const authRoutes = require("./routes/authRoutes")
const postRoutes = require("./routes/postRoutes")
const commentRoutes = require("./routes/commentRoutes")

const errorMiddleware = require("./middleware/errorMiddleware")

const app = express()

app.use(express.json())

app.get("/", (req, res) => {
  res.json({
    message: "Blog API is running"
  })
})

app.use("/api/auth", authRoutes)
app.use("/api/posts", postRoutes)
app.use("/api/comments", commentRoutes)

app.use(errorMiddleware)

module.exports = app