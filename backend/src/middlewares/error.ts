import { NextFunction , Response } from "express";
import DevBlogError from "../utils/error";
import Logger from "../utils/logger";

async function ErrorHandlingMiddleware(
    error : Error,
    req : DevBlogType.Request,
    res : Response,
    _next : NextFunction
){
    const errorMsgRes = {
        'status' : 500,
        'message' : '',
    }
    if(error instanceof URIError || error instanceof SyntaxError){
        errorMsgRes.status = 500
        errorMsgRes.message = "Unprocessable request"

    } else if(error instanceof DevBlogError) {
        errorMsgRes.status = error.status
        errorMsgRes.message = error.message
    } else{
        errorMsgRes.message = error.message
    }
    req.email = ''
    req.uid = ''
    Logger.info(`Error: ${errorMsgRes}`)
    Logger.error(`Error: ${errorMsgRes.message} Stack:${error.stack}`)
    res.json(errorMsgRes)
}
export default ErrorHandlingMiddleware