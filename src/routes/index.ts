import {Router} from 'express';
import authRoutes from './auth';
import productsRoute from './products';

const rootRouter:Router =Router()

rootRouter.use('/auth',authRoutes)
rootRouter.use('/products',productsRoute)

export default rootRouter;