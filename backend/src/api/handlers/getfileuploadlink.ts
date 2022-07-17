import {Response} from 'express'
import Fetch from 'node-fetch'
import joi from 'joi'
export async function getFileUploadLink(req:DevBlogType.Request,res:Response){
    try {
        const reqSchema = joi.object({
            fileName : joi.string().required(),
            fileSize:joi.number().required(),
            fileType:joi.string().required().regex(/^image\/(png|jpeg|jpg)$/)
        })
        const {error,value} = reqSchema.validate(req.body)
        if(!error){
            
            // const response = await Fetch('http://localhost:7575/imgbucket/getlink')
            // console.log(response)
            // res.json({
            //     msg:'done'
            // })
        } else {
            res.json({
                msg:'error on file'
            })
        }
    } catch (error) {
        console.error(error)
    }
}