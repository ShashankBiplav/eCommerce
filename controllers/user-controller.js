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

//change administrator details
export const changeUserDetails = async (req, res, next) => {
  validationErrorHandler(req, next);
  const {name, email, password} = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 12);
    await User.update({
      name,
      email,
      password: hashedPassword
    }, {where: {id: req.userId}});
    res.status(201).json({
      msg: "User profile details updated!"
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

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
      stock,
      isAdminProduct: false
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

