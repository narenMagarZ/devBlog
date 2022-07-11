
import {Response , NextFunction} from 'express'
import { VerifyJwt } from '../utils/verifyjwt'

export function AuthenticateRequest(req:DevBlogType.Request,_res:Response,next:NextFunction){
    const authenticatedRoutes = ['/profile','/new'] 
    const exactReqUrl = req.url.split('/api')[1] 
    const token = req.signedCookies.token as string
    if(authenticatedRoutes.includes(exactReqUrl)){
        const jwtContent : any = VerifyJwt(token)
        if(typeof jwtContent === 'object'){
            req.uid = jwtContent.id
            next()
        } 
        else if(typeof jwtContent === 'string') return next(new Error('unauthenticated user'))
        
    } 
    else next()

}



