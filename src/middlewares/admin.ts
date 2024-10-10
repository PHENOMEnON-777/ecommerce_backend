import { NextFunction, Request,Response } from "express"
import { UnauthorizedExeption } from "../exeptions/unauthorized";
import { ErrorCode } from "../exeptions/root";
import { JWT_SECRET } from "../secreate";
import * as jwt from "jsonwebtoken"
import { Prismaclient } from "..";
import { User } from "@prisma/client"


 const adminMiddleware = async(req:Request,res:Response,next:NextFunction)=>{
    const user = req.user
    if(user.role == 'ADMIN'){
        next()
    }
    else{
        const Unauthorizeduser  = new UnauthorizedExeption('Unauthorized',ErrorCode.UNPROCESSABLE_ENTITY)
        return res.status(Unauthorizeduser.statusCode).json({
           error:Unauthorizeduser.errors,
           message:Unauthorizeduser.message,
           errorCode: ErrorCode.USER_ALREADY_EXISTS
       });
    }
}

export default adminMiddleware  