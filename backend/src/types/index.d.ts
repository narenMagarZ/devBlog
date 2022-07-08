
type expressRequest = import('express').Request

declare namespace BlogType {
    interface requserinfo{
        email:string
        uid:string
    }
    interface Request extends expressRequest {
        ctx:requserinfo
    }
}