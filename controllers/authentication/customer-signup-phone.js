//models
import Customer from "../../models/customer.js";

//helpers
import {validationErrorHandler} from "../../helpers/validation-error-handler.js";
import {generateOTP} from "../../helpers/generate-otp.js";
import {sendOtp} from "../../helpers/sendOtp.js";
import {isPhoneUnique} from "../../helpers/is-phone-unique.js";

export const customerSignupPhone = async (req, res, next) => {
  validationErrorHandler(req, next);
  const {name, phone} = req.body;
  const otp = Number.parseInt(generateOTP(6));
  try {
    const response = await sendOtp(otp, phone);
    if (response.status === 200) {
      const isUnique = await isPhoneUnique(Customer, phone);
      if (!isUnique) {
        await Customer.update({otp}, {
          where: {phone}
        });
        res.status(201).json({
          msg: `Customer already exists. OTP sent to ${phone}`,
        });
      } else {
        await Customer.create({
          name,
          phone,
          otp
        });
        res.status(201).json({
          msg: `Customer registered! OTP sent to ${phone}`
        });
      }
    }
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};
