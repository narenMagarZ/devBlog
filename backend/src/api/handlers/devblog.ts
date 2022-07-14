import {Response,NextFunction} from 'express'
import Logger from '../../utils/logger'
import * as db from '../../db/mongo/mongo'
export default async function DevBlog(req:DevBlogType.Request,res:Response,next:NextFunction){
    try{
        const {email,uid} = req
        if(email && uid) {
            const blogs = await db.getBlog().find({'uid' : uid , 'email' : email}).exec()
            console.log(blogs)
            return res.json(blogs)
        } else {
            res.end('not okay')
        }
    }
    catch(err){
        Logger.error(err.message)
    }
}