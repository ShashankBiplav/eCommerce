import Sequelize from "sequelize";

import sequelize from "../utilities/database.js";

const Administrator = sequelize.define("administrator", {
  id:{
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  email: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  password:{
    type: Sequelize.STRING,
    allowNull: true,
  },
  phone: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  otp: {
    type: Sequelize.INTEGER,
    allowNull: true,
  },
  refreshToken: {
    type: Sequelize.STRING,
    allowNull: true
  }
});

export default Administrator;