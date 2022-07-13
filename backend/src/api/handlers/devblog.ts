import {Response,NextFunction} from 'express'
import Logger from '../../utils/logger'
import * as db from '../../db/mongo/mongo'
// import {userSchema} from '../../db/mongo/userschema'
export default function DevBlog(req:DevBlogType.Request,res:Response,next:NextFunction){
    try{
        const {email,uid} = req
        console.log(email,uid)
        if(email && uid) {
            const user = db.getUser()
            const requestedUser = user.findOne({'uid':uid,'email' : email})
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