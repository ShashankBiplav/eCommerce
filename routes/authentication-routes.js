import express from 'express';

import expressValidator from 'express-validator';

import {adminSignupPhone} from '../controllers/authentication/admin-signup-phone.js';


const router = express.Router();

//TICKET COLLECTOR SIGNUP USING PHONE AND PASSWORD
router.post('/administrator/signup/phone', adminSignupPhone);



export default router;
