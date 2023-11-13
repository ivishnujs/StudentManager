const express = require("express")
const morgan = require("morgan")
const path = require("path")
const bodyParser = require("body-parser")
const { Clerk } = require("@clerk/clerk-sdk-node")
const { connectDB } = require("./config/database")
const app = express()
require("dotenv").config()

// assign routes
const apiRoutes = require("./routes/apiRoutes")
const privateRoutes = require("./routes/privateRoutes")
const publicRoutes = require("./routes/publicRoutes")

//middlewares
app.use(morgan("tiny"))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.json())

//connect database
connectDB()
// clerk instance
const clerk = Clerk({ secretKey: process.env.CLERK_SECRET_KEY })

// view engine setup
app.set("views", path.join(__dirname, "views"))
app.set("view engine", "ejs")

// static files
app.use(express.static("public"))
app.use("/css", express.static(path.resolve(__dirname, "public/styles")))
app.use("/img", express.static(path.resolve(__dirname, "public/images")))
app.use("/js", express.static(path.resolve(__dirname, "public/scripts")))

//load routes
app.use("/", apiRoutes)
app.use("/", privateRoutes)
app.use("/", publicRoutes)

//error handle
app.use((err, req, res, next) => {
  console.error(err.stack)
  next()
})

//start server
app.listen(process.env.PORT, () => {
  console.log(`Listening on port ${process.env.PORT}`)
})
