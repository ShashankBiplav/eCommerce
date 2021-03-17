//packages
import bcrypt from 'bcryptjs';

//models
import User from "../models/user.js";

import Product from "../models/product.js";

//helpers
import {validationErrorHandler} from "../helpers/validation-error-handler.js";

//DB relations
User.hasMany(Product);

//CONTROLLERS


//create new product
export const createNewUserProduct = async (req, res, next) => {
  validationErrorHandler(req, next);
  const {title, price, costPrice, discount, description, stock} =req.body;
  try{
    const response = await Product.create({
      userId: req.userId,
      title,
      price,
      costPrice,
      discount,
      description,
      stock
    });
    console.log(response);
  }catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

//edit an existing user product
export const editUserProduct = async (req, res, next) => {};

