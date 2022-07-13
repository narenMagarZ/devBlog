import {Response,NextFunction} from 'express'
import Logger from '../../utils/logger'
import * as db from '../../db/mongo/mongo'
export default async function DevBlog(req:DevBlogType.Request,res:Response,next:NextFunction){
    try{
        const {email,uid} = req
        if(email && uid) {
            const user = db.getUser()
            const requestedUser = await user.findOne({'uid':uid}).exec()
            console.log(requestedUser)
            return res.end('done')
        } else {
            res.end('not okay')
        }
    }
    catch(err){
        Logger.error(err.message)
    }
}