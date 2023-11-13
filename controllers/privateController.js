const { validationResult } = require("express-validator")
const Students = require("../model/student")
require("dotenv").config()
const URL = process.env.BASE_URL

exports.getDashboard = async (req, res) => {
  if (!req.auth.userId) {
    return res.render("error")
  } else {
    try {
      const response = await fetch(`${URL}/api/v1/students`)
      const students = await response.json()
      res.render("dashboard", { students })
    } catch (error) {
      console.log(error.stack)
    }
  }
}

exports.getUpdateForm = async (req, res) => {
  if (!req.auth.userId) {
    return res.render("error404")
  } else {
    try {
      const response = await fetch(`${URL}/api/v1/students/${req.params.sid}`)
      const student = await response.json()
      res.render("update", { student, heading: "Update Student" })
    } catch (err) {
      console.log(err.message)
    }
  }
}

exports.getCreateForm = async (req, res) => {
  if (!req.auth.userId) {
    return res.render("error404")
  } else {
    return res.render("create", { heading: "New Student" })
  }
}

exports.postCreateForm = async (req, res) => {
  if (!req.auth.userId) {
    return res.render("error")
  } else {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors
          .array()
          .map(
            error => " " + error.path.toUpperCase() + "-->" + " " + error.msg
          ),
      })
    }
    const fname = req.body.firstname.trim()
    const lname = req.body.lastname.trim()
    const birthdate = req.body.birthdate
    const phone = req.body.contact.trim()
    const address = req.body.address.trim()
    try {
      Students.create({
        s_firstname: fname,
        s_lastname: lname,
        s_birthdate: birthdate,
        s_contactno: phone,
        s_address: address,
      }).then(response => {
        return res.redirect("/dashboard")
      })
    } catch (err) {
      return res.render("error")
    }
  }
}
exports.patchUpdateForm = async (req, res) => {
  const studentData = {}
  if (!req.auth.userId) {
    return res.render("error404")
  } else {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors
          .array()
          .map(
            error => " " + error.path.toUpperCase() + "-->" + " " + error.msg
          ),
      })
    }
    const sid = req.params.sid.trim()
    const fname = req.body.firstname.trim()
    const lname = req.body.lastname.trim()
    const birthdate = req.body.birthdate
    const phone = req.body.contact.trim()
    const address = req.body.address.trim()

    if (fname !== undefined && fname !== null && fname !== "") {
      studentData.s_firstname = fname
    }
    if (lname !== undefined && lname !== null && lname !== "") {
      studentData.s_lastname = lname
    }
    if (birthdate !== undefined && birthdate !== null && birthdate !== "") {
      studentData.s_birthdate = birthdate
    }
    if (phone !== undefined && phone !== null && phone !== "") {
      studentData.s_contactno = phone
    }
    if (address !== undefined && address !== null && address !== "") {
      studentData.s_address = address
    }
    try {
      Students.update(studentData, { where: { s_id: sid } }).then(response => {
        res.redirect("/dashboard")
      })
    } catch (err) {
      return res.render("error", err.message)
    }
  }
}
exports.deleteStudent = async (req, res) => {
  if (!req.auth.userId) {
    return res.render("error")
  } else {
    try {
      const sid = req.params.sid
      await Students.update({ isRemoved: true }, { where: { s_id: sid } })
      return res.redirect("/dashboard")
    } catch (err) {
      return res.render("error")
    }
  }
}
