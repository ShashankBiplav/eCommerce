import express from 'express';

import expressValidator from 'express-validator';

import {adminSignupPhone} from '../controllers/authentication/admin-signup-phone.js';
import {adminLoginPhone} from "../controllers/authentication/admin-login-phone.js";
import {userSignupPhone} from "../controllers/authentication/user-signup-phone.js";
import {userLoginPhone} from "../controllers/authentication/user-login-phone.js";


const router = express.Router();

//ADMIN SIGNUP USING PHONE
router.post('/administrator/signup/phone', adminSignupPhone);

//ADMIN LOGIN USING PHONE + OTP
router.post('/administrator/login/phone', adminLoginPhone);

//USER SIGNUP USING PHONE
router.post('/user/signup/phone', userSignupPhone);

//USER LOGIN USING PHONE + OTP
router.post('/user/login/phone', userLoginPhone);

export default router;
