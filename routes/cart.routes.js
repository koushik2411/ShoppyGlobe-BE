import express from "express";
import { addToCart, getCart, updateCart, deleteCartItem } from "../controllers/cart.controller.js";
import authMiddleware from "../middleware/auth.middleware.js";

const router = express.Router();

// middleware
router.use(authMiddleware);

// get cart
router.get("/", getCart);

// add item to cart
router.post("/", addToCart);

// update item
router.put("/:id", updateCart);

// delete item from cart
router.delete("/:id", deleteCartItem);

export default router;