import {Response,NextFunction} from 'express'
import Logger from '../../utils/logger'
import {user} from '../../db/mongo/userschema'
export default function DevBlog(req:DevBlogType.Request,res:Response,next:NextFunction){
    try{
        // check if user is logged in
        // if user is logged in 
        const {email,uid} = req
        if(email && uid) {
            // show only the favourite or related tag's articles and blogs
            const requestedUser = user.findOne({'uid':uid,'email' : email})
            console.log(requestedUser)
            return res.end('done')
        } else {
            // then show the all possible articles or blogs
        }
    }
    catch(err){
        Logger.error(err.message)
    }
}