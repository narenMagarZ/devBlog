import IORedis from "ioredis";
import Logger from "../../utils/logger";

let redisConnection : IORedis
let isRedisConnected : boolean = false
const {REDIS_URI} = process.env
export async function connect() : Promise<void> {
    if(isRedisConnected) return
    redisConnection = new IORedis(REDIS_URI as string,{
        lazyConnect:true
    })
    try{
       await redisConnection.connect()
       isRedisConnected = true
    }catch(err:any){
        Logger.info('Failed to connect to the redis. Exiting with status code 1.')
        Logger.error(err.message)
        throw new Error(err)
        // process.exit(1)
    }
}


export const isConnected = () : boolean =>{
    return isRedisConnected
}


export const getRedisConnection = () : IORedis | undefined => {
    if(!redisConnection) return redisConnection
    return undefined
}