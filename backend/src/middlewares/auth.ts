
import {Response , NextFunction} from 'express'
import { VerifyJwt } from '../utils/verifyjwt'
import {JsonWebTokenError} from 'jsonwebtoken'
import {DevBlogResponse, HandleResponse} from '../utils/devblogresponse'
export async function AuthenticateRequest(req:DevBlogType.Request,res:Response,next:NextFunction){
    const authenticatedRoutes = ['/profile','/new','/'] 
    const exactReqUrl = req.url.split('/api')[1] 
    if(authenticatedRoutes.includes(exactReqUrl)){
        const token = req.signedCookies.token as string
        const jwtContent : any = exactReqUrl !== '/' ? await VerifyJwt(token) : null
        if(jwtContent instanceof JsonWebTokenError){
            const _res = new DevBlogResponse('no authenticated user',null,400)         
            HandleResponse(_res,res)
        } else {
            req.uid = jwtContent.uid ?? null
            req.email = jwtContent.email ?? null
            next()
        }  
    } 
    else next()
}



