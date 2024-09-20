import express from "express";
import { ProductController } from "../controllers/ProductController";

export const router = express.Router();

router.get("/products", ProductController.find);
router.get("/products/:id", ProductController.findOne);
router.post("/products", ProductController.create);
router.put("/products/:id", ProductController.update);
router.delete("/products/:id", ProductController.delete);