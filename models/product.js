import Sequelize from "sequelize";

import sequelize from "../utilities/database.js";

//reference models
import User from "../models/user.js";

const Product = sequelize.define("product", {
  id:{
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  userId:{
    type: Sequelize.INTEGER,
    allowNull: false,
    references: {
      model: User,
      key: 'id'
    }
  },
  title: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  price:{
    type: Sequelize.DOUBLE,
    allowNull: false
  },
  description:{
    type: Sequelize.STRING,
    allowNull: false
  },
  stock:{
    type:Sequelize.INTEGER,
    allowNull:false
  },
});

export default Product;
