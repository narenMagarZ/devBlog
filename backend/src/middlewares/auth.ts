
import {Response , NextFunction} from 'express'
import { VerifyJwt } from '../utils/verifyjwt'
import {JsonWebTokenError} from 'jsonwebtoken'
import {DevBlogResponse, HandleResponse} from '../utils/devblogresponse'
export async function AuthenticateRequest(req:DevBlogType.Request,res:Response,next:NextFunction){
    const authenticatedRoutes = ['/profile','/new','/'] 
    const exactReqUrl = req.url.split('/api')[1] 
    if(authenticatedRoutes.includes(exactReqUrl)){
        const token = req.signedCookies.uuid as string
        const jwtContent : any = await VerifyJwt(token)
        if(jwtContent instanceof JsonWebTokenError && exactReqUrl !== '/'){
            const _res = new DevBlogResponse('no authenticated user',null,400)         
            HandleResponse(_res,res)
        } else {
            req.uid = jwtContent ? jwtContent.uid : null
            req.email = jwtContent ? jwtContent.email : null
            next()
        }  
    } 
    else next()
}



