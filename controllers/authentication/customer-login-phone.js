//packages
import jwt from "jsonwebtoken";

//models
import Customer from "../../models/customer.js";

//helpers
import {validationErrorHandler} from "../../helpers/validation-error-handler.js";

export const customerLoginPhone = async (req, res, next) => {
  validationErrorHandler(req, next);
  const {phone, otp} = req.body;
  try {
    const customer = await Customer.findOne({where: {phone, otp}});
    if (!customer) {
      const error = new Error('Customer not found');
      error.statusCode = 404;
      return next(error);
    }
    const id = customer["dataValues"]["id"];
    const name = customer["dataValues"]["name"];
    const token = jwt.sign({id, phone}, 'your_secret_key', {expiresIn: '1 day'});
    const refreshToken = jwt.sign({id, phone, name}, 'refresh_token_key', {expiresIn: '2 days'});
    await Customer.update({isVerified: true, refreshToken: refreshToken, otp: null}, {where: {phone}});
    res.status(201).json({
      msg: `Phone number ${phone} verified successfully`,
      token: token,
      refreshToken: refreshToken
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};
