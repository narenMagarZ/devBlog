import { NextFunction , Response } from "express";
import * as db from "../../db/mongo/mongo";
import DevBlogError from "../../utils/error";
import joi from "joi";
import {decode} from 'jsonwebtoken'
import {decodedJwtSchema} from '../schema/decodedjwtschema'
import * as redis from '../../db/redis/redis'
import type IORedis from "ioredis";
import {DevBlogResponse} from "../../utils/devblogresponse";
import Logger from "../../utils/logger";
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
                    const {email} = value
                    // first check the user existence in redis
                    const redisConnection = redis.getRedisConnection() as IORedis
                    const isEmailExist = await redisConnection.hget('users',email)
                    if(isEmailExist){
                        return new DevBlogResponse('you are logged in!')
                    } else {
                        // then insert into the db
                        
                        res.end('done')
                    }
                    // db.getDB().collection('users')
                    
                } else {
                    Logger.info(error.message)
                    Logger.error(error.message)
                    throw new DevBlogError(400,'bad credential')
                }
        } else {
            Logger.info(loginInfo.error.message)
            Logger.error(loginInfo.error.message)
            return next(new DevBlogError(400))
        }
    }
    catch(err){
        Logger.info(err.message)
        Logger.error(err.message)
    }
}