const adminOnly = (req, res, next) => {
  if (req.user.role !== "admin") {
    return res.status().json({
      message: "Admin access required"
    })
  }

  next()
}

module.exports = adminOnly