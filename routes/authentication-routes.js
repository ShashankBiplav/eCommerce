import express from 'express';

import expressValidator from 'express-validator';

import {adminSignupPhone} from '../controllers/authentication/admin-signup-phone.js';
import {adminLoginPhone} from "../controllers/authentication/admin-login-phone.js";


const router = express.Router();

//ADMIN SIGNUP USING PHONE
router.post('/administrator/signup/phone', adminSignupPhone);

//ADMIN LOGIN USING PHONE + OTP
router.post('/administrator/login/phone', adminLoginPhone);

export default router;
