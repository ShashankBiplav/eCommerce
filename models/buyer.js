import Sequelize from "sequelize";

import sequelize from "../utilities/database.js";

const Buyer = sequelize.define("buyer", {
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
    allowNull: false,
  },
  isVerified: {
    type: Sequelize.BOOLEAN,
    defaultValue: false,
  },
  isAuthorized: {
    type: Sequelize.BOOLEAN,
    defaultValue: false,
  },
});

export default Buyer;
