import { NextFunction , Response } from "express";
import { getDB } from "../../db/mongo/mongo";
import DevBlogError from "../../utils/error";
import joi from "joi";
import {OAuth2Client} from 'google-auth-library'
export default async function Login(req:DevBlogType.Request,res:Response,next:NextFunction){
    const {clientId,credential} = req.body
    console.log(clientId,credential)
    // await getDB().createCollection('testusers')
    // 278447342299-h9kf3018umacfckqjmhdrd31abpfm26a.apps.googleusercontent.com
    const loginInfoSchema = joi.object({
        clientId:joi.string().required().pattern(/^[A-z0-9\W]+.apps.googleusercontent.com$/),
        credential:joi.string().required()
    }).with('clientId','credential')
    const loginInfo = loginInfoSchema.validate({clientId,credential})
    console.log(loginInfo)
    if(!loginInfo.error){
        const client = new OAuth2Client(clientId)
        async function Verify(){
            const ticket = await client.verifyIdToken({
                idToken:'',
                audience:clientId
            })
            const payload = ticket.getPayload() 
            const userId =  payload instanceof Array ?  payload['sub'] : null
            const domain =  payload instanceof Array ? payload['hd'] : null
        }
    } else {
        return next(new DevBlogError(400))
    }
    res.end('done')
}