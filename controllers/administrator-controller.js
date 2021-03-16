//packages
import bcrypt from 'bcryptjs';

//models
import Administrator from "../models/administrator.js";

import User from "../models/user.js";

import Product from "../models/product.js";

//helpers
import {validationErrorHandler} from "../helpers/validation-error-handler.js";

//DB relations
Administrator.hasMany(Product);

//CONTROLLERS

//change administrator details
export const changeAdministratorDetails = async (req, res, next) => {
  validationErrorHandler(req, next);
  const {name, email, password} = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 12);
    await Administrator.update({
      name,
      email,
      password: hashedPassword
    }, {where: {id: req.userId}});
    res.status(201).json({
      msg: "Administrator profile details updated!"
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

//create new product
export const createNewAdminProduct = async (req, res, next) => {
  validationErrorHandler(req, next);
  const {title, price, costPrice, discount, description, stock} =req.body;
  try{
  if (!req.file) {
    const error = new Error('No image provided');
    error.statusCode = 422;
    return next(error);
  }
  const imageUrl = req.file.path;
    const response = await Product.create({
      adminId: req.userId,
      title,
      price,
      imageUrl,
      costPrice,
      discount,
      description,
      stock,
      isAdminProduct: true
    });
    res.status(201).json({
      message: "Product created successfully",
      response
    });
  }catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

//edit an existing admin product
export const editAdminProduct = async (req, res, next) => {
  validationErrorHandler(req, next);
  const {title, price, costPrice, discount, description, stock} =req.body;
};

//toggle authorization, buyer and seller status of user
export const toggleUserStatus = async (req, res, next) => {};
