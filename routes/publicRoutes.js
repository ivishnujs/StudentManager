const { Router } = require("express")
const publicController = require("../controllers/publicController")

const route = Router()

route.get("/", publicController.getHome)
route.get("/about", publicController.getAbout)
route.get("/*", publicController.showError)

module.exports = route
