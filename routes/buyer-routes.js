//packages
import express from 'express';
import {body} from 'express-validator';

//controllers
import {addProductToCart} from "../controllers/buyer/add-product-to-cart.js";
import {removeProductFromCart} from "../controllers/buyer/remove-product-from-cart.js";

//middleware
import {isBuyer} from "../middleware/is-buyer.js";

const router = express.Router();

//ADD PRODUCT TO CART
router.post('/add-product-to-cart', isBuyer, addProductToCart);

//REMOVE PRODUCT FROM CART
router.post('/remove-product-from-cart/:productId', isBuyer, removeProductFromCart);

export default router;
