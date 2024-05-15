import { Router } from "express";
import { errorHandler } from "../error-handler";
import authMiddleware from "../middlewares/auth";
import { cancelOrder, changeStatus, createOrder, getOrderById, listAllOrders, listOrders, listUserOrders } from "../controllers/orders";
import adminMiddleware from "../middlewares/admin";

const orderRoutes:Router = Router()

// Admin routes
orderRoutes.get('/index', [authMiddleware, adminMiddleware], errorHandler(listAllOrders))
orderRoutes.get('/users/:id', [authMiddleware, adminMiddleware], errorHandler(listUserOrders))
orderRoutes.put('/status/:id', [authMiddleware, adminMiddleware], errorHandler(changeStatus))

// User Routes
orderRoutes.post('/', authMiddleware, errorHandler(createOrder))
orderRoutes.put('/cancel/:id', authMiddleware, errorHandler(cancelOrder))
orderRoutes.get('/', authMiddleware, errorHandler(listOrders))
orderRoutes.get('/:id', authMiddleware, errorHandler(getOrderById))

export default orderRoutes;