import { Router } from "express";
import { validateBuyer } from "../middlewares/validateUser.js";
import { getOrderById, getOrders, updateOrder } from "../controllers/orders.js";

const router = Router();

// get orders
router.get("/api/orders", validateBuyer, getOrders);

// get order by id
router.get("/api/orders/:id", validateBuyer, getOrderById);

// update order
router.post("/api/order", validateBuyer, updateOrder);

export default router;
