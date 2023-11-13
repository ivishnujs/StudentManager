const Students = require("../model/student")
require("dotenv").config()

const URL = process.env.BASE_URL

exports.getHome = (req, res) => {
  return res.render("home")
}
exports.getAbout = (req, res) => {
  return res.render("about")
}
exports.showError = (req, res) => {
  return res.render("error")
}
