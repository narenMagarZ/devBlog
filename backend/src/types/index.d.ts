
type expressRequest = import('express').Request

declare namespace DevBlogType {
    interface Request extends expressRequest {
        email:string,
        uid:string
    }

    interface User{
        name:string,
        email:string,
        profile:string,
        uid:string
    }
    interface Blog{
        title : string
        email : string
        tags : string
        organization : string
        originalname : string
        postid : string
        filesize : string
        filename : string
        path : string,
        postedat : Date
        content : string,
        mimtype : string
        uid : string
    }
}
