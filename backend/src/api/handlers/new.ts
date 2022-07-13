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
            const testcontent = {
                'title' : 'Simple Http server on nodejs ',
                'coverimg' : 'https://res.cloudinary.com/practicaldev/image/fetch/s--_QMQU86---/c_imagga_scale,f_auto,fl_progressive,h_420,q_auto,w_1000/https://dev-to-uploads.s3.amazonaws.com/i/6dnng3pre04xxdebia1g.png',
                'links' : ['www.nodejs.org','www.npmpackage.com'],
                'content' : `
                I will show you how to set up a Rest API with Node and Express. I hope you can learn something from this tutorial and I can learn something with your feedback.
                REST, or REpresentational State Transfer, is an architectural style for providing standards between computer systems on the web,
                making it easier for systems to communicate with each other. REST-compliant systems, often called RESTful systems, 
                are characterized by how they are stateless and separate the concerns of client and server.
                We will go into what these terms mean and why they are beneficial characteristics for services on the Web.
                `
            }
            res.json(testcontent)
        }else {

        }
    }
    catch(err){
        Logger.info(err.message)
        Logger.error(err.message)
    }
}