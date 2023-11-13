const Students = require("../model/student")

exports.getStudent = async (req, res) => {
  const sid = req.params.sid
  let data
  try {
    if (sid) {
      data = await Students.findByPk(sid, {
        where: { isRemoved: false },
        attributes: [
          ["s_id", "studentId"],
          ["s_firstname", "firstname"],
          ["s_lastname", "lastname"],
          ["s_birthdate", "birthdate"],
          ["s_contactno", "contact"],
          ["s_address", "address"],
        ],
      })
    } else {
      data = await Students.findAll({
        where: { isRemoved: false },
        attributes: [
          ["s_id", "studentId"],
          ["s_firstname", "firstname"],
          ["s_lastname", "lastname"],
          ["s_birthdate", "birthdate"],
          ["s_contactno", "contact"],
          ["s_address", "address"],
        ],
      })
    }
    return res.status(200).json(data)
  } catch (error) {
    return res
      .status(400)
      .send({ message: "Data not available." + error.message })
  }
}
