const { sequelize } = require("../config/database")
const { DataTypes } = require("sequelize")

const Students = sequelize.define(
  "students_info",
  {
    s_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      start: 125200,
    },
    s_firstname: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    s_lastname: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    s_birthdate: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    s_contactno: {
      type: DataTypes.STRING(10),
      allowNull: false,
    },
    s_address: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    isRemoved: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },
  { freezeTableName: true, timestamps: false }
)

// Students.sync({ force: true }).then(() => {
//   console.log(`Table created!`)
// })

module.exports = Students
