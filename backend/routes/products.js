import { Router } from "express";
import { getAllProducts, getProduct } from "../controllers/Products.js";
// import { validateSeller } from "../middlewares/validateUser.js";

const router = Router();

// all products
router.get("/api/products", getAllProducts);

// single product
router.get("/api/products/:id", getProduct);

export default router;
