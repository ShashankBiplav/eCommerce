//packages
import bcrypt from 'bcryptjs';

//models
import Administrator from "../models/administrator.js";

import User from "../models/user.js";

import Product from "../models/product.js";

//helpers
import {validationErrorHandler} from "../helpers/validation-error-handler.js";

import {clearImage} from "../helpers/clear-image.js";

//DB relations
Administrator.hasMany(Product);

//CONTROLLERS

//update featured image of an existing admin product
export const updateFeaturedImageOfProduct = async (req, res, next) => {
  try {
    if (!req.file) {
      const error = new Error('No image provided');
      error.statusCode = 422;
      return next(error);
    }
    const imageUrl = req.file.path;
    const product = await Product.findByPk(req.params.productId);
    if (!product) {
      clearImage(imageUrl);
      const error = new Error('No such product found');
      error.statusCode = 404;
      return next(error);
    }
    if (imageUrl !== product["dataValues"]["imageUrl"]) { //new image was uploaded
      clearImage(product["dataValues"]["imageUrl"]);
    }
    const result = await Product.update({
      imageUrl
    }, {
      where: {
        id: req.params.productId,
        adminId: req.userId,
      }
    });
    res.status(201).json({
      message: "Product featured image updated"
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

//toggle authorization, buyer and seller status of user
export const toggleUserStatus = async (req, res, next) => {
  validationErrorHandler(req, next);
  const {isBuyer, isSeller, isAuthorized} = req.body;
  try {
    await Product.update({
        isActive: isAuthorized
      },
      {
        where: {
          userId: req.params.userId
        }
      });
    const result = await User.update({
      isBuyer,
      isSeller,
      isAuthorized
    }, {
      where: {
        id: req.params.userId
      }
    });
    if (result[0] === 0) {
      const error = new Error('User not found');
      error.statusCode = 404;
      return next(error);
    }
    res.status(201).json({
      message: 'User updated successfully'
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

//toggle product parameters
export const editProductParameters = async (req, res, next) => {
  validationErrorHandler(req, next);
  const {isActive, isTrending, isDealOfTheDay} = req.body;
  try {
    const result = await Product.update({
      isActive,
      isTrending,
      isDealOfTheDay
    }, {
      where: {
        id: req.params.productId
      }
    });
    if (result[0] === 0) {
      const error = new Error('Product not found');
      error.statusCode = 404;
      return next(error);
    }
    res.status(201).json({
      message: 'Product updated successfully'
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};
