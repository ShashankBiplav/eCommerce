import Sequelize from "sequelize";

import sequelize from "../utilities/database.js";

const Customer = sequelize.define("customer", {
  id: {
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
  password: {
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
  profileImageUrl:{
    type: Sequelize.STRING,
    allowNull: true,
  },
  isVerified: {
    type: Sequelize.BOOLEAN,
    defaultValue: false,
  },
  isAuthorized: {
    type: Sequelize.BOOLEAN,
    defaultValue: false,
  },
  refreshToken: {
    type: Sequelize.STRING,
    allowNull: true
  },
});

export default Customer;
