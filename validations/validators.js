const { body, check, validationResult } = require("express-validator")

const validateNewStudent = [
  body("firstname").notEmpty().withMessage("First name can not be empty"),
  body("lastname").optional(),
  body("contact").notEmpty(),
  body("address").notEmpty().withMessage("Address cannot be empty"),
]

module.exports = { validateNewStudent }
