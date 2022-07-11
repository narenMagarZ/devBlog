import {response, Response} from 'express'



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

}


