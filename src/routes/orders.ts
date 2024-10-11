import { Router } from "express";
import authMiddleware from "../middlewares/auth";
import { CancleOrder, CreateOrder, getOrderbyId, listOrder } from "../controllers/orders";



const OrderRouters:Router =Router()

OrderRouters.post('/',[authMiddleware],CreateOrder)
OrderRouters.get('/',[authMiddleware],listOrder)
OrderRouters.put('/',[authMiddleware],CancleOrder)
OrderRouters.get('/',[authMiddleware],getOrderbyId)


export default OrderRouters

