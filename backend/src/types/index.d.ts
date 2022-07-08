
type expressRequest = import('express').Request

declare namespace BlogType {
    interface Request extends expressRequest {
        email:string,
        uid:string
    }
}