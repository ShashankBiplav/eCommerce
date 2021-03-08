import Sequelize from "sequelize";

import sequelize from "../utilities/database.js";

//reference models
import Administrator from "./administrator.js";

const AdminProduct = sequelize.define("admin_product", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  userId: {
    type: Sequelize.INTEGER,
    allowNull: false,
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
    defaultValue: 5.0
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
  }
});

export default AdminProduct;
