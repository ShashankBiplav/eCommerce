//models
import Product from "../../models/product.js";
import Category from "../../models/category.js";

//helpers
import {validationErrorHandler} from "../../helpers/validation-error-handler.js";

export const createNewCategory = async (req, res, next) => {
  validationErrorHandler(req, next);
  const {name, description} = req.body;
  try {
    if (!req.file) {
      const error = new Error('No image provided');
      error.statusCode = 422;
      return next(error);
    }
    const preExistingCategory = await Category.findOne({
      where: {
        name,
        description
      }
    });
    if (preExistingCategory){
      const error = new Error('Category Already Exists');
      error.statusCode = 403;
      return next(error);
    }
    const imageUrl = req.file.path;
    const response = await Category.create({
      name,
      imageUrl,
      description,
    });
    res.status(201).json({
      message: "Category created successfully",
      response
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};
