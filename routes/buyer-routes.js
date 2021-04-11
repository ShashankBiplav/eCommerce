//packages
import express from 'express';
import {body} from 'express-validator';

//controllers
import {addProductToCart} from "../controllers/buyer/add-product-to-cart.js";

//middleware
import {isBuyer} from "../middleware/is-buyer.js";

const router = express.Router();

//ADD PRODUCT TO CART
router.post('/add-product-to-cart', isBuyer, addProductToCart);

export default router;
