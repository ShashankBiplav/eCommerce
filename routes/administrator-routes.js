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

//CREATE NEW PRODUCT
router.post('/add-product', isAdministrator,[
  body('title').not().isEmpty().trim().escape().withMessage("Title is required"),
  body('price').isNumeric().not().isEmpty().withMessage("Should be in a Decimal format"),
  body('costPrice').isNumeric().not().isEmpty().withMessage("Should be in a Decimal format"),
  body('discount').isNumeric().not().isEmpty().withMessage("Should be in a Decimal format"),
  body('description').not().isEmpty().trim().isLength({min:20}).escape().withMessage("Description is required"),
  body('stock').trim().isInt().withMessage("Stock must be an integer"),
], administratorController.createNewAdminProduct);

//EDIT AN EXISTING PRODUCT
router.put('/edit-product/:productId',isAdministrator,[
  body('title').not().isEmpty().trim().escape().withMessage("Title is required"),
  body('price').isNumeric().not().isEmpty().withMessage("Should be in a Decimal format"),
  body('costPrice').isNumeric().not().isEmpty().withMessage("Should be in a Decimal format"),
  body('discount').isNumeric().not().isEmpty().withMessage("Should be in a Decimal format"),
  body('description').not().isEmpty().trim().isLength({min:20}).escape().withMessage("Description is required"),
  body('stock').trim().isInt().withMessage("Stock must be an integer"),
], administratorController.editAdminProduct);

//EDIT FEATURED IMAGE OF AN EXISTING PRODUCT
router.put('/edit-image/:productId', isAdministrator, administratorController.updateFeaturedImageOfProduct);

//EDIT BUYER, SELLER, AUTHORIZATION STATUS OF A USER
router.patch('/edit-user/:userId', isAdministrator,[
  body('isBuyer').not().isEmpty().isBoolean().withMessage('This is a required boolean'),
  body('isSeller').not().isEmpty().isBoolean().withMessage('This is a required boolean'),
  body('isAuthorized').not().isEmpty().isBoolean().withMessage('This is a required boolean'),
], administratorController.toggleUserStatus);

//EDIT PRODUCT PARAMETERS
router.patch('/edit-product/:productId', isAdministrator,[
  body('isActive').not().isEmpty().isBoolean().withMessage('This is a required boolean'),
  body('isTrending').not().isEmpty().isBoolean().withMessage('This is a required boolean'),
  body('isDealOfTheDay').not().isEmpty().isBoolean().withMessage('This is a required boolean'),
], administratorController.editProductParameters);

export default router;
