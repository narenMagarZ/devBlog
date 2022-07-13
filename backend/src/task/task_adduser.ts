import * as db from '../db/mongo/mongo'
import Logger from '../utils/logger'
import {getRedisConnection} from '../db/redis/redis'

export async function AddUserToDB(user:DevBlogType.user):Promise<void>{
    try{
        console.log(user)
        const userModel = db.getUser()
        const thisUser = new userModel(user)
        await thisUser.save()
        await getRedisConnection()?.hset('user',user.email,user.uid)
        Logger.success('Success to write the user to db')
    }
    catch(err){
        Logger.info(err.message)
        Logger.error(err.message)
        process.exit(1)
    }
}


