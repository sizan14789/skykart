import { Router } from "express";
import { getAllProducts, getProductsBySeller } from "../controllers/Products.js";
import { validateSeller } from "../middlewares/validateUser.js";

const router = Router();

// all products
router.get("/api/products", getAllProducts);

//
router.get("/api/seller/products", validateSeller, getProductsBySeller);

export default router;
