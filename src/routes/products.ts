import { Router } from "express";
import { createProduct, deletproduct, getproductbyId, listproduct, updateproduct } from "../controllers/products";
import authMiddleware from "../middlewares/auth";
import adminMiddleware from "../middlewares/admin";


const productsRoute:Router = Router()


productsRoute.post('/',[authMiddleware,adminMiddleware],createProduct)
productsRoute.put('/:id',[authMiddleware,adminMiddleware],updateproduct)
productsRoute.delete('/:id',[authMiddleware,adminMiddleware],deletproduct)
productsRoute.get('/',[authMiddleware,adminMiddleware],listproduct)
productsRoute.get('/:id',[authMiddleware,adminMiddleware],getproductbyId)


export default productsRoute 
