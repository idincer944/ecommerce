import { Router } from "express";
import { errorHandler } from "../error-handler";
import { createProduct, deleteProduct, getProductById, listProducts, searchProducts, updateProduct } from "../controllers/products";
import authMiddleware from "../middlewares/auth";
import adminMiddleware from "../middlewares/admin";

const productRoutes:Router = Router()

// User Routes
productRoutes.get('/search', [authMiddleware], errorHandler(searchProducts))

// Admin Routes
productRoutes.post('/', [authMiddleware, adminMiddleware], errorHandler(createProduct))
productRoutes.put('/:id', [authMiddleware, adminMiddleware], errorHandler(updateProduct))
productRoutes.delete('/:id', [authMiddleware, adminMiddleware], errorHandler(deleteProduct))
productRoutes.get('/', [authMiddleware, adminMiddleware], errorHandler(listProducts))
productRoutes.get('/:id', [authMiddleware, adminMiddleware], errorHandler(getProductById))


export default productRoutes;