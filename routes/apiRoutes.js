const { Router } = require("express")
const apiController = require("../controllers/apiController.js")
const route = Router()

route.get("/api/v1/students", apiController.getStudent)
route.get("/api/v1/students/:sid", apiController.getStudent)

module.exports = route
