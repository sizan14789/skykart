import { Router } from "express";
import {
  addProduct,
  getAllProducts,
  getProduct,
} from "../controllers/Products.js";
import { validateSeller } from "../middlewares/validateUser.js";
import { convertProductTypes, productSchema } from "../schemas/product.js";
import validate from "../middlewares/validation.js";

const router = Router();

// all products
router.get("/products", getAllProducts);

// single product
router.get("/products/:id", getProduct);

// single product
router.post(
  "/product",
  validateSeller,
  convertProductTypes,
  validate(productSchema),
  addProduct
);

export default router;
