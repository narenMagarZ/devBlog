import { Response} from 'express'
import Logger from './logger'



export class DevBlogResponse{
    message : string
    data : any
    status : number
    constructor(message?:string,data?:any,status = 200){
        this.message = message ?? 'OK'
        this.data = data ?? null
        this.status= status
    }
}

export function HandleResponse(
    devBlogresponse:DevBlogResponse,
    res:Response){
        Logger.success(`[RESPONSE]: ${String(devBlogresponse)}`)
        return res.json(devBlogresponse)
}


