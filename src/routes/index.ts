import {Router} from 'express';
import authRoutes from './auth';
import productsRoute from './products';
import userRouters from './users';

const rootRouter:Router =Router()

rootRouter.use('/auth',authRoutes)
rootRouter.use('/products',productsRoute)
rootRouter.use('/users',userRouters)

export default rootRouter;