import {Response,NextFunction} from 'express'
import Logger from '../../utils/logger'
import joi from 'joi'
export default function NewPost(req:DevBlogType.Request,res:Response,next:NextFunction){
    try{
        const {body} = req.body
        const postContentSchema = joi.object({
            title:joi.string().required(),
            tags:joi.string().allow(''),
            content:joi.string().required(),
            links:joi.string().allow('')
        })
        const {error,value} = postContentSchema.validate({title:body[0],tags:body[1],content:body[2],links:body[3]})
        if(!error){
            const {title,tags,content,links} = value
            let uploadFileInfo = {}
            if(typeof req.files !== 'undefined'){
                const reqFile = req.files['coverimg'][0]
                uploadFileInfo['filename'] = reqFile.fileName
                uploadFileInfo['filesize'] = reqFile.size,
                uploadFileInfo['originalname'] = reqFile.originalname,
                uploadFileInfo['mimetype'] = reqFile.mimetype,
                uploadFileInfo['path'] = reqFile.path
            }
            const postContent = {
                'title' : title,
                'tags' : tags,
                'content' : content,
                'links' : links,
                'coverimg' : uploadFileInfo['coverimg'] ?? '',
                'filesize' : uploadFileInfo['filesize'] ?? '',
                'filename' : uploadFileInfo['filename'] ?? '',
                'originalname' : uploadFileInfo['originalname'] ?? '',
                'mimetype' : uploadFileInfo['mimetype'] ?? '',
                'path' : uploadFileInfo['path'] ?? ''
            }
            console.log(postContent)

            res.json('done')
        }else {

        }
    }
    catch(err){
        Logger.info(err.message)
        Logger.error(err.message)
    }
}