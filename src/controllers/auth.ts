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
import { InternalExeption } from "../exeptions/internalexeption";


export const signup = async (req:Request,res:Response,next:NextFunction):Promise<Response<any, Record<string, any>> | undefined>=>{
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
        try {
            const Unprocessable  = new UnprocessableEntity(error?.issues, 'Unprocessable entity',ErrorCode.UNPROCESSABLE_ENTITY)
            return res.status(Unprocessable.statusCode).json({
               error:Unprocessable.errors,
               message: Unprocessable.message,
               errorCode: ErrorCode.USER_ALREADY_EXISTS
           });
        } catch (error) {
            const  exeptions = new InternalExeption('sonmething when wrong',error,ErrorCode.INTERNAL_EXCEPTION_HANDELING)
            res.status(exeptions.statusCode).json({
                error:exeptions.errors,
                message:exeptions.message,
                errorCode: ErrorCode.INTERNAL_EXCEPTION_HANDELING
               })
        }
    }  
}



export const login = async (req:Request,res:Response)=>{
    const {email, password,} = req.body;
    
    let user = await Prismaclient.user.findFirst({where:{email}})
    
    if(!user){
       const usernotfound = new NotFoundExeption('User not found',ErrorCode.USER_NOT_FOUND)
       return res.status(usernotfound.statusCode).json({
        error:usernotfound.errors,
        message:usernotfound.message,
        ErrorCode:ErrorCode.USER_NOT_FOUND
       });
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
export const me = async (req:Request,res:Response,next:NextFunction)=>{
    res.json(req.user)
}