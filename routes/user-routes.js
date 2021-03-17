//packages
import express from 'express';
import {body} from 'express-validator';

//controllers
import {changeUserDetails} from "../controllers/user/change-user-details.js";

//middleware
import {isUser} from "../middleware/is-user.js";

const router = express.Router();

//UPDATE USER PROFILE
router.post('/update-profile', isUser,[
  body('name').not().isEmpty().trim().escape().withMessage("Name is required"),
  body('email').isEmail().normalizeEmail().withMessage("Should be in a valid email format"),
  body('password').trim().isLength({min:6}).withMessage("Password must be 6 characters long")
], changeUserDetails);

export default router;
