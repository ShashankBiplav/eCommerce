import express from 'express';

import {body} from 'express-validator';

import {adminSignupPhone} from '../controllers/authentication/admin-signup-phone.js';
import {adminLoginPhone} from "../controllers/authentication/admin-login-phone.js";
import {userSignupPhone} from "../controllers/authentication/user-signup-phone.js";
import {userLoginPhone} from "../controllers/authentication/user-login-phone.js";
import {adminLoginEmail} from "../controllers/authentication/admin-login-email.js";
import {userLoginEmail} from "../controllers/authentication/user-login-email.js";


const router = express.Router();

//ADMIN SIGNUP USING PHONE
router.post('/administrator/signup/phone', [
  body('name').trim().not().isEmpty().withMessage("Name is required"),
  body('phone').trim().isInt().isLength({min: 10, max: 10}).withMessage("Phone must be an integer"),
], adminSignupPhone);

//ADMIN LOGIN USING PHONE + OTP
router.post('/administrator/login/phone', [
  body('phone').trim().isInt().isLength({min: 10, max:10}).withMessage("Phone must be an integer"),
  body('otp').trim().isInt().isLength({min: 6}).withMessage("OTP must be an integer and of 6 digits")
], adminLoginPhone);

//ADMIN LOGIN USING EMAIL + PASSWORD
router.post('/administrator/login/email', [
  body('email').isEmail().normalizeEmail().withMessage("Should be in a valid email format"),
  body('password').trim().isLength({min: 6}).withMessage("Minimum 6 characters")
], adminLoginEmail);

//USER LOGIN USING EMAIL + PASSWORD
router.post('/user/login/email', [
  body('email').isEmail().normalizeEmail().withMessage("Should be in a valid email format"),
  body('password').trim().isLength({min: 6}).withMessage("Minimum 6 characters")
], userLoginEmail);

//USER SIGNUP USING PHONE
router.post('/user/signup/phone', [
  body('name').trim().not().isEmpty().withMessage("Name is required"),
  body('phone').trim().isInt().isLength({min: 10, max:10}).withMessage("Phone must be an integer"),
], userSignupPhone);

//USER LOGIN USING PHONE + OTP
router.post('/user/login/phone', [
  body('phone').trim().isInt().isLength({min: 10}).withMessage("Phone must be an integer"),
  body('otp').trim().isInt().isLength({min: 6}).withMessage("OTP must be an integer and of 6 digits")
], userLoginPhone);

export default router;
