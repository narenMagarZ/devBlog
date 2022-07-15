import {Response,NextFunction} from 'express'
import Logger from '../../utils/logger'
import joi from 'joi'
import {v4 as uuidv4} from 'uuid'
import { AddTask } from '../../task/queue'
export default function NewPost(req:DevBlogType.Request,res:Response,next:NextFunction){
    try{
        const {body} = req.body
        const postContentSchema = joi.object({
            title:joi.string().required(),
            tags:joi.string().allow(''),
            content:joi.string().required()
        })
        const {error,value} = postContentSchema.validate({title:body[0],tags:body[1],content:body[2]})
        if(!error){
            const {title,tags,content} = value
            let uploadFileInfo = {}
            if(req.files != {} && typeof req.files !== 'undefined'){
                const reqFile = req.files['coverimg'][0]
                uploadFileInfo['filename'] = reqFile.filename
                uploadFileInfo['filesize'] = reqFile.size,
                uploadFileInfo['originalname'] = reqFile.originalname,
                uploadFileInfo['mimetype'] = reqFile.mimetype,
                uploadFileInfo['path'] = reqFile.path
            }
            const postContent = {
                'title' : title,
                'tags' : tags,
                'content' : content,
                'originalname' : uploadFileInfo['originalname'] ?? '',
                'filesize' : uploadFileInfo['filesize'] ?? '',
                'filename' : uploadFileInfo['filename'] ?? '',
                'mimetype' : uploadFileInfo['mimetype'] ?? '',
                'path' : uploadFileInfo['path'] ?? '',
                'uid':req.uid,
                'email':req.email,
                'postedat':new Date(Date.now()),
                'organization':req.email.split('@')[0],
                'postid':uuidv4().split('-').join('')
            }
            console.log(postContent)
            AddTask('newpost',postContent)
            res.json('done')
        }else {
            res.json('error on input fields')
        }
    }
    catch(err){
        Logger.info(err.message)
        Logger.error(err.message)
    }
}