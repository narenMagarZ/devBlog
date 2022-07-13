import {Response} from 'express'

interface profilehandler {
    'getProfile' : (
        req:DevBlogType.Request,
        res:Response
    )=>void
    'postProfile' : (
        req:DevBlogType.Request,
        res:Response
    )=>void
}
export const profileHandler : profilehandler = {
    'getProfile' : ()=>{},
    'postProfile' : ()=>{}
}

profileHandler.getProfile = function(req,res){

}

profileHandler.postProfile = function(req,res){

}