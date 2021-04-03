import Sequelize from "sequelize";

import sequelize from "../utilities/database.js";
import Category from "./category.js";
import Product from "./product.js";

const CategoryProducts = sequelize.define("category_product", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  categoryId: {
    type: Sequelize.INTEGER,
    allowNull: false,
    references: {
      model: Category,
      key: 'id'
    },
  },
  productId: {
    type: Sequelize.INTEGER,
    allowNull: false,
    references: {
      model: Product,
      key: 'id'
    },
  },
});

export default CategoryProducts;
