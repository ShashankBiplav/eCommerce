import express from 'express';

import {body} from 'express-validator';

import * as administratorController from "../controllers/administrator-controller.js";

import {isAdministrator} from "../middleware/is-administrator.js";

const router = express.Router();

//UPDATE ADMIN PROFILE
router.post('/update-profile', isAdministrator,[
  body('name').not().isEmpty().trim().escape().withMessage("Name is required"),
  body('email').isEmail().normalizeEmail().withMessage("Should be in a valid email format"),
  body('password').trim().isLength({min:6}).withMessage("Password must be 6 characters long")
], administratorController.changeAdministratorDetails);

export default router;
