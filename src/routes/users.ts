import { Router } from "express";
import { errorHandler } from "../error-handler";
import authMiddleware from "../middlewares/auth";
import adminMiddleware from "../middlewares/admin";
import { addAddress, deleteAddress, listAddresses, updateUser } from "../controllers/users";

const userRoutes:Router = Router()

userRoutes.post('/address', authMiddleware, errorHandler(addAddress))
userRoutes.delete('/address/:id', authMiddleware, errorHandler(deleteAddress))
userRoutes.get('/address', authMiddleware, errorHandler(listAddresses))
userRoutes.put('/', authMiddleware, errorHandler(updateUser))

export default userRoutes;