import { Router } from "express";
import { errorHandler } from "../error-handler";
import authMiddleware from "../middlewares/auth";
import { addAddress, changeUserRole, deleteAddress, getUserById, listAddresses, listUsers, updateUser } from "../controllers/users";
import adminMiddleware from "../middlewares/admin";

const userRoutes:Router = Router()

// User Routes
userRoutes.post('/address', authMiddleware, errorHandler(addAddress))
userRoutes.delete('/address/:id', authMiddleware, errorHandler(deleteAddress))
userRoutes.get('/address', authMiddleware, errorHandler(listAddresses))
userRoutes.put('/', authMiddleware, errorHandler(updateUser))

// Admin Routes
userRoutes.put('/role/:id', [authMiddleware, adminMiddleware], errorHandler(changeUserRole))
userRoutes.get('/', [authMiddleware, adminMiddleware], errorHandler(listUsers))
userRoutes.get('/:id', [authMiddleware, adminMiddleware], errorHandler(getUserById))

export default userRoutes;