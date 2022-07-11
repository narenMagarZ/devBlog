
type expressRequest = import('express').Request

declare namespace DevBlogType {
    interface Request extends expressRequest {
        email:string,
        uid:string
    }
}