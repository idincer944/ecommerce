import { Router } from "express";
import { errorHandler } from "../error-handler";
import authMiddleware from "../middlewares/auth";
import { addAddress, deleteAddress, listAddresses, updateUser } from "../controllers/users";
import { cancelOrder, createOrder, getOrderById, listOrders } from "../controllers/orders";

const orderRoutes:Router = Router()

orderRoutes.post('/', authMiddleware, errorHandler(createOrder))
orderRoutes.put('/:id', authMiddleware, errorHandler(cancelOrder))
orderRoutes.get('/', authMiddleware, errorHandler(listOrders))
orderRoutes.get('/:id', authMiddleware, errorHandler(getOrderById))

export default orderRoutes;