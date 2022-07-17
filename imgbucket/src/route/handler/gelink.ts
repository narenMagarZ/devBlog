import {Request,Response} from 'express'
import joi from 'joi'
import { resolve } from 'path'
import {v4 as uuidv4} from 'uuid'
export default function getBucketKey(req:Request,res:Response){
    try{
        
        const reqSchema = joi.object({
            fileName : joi.string().required(),
            fileSize : joi.number().required(),
            fileType : joi.string().required().regex(/image\/(png|jpeg|giff|jpg)/)
        })
        const {error,value} = reqSchema.validate(req.body)
        if(!error){
            const {fileName,fileSize,fileType} = value
            // used filesize to store the meta data about the coverimage
            const baseStorage = resolve(__dirname,'../','../','../','./uploads') as string
            const uploadFileName = uuidv4().split('-').join('') + '.' + fileName + '.' +  fileType.split('/')[1] as string
            const generatedLink = baseStorage + '/' + uploadFileName
            res.json({
                link:generatedLink,
                status:200
            })
        } else {
            res.json({
                msg:'error'
            })
        }
        console.log(error,value)
    }   
    catch(err){
        console.error(err)
    } 
}

