require("dotenv").config()
const app = require("./app")
const connectDB = require("./config/db")

const PORT = process.env.PORT

app.listen(PORT, () => {
  console.log(`server running on http://localhost:${PORT}`)
})

connectDB();