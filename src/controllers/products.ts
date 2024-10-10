import { Request,response,Response } from "express"
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
               });
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
    try {
        const deleteproduct = await Prismaclient.product.delete({
            where:{
                id: +req.params.id
            },

        });
        const count = await Prismaclient.product.count();
        const products = await Prismaclient.product.findMany({
            // skip:  req.query.skip ? +req.query.skip : 0,
            // take: 5
        });
        res.json({count,data:products})
    } catch (error) {
        const usernotfound = new NotFoundExeption('Product not found',ErrorCode.USER_NOT_FOUND)
       return res.status(usernotfound.statusCode).json({
        error:usernotfound.errors,
        message:usernotfound.message,
        ErrorCode:ErrorCode.USER_NOT_FOUND
       });
    }
 }

 export const listproduct = async (req:Request,res:Response)=>{
    try {
        const count = await Prismaclient.product.count();
        const products = await Prismaclient.product.findMany({
            // skip:  req.query.skip ? +req.query.skip : 0,
            // take: 5
        });
        res.json({
            count,data:products
        })
    } catch (error) {
        const  exeptions = new InternalExeption('sonmething when wrong',error,ErrorCode.INTERNAL_EXCEPTION_HANDELING)
        res.status(exeptions.statusCode).json({
            error:exeptions.errors,
            message:exeptions.message,
            errorCode: ErrorCode.INTERNAL_EXCEPTION_HANDELING
           }) 
    }
 }

 export const getproductbyId = async (req:Request,res:Response)=>{
    try {
        const product = await Prismaclient.product.findFirstOrThrow({
            where:{
                id: +req.params.id
            }
        });
        res.json({product})
    } catch (error) {
        const usernotfound = new NotFoundExeption('Product not found',ErrorCode.USER_NOT_FOUND)
       return res.status(usernotfound.statusCode).json({
        error:usernotfound.errors,
        message:usernotfound.message,
        ErrorCode:ErrorCode.USER_NOT_FOUND
       });
    }
 }