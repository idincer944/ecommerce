import {Router} from 'express'
import { login, me, signup } from '../controllers/auth'
import  {errorHandler}  from '../error-handler'
import authMiddleware from '../middlewares/auth'

const authRoutes:Router = Router()

// User Routes
authRoutes.post('/signup', errorHandler(signup))
authRoutes.post('/login', errorHandler(login))

// Admin Routes
authRoutes.get('/me', [authMiddleware], errorHandler(me))

export default authRoutes;