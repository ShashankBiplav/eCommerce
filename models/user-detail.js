import Sequelize from "sequelize";

import sequelize from "../utilities/database.js";
import User from "./user.js";

const UserDetail = sequelize.define("user_detail", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  userId: {
    type: Sequelize.INTEGER,
    references:{
      model: User,
      key: 'id'
    },
  },
  businessName: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  gstFile: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  businessType: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  address: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  pincode:{
    type: Sequelize.STRING,
    allowNull: false,
  },
  state: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  city: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  country: {
    type: Sequelize.STRING,
    allowNull: false,
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

export default UserDetail;
