import {Router} from 'express';
import authRoutes from './auth';
import productsRoute from './products';
import userRouters from './users';
import CartRoute from './cart';
import OrderRouters from './orders';

const rootRouter:Router =Router()

rootRouter.use('/auth',authRoutes)
rootRouter.use('/products',productsRoute)
rootRouter.use('/users',userRouters)
rootRouter.use('/carts',CartRoute)
rootRouter.use('/orders',OrderRouters)

export default rootRouter;