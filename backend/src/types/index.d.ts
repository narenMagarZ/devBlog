
type expressRequest = import('express').Request

declare namespace DevBlogType {
    interface Request extends expressRequest {
        email:string,
        uid:string
    }

    interface user{
        name:string,
        email:string,
        profile:string,
        uid:string
    }
}
