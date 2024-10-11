import { Router } from "express";
import authMiddleware from "../middlewares/auth";
import { AddaitemToCart, changeQuantity, DeleteItemFromCart, getCart } from "../controllers/cart";



const CartRoute: Router =Router()

CartRoute.post('/',[authMiddleware],AddaitemToCart)
CartRoute.delete('/:id',[authMiddleware],DeleteItemFromCart)
CartRoute.put('/:id',[authMiddleware],changeQuantity)
CartRoute.get('/',[authMiddleware],getCart)

export default CartRoute
