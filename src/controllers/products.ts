import { Request,Response } from "express"
import { Prismaclient } from ".."
import { InternalExeption } from "../exeptions/internalexeption"
import { ErrorCode } from "../exeptions/root"
import { NotFoundExeption } from "../exeptions/not_found"


export const createProduct = async(req:Request,res:Response)=>{
    try {
        const product = await Prismaclient.product.create({
            data:{
                ...req.body,
                tag:req.body.tag.join(',')
            }
        })
        res.json(product)
    } catch (error) {
        const  exeptions = new InternalExeption('sonmething when wrong',error,ErrorCode.INTERNAL_EXCEPTION_HANDELING)
            res.status(exeptions.statusCode).json({
                error:exeptions.errors,
                message:exeptions.message,
                errorCode: ErrorCode.INTERNAL_EXCEPTION_HANDELING
               })
    }
}
 export const updateproduct = async (req:Request,res:Response)=>{
    try {
        const product = req.body
        if(product.tag){
            product.tag = product.tag.join(',');
        }
        const updateproduct = await  Prismaclient.product.update({
            where:{
                id: +req.params.id
            },
            data: product
        });
        res.json(updateproduct)
    } catch (error) {
        const usernotfound = new NotFoundExeption('Product not found',ErrorCode.USER_NOT_FOUND)
       return res.status(usernotfound.statusCode).json({
        error:usernotfound.errors,
        message:usernotfound.message,
        ErrorCode:ErrorCode.USER_NOT_FOUND
       })
    }
 }

 export const deletproduct = async (req:Request,res:Response)=>{
    
 }

 export const listproduct = async (req:Request,res:Response)=>{
    
 }

 export const getproductbyId = async (req:Request,res:Response)=>{
    
 }