import express from "express";
import { getProductById, getProducts } from "../controllers/product.controller.js";

const router = express.Router();

// For all products
router.get("/", getProducts);

// For a single product by its id
router.get("/:id", getProductById);

export default router;