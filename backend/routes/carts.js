import { Router } from "express";
import { validateBuyer } from "../middlewares/validateUser.js"; 
import { getCartOnly, getCartWithProductDetails, updateCart } from "../controllers/cart.js";

const router = Router();

// get cart only
router.get("/api/cart", validateBuyer, getCartOnly);

// get cart with product details
router.get("/api/cartDetails", validateBuyer, getCartWithProductDetails);

// update cart
router.post("/api/cart", validateBuyer, updateCart);

export default router;
