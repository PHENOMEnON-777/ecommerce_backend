import { NextFunction, Request,Response } from "express"
import { UnauthorizedExeption } from "../exeptions/unauthorized";
import { ErrorCode } from "../exeptions/root";
import { JWT_SECRET } from "../secreate";
import * as jwt from "jsonwebtoken"
import { Prismaclient } from "..";
import { User } from "@prisma/client"


 const authMiddleware = async(req:Request,res:Response,next:NextFunction)=>{

    const token = req.headers.authorization;
    if(!token){
        const Unauthorizeduser  = new UnauthorizedExeption('Unauthorized',ErrorCode.UNPROCESSABLE_ENTITY)
     return res.status(Unauthorizeduser.statusCode).json({
        error:Unauthorizeduser.errors,
        message:Unauthorizeduser.message,
        errorCode: ErrorCode.USER_ALREADY_EXISTS
    });
    }
    try {
        const payload  =jwt.verify(token,JWT_SECRET) as any;

        const user = await Prismaclient.user.findFirst({where:{id: payload.userId}})

        if(!user){
            const Unauthorizeduser  = new UnauthorizedExeption('Unauthorized',ErrorCode.UNPROCESSABLE_ENTITY)
            return res.status(Unauthorizeduser.statusCode).json({
               error:Unauthorizeduser.errors,
               message:Unauthorizeduser.message,
               errorCode: ErrorCode.USER_ALREADY_EXISTS
           });

        }
        req.user =user as User
        next()
    } catch (error) {
        const Unauthorizeduser  = new UnauthorizedExeption('Unauthorized',ErrorCode.UNPROCESSABLE_ENTITY)
        return res.status(Unauthorizeduser.statusCode).json({
           error:Unauthorizeduser.errors,
           message:Unauthorizeduser.message,
           errorCode: ErrorCode.USER_ALREADY_EXISTS
       });
    }

}

export default authMiddleware  