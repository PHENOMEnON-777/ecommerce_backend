// import { PrismaClient } from "@prisma/client";
import { NextFunction, Request, Response } from "express";
import { Prismaclient } from "..";
import { hashSync,compareSync } from "bcrypt";
import * as jwt from "jsonwebtoken"
import { JWT_SECRET } from "../secreate";
import { BadrequestExeption } from "../exeptions/bad_request";
import { ErrorCode } from "../exeptions/root";
import { UnprocessableEntity } from "../exeptions/validation";
import { SignUpSchema } from "../schema/users";
import { NotFoundExeption } from "../exeptions/not_found";


export const signUp = async (req:Request,res:Response,next:NextFunction)=>{

    try{
        SignUpSchema.parse(req.body);
        const {email, password, name} = req.body;
    
        let user = await Prismaclient.user.findFirst({where:{email}});
        
        if(user){

        const badrequest = new BadrequestExeption('User already exists!', ErrorCode.USER_ALREADY_EXISTS)

        return res.status(badrequest.statusCode).json({
            error:badrequest.errors,
            message: badrequest.message,
            errorCode: ErrorCode.USER_ALREADY_EXISTS
        });
        }
        user = await Prismaclient.user.create({
        data:
         {
            name,
            email,
            password : hashSync(password, 7)
         }
        })
       return res.json(user)
    }catch(error:any){

     const Unprocessable  = new UnprocessableEntity(error?.issues, 'Unprocessable entity',ErrorCode.UNPROCESSABLE_ENTITY)
     return res.status(Unprocessable.statusCode).json({
        error:Unprocessable.errors,
        message: Unprocessable.message,
        errorCode: ErrorCode.USER_ALREADY_EXISTS
    });
    }
   
}

export const login = async (req:Request,res:Response)=>{
    const {email, password,} = req.body;
    
    let user = await Prismaclient.user.findFirst({where:{email}})
    
    if(!user){
        throw new NotFoundExeption('User not found',ErrorCode.USER_NOT_FOUND)
    }
    if(!compareSync(password,user.password)){
        const badrequest = new BadrequestExeption('Incorrect Password!', ErrorCode.USER_ALREADY_EXISTS)

        return res.status(badrequest.statusCode).json({
            error:badrequest.errors,
            message: badrequest.message,
            errorCode: ErrorCode.USER_ALREADY_EXISTS
        });
    }

    const token = jwt.sign({
        userId : user.id
    },JWT_SECRET)

    res.json({user,token})
}