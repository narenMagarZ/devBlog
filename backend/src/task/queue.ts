import {Queue} from 'bullmq'
import type IORedis from 'ioredis'

const {QUEUE_NAME } = process.env
let job_queue : Queue
export function InitJobQueue(redisConnection:IORedis){
    if(job_queue || !redisConnection) 
    return
    job_queue = new Queue(QUEUE_NAME as string,{
        connection:redisConnection,
        defaultJobOptions:{
            removeOnComplete:true,
            removeOnFail:true,
            attempts:3
        }
    })
    
}

export async function AddTask(taskName:string,task:any):Promise<void>{
    if(!job_queue) return
    await job_queue.add(taskName,task)
}
