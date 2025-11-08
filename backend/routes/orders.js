import { Router } from "express";
import { validateBuyer } from "../middlewares/validateUser.js";
import { updateOrder } from "../controllers/orders.js";

const router = Router();

// get cart only
router.get("/api/orders", validateBuyer);

// get cart with product details
router.get("/api/orderDetails", validateBuyer);

// update order
router.post("/api/order", validateBuyer, updateOrder);

export default router;
