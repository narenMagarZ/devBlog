import {v4 as uuidv4} from 'uuid'
class DevBlogError extends Error{
    status : number
    errorId : string
    uid?:string
    constructor(status:number,message?:string,stack?:string,uid?:string){
        super()
        this.status = status ?? 500
        this.errorId = uuidv4()
        this.uid = uid
        this.stack = stack

        if( this.stack && this.status >= 500){
            this.stack = this.message + '\n' + this.stack
            this.message = "Internal server error " + this.errorId
        }
        else this.message = String(message)
    }

}

export default DevBlogError