import express from "express";
import { getCartItems, addToCart, removeFromCart, updateCartItem } from "../controllers/cartController.js";

const router = express.Router();

router.get("/", getCartItems);
router.post("/", addToCart);
router.delete("/:id", removeFromCart);
router.put("/:id", updateCartItem);

export default router;
