const errorMiddleware = (err, req, res, next) => {
  console.error(err)

  // invalid mongodb objectId
  if (err.name === "CastError") {
    return res.status(400).json({
      message: "Invalid Id"
    })
  }

  // Mongoose validation error
  if (err.name === "ValidationError") {
    const errors = Object.values(err.errors).map(
      error => error.message
    )

    return res.status(400).json({
      message: "Validation failed",
      errors
    })
  }

  // Duplicate Mongodb value
  if (err.code === 11000) {
    return res.status(409).json({
      message: "Duplicate value already exists"
    })
  }

  res.status(500).json({
    message: "Internal server error"
  })
}

module.exports = errorMiddleware