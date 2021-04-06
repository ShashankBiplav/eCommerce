import Sequelize from "sequelize";

import sequelize from "../utilities/database.js";
import User from "./user";

const Cart = sequelize.define("cart", {
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
      model: User,
      key: 'id'
    }
  },
  amount: {
    type: Sequelize.DOUBLE,
    allowNull: true,
    defaultValue: 0.0
  },
});

export default Cart;
