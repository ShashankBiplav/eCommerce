import Sequelize from "sequelize";

import sequelize from "../utilities/database.js";

//reference models
import User from "./user.js";
import Administrator from "./administrator.js";

const Product = sequelize.define("product", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  userId: {
    type: Sequelize.INTEGER,
    allowNull: true,
    references: {
      model: User,
      key: 'id'
    }
  },
  adminId: {
    type: Sequelize.INTEGER,
    allowNull: true,
    references: {
      model: Administrator,
      key: 'id'
    }
  },
  title: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  price: {
    type: Sequelize.DOUBLE,
    allowNull: false
  },
  costPrice: {
    type: Sequelize.DOUBLE,
    allowNull: false
  },
  discount: {
    type: Sequelize.DOUBLE,
    allowNull: false
  },
  description: {
    type: Sequelize.STRING,
    allowNull: false
  },
  imageUrl: {
    type: Sequelize.STRING,
    allowNull: false
  },
  rating: {
    type: Sequelize.DOUBLE,
    defaultValue: 0.0
  },
  stock: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  isActive: {
    type: Sequelize.BOOLEAN,
    defaultValue: false
  },
  isTrending: {
    type: Sequelize.BOOLEAN,
    defaultValue: false
  },
  isDealOfTheDay: {
    type: Sequelize.BOOLEAN,
    defaultValue: false
  },
  isAdminProduct:{
    type: Sequelize.BOOLEAN,
    defaultValue: false
  }
});

export default Product;
