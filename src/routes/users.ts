import { Router } from "express";
import authMiddleware from "../middlewares/auth";
import adminMiddleware from "../middlewares/admin";
import { Addaddress, Deleteddress, Listddress } from "../controllers/users";



const userRouters:Router = Router()


 userRouters.post('/address',[authMiddleware,],Addaddress);
 userRouters.delete('/address/:id',[authMiddleware,],Deleteddress);
 userRouters.get('/address',[authMiddleware,],Listddress);



 export default userRouters