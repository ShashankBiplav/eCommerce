//models
import Product from "../../models/product.js";
import Administrator from "../../models/administrator.js";

//helpers
import {validationErrorHandler} from "../../helpers/validation-error-handler.js";

//DB relations
Administrator.hasMany(Product);

export const createNewAdminProduct = async (req, res, next) => {
  validationErrorHandler(req, next);
  const {title, price, costPrice, discount, description, stock} = req.body;
  try {
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
      stock
    });
    res.status(201).json({
      message: "Product created successfully",
      response
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};
