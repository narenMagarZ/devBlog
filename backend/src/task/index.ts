import {Job, Queue,Worker} from 'bullmq'
import type IORedis from 'ioredis'
import * as db from '../db/mongo/mongo'
import Logger from '../utils/logger'
let job_queue : Queue
const QUEUE_NAME = 'devblog-tasks'

interface devBlogTask {
    name : string,
    args :any[]
}
export function InitJobQueue(redisConnection:IORedis){
    if(job_queue || !redisConnection) 
    return

    job_queue = new Queue(QUEUE_NAME,{
        connection:redisConnection,
        defaultJobOptions:{
            removeOnComplete:true,
            removeOnFail:true,
            attempts:3
        }
    })
    
}

export async function AddToQueue(taskName:string,task:devBlogTask):Promise<void>{
    if(!job_queue) return
    await job_queue.add(taskName,task)

}
let worker : Worker
export async function InitWorker(redisConnection:IORedis){
    if(worker || !redisConnection) return
    worker = new Worker(QUEUE_NAME,async(job:Job)=>{
        if(job.name === 'adduser'){
            console.log(job.data)
            // AddUserToDb(job.data)
        }
    })
}

interface userInfoObj {
    name:string,
    email:string,
    profile:string,
    uid:string
}
export async function AddUserToDb(userinfo:userInfoObj):Promise<void>{
    try{
       const userCollection = db.getDB().collection('user')
       await userCollection.insertOne(userinfo)
    }catch(err){
        Logger.info(err.message)
        Logger.error(err.message)
    }
}