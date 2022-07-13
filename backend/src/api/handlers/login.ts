import { NextFunction , Response } from "express";
import DevBlogError from "../../utils/error";
import joi from "joi";
import {decode} from 'jsonwebtoken'
import {decodedJwtSchema} from '../schema/decodedjwtschema'
import * as redis from '../../db/redis/redis'
import type IORedis from "ioredis";
import {DevBlogResponse, HandleResponse} from "../../utils/devblogresponse";
import Logger from "../../utils/logger";
import {v4 as uuidv4} from 'uuid'
import { AddTask} from "../../task/queue";
import { SetCookie } from "../../utils/createcookie";
export default async function Login(req:DevBlogType.Request,res:Response,next:NextFunction){
    const {clientId,credential} = req.body
    const loginInfoSchema = joi.object({
        clientId:joi
        .string()
        .required()
        .pattern(/^[A-z0-9\W]+.apps.googleusercontent.com$/),
        credential:joi
        .string()
        .required()
    }).with('clientId','credential')
    const loginInfo = loginInfoSchema.validate({clientId,credential})
    try{
        if(!loginInfo.error){
            const {clientId,credential} = loginInfo.value
            const decodedJwt  = decode(credential) 
                const {error,value} = decodedJwtSchema.validate(decodedJwt) 
                if(!error){
                    const {email,picture,name} = value
                    const redisConnection = redis.getRedisConnection() as IORedis
                    const exposedUID = await redisConnection.hget('users',email)
                    let cookieContent
                    if(exposedUID){
                        cookieContent = {
                            'uid':exposedUID,
                            email
                        }
                    } else {
                        const uid = uuidv4().split('-').join('')
                        const user : DevBlogType.user = {
                            email : email,
                            name : name,
                            profile : picture,
                            uid : uid
                        }
                        AddTask('adduser',user)
                        cookieContent = {
                            uid,
                            email
                        }
                    }
                    const {cookieName,cookie,cookieOption} = SetCookie(cookieContent)
                    res.cookie(cookieName,cookie,cookieOption)
                    Logger.success(`[${email}] is logged in`)
                    const thisRes = new DevBlogResponse('you are logged in!',null)
                    HandleResponse(thisRes,res)
                    
                } else {
                    Logger.info(error.message)
                    Logger.error(error.message)
                    const thisRes = new DevBlogResponse('bad credential!',null,400)
                    HandleResponse(thisRes,res)
                }
        } else {
            Logger.info(loginInfo.error.message)
            Logger.error(loginInfo.error.message)
            const thisRes = new DevBlogResponse('bad credential!',null,400)
            HandleResponse(thisRes,res)
        }
    }
    catch(err){
        Logger.info(err.message)
        Logger.error(err.message)
        throw new Error(err)
    }
}