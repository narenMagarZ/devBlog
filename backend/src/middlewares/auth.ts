
import {Response , NextFunction} from 'express'


export function AuthenticateRequest(req:BlogType.Request,res:Response,next:NextFunction){
    // console.log(req)
    req.email = 'naren@gmail.com'
    next()

}