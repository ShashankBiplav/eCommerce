//packages
import jwt from "jsonwebtoken";

//models
import Administrator from "../../../models/administrator.js";

//helpers
import {validationErrorHandler} from "../../../helpers/validation-error-handler.js";

export const adminGetNewTokens = async (req, res, next) => {
  validationErrorHandler(req, next);
  const {refreshToken} = req.body;
  try {
    const admin = await Administrator.findOne({
        where: {
          id: req.userId,
          refreshToken
        }
      }
    );
    if (!admin) {
      const error = new Error('Admin not found');
      error.statusCode = 404;
      return next(error);
    }
    const id = admin["dataValues"]["id"];
    const name = admin["dataValues"]["name"];
    const phone = admin["dataValues"]["phone"];
    const token = jwt.sign({id, phone}, process.env.TOKEN_SIGNING_KEY, {expiresIn: '1 day'});
    const newRefreshToken = jwt.sign({id, phone, name}, process.env.REFRESH_TOKEN_SIGNING_KEY);
    await Administrator.update({refreshToken: newRefreshToken},{
      where:{
        id: req.userId,
        refreshToken: refreshToken
      }
    });
    res.status(201).json({
      msg: `Token Exchange successful`,
      token: token,
      refreshToken: newRefreshToken
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};
