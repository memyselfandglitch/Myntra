import express from "express";
import { getProducts, getProduct } from "../controllers/products.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

/* READ */
router.get("/", getProducts);
router.get("/:id", getProduct);


export default router;
