//packages
import express from 'express';
import {body} from 'express-validator';

//controllers
import {createNewSellerProduct} from "../controllers/seller/create-product.js";
import {updateFeaturedSellerProductImage} from "../controllers/seller/update-featured-image.js";
import {toggleSellerProductStatus} from "../controllers/seller/toggle-product-status.js";

//middleware
import {isSeller} from "../middleware/is-seller.js";

const router = express.Router();

//CREATE NEW SELLER PRODUCT
router.post('/create-product', isSeller, [
  body('title').not().isEmpty().trim().escape().withMessage("Title is required"),
  body('price').isNumeric().not().isEmpty().withMessage("Should be in a Decimal format"),
  body('costPrice').isNumeric().not().isEmpty().withMessage("Should be in a Decimal format"),
  body('discount').isNumeric().not().isEmpty().withMessage("Should be in a Decimal format"),
  body('description').not().isEmpty().trim().isLength({min:20}).escape().withMessage("Description is required"),
  body('stock').trim().isInt().withMessage("Stock must be an integer")
], createNewSellerProduct);

router.put('/update-image/:productId',isSeller, updateFeaturedSellerProductImage);

router.put('/toggle-product/:productId', isSeller,[
  body('isActive').not().isEmpty().isBoolean().withMessage('This is a required boolean')
],toggleSellerProductStatus);

export default router;
