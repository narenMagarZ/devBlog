import type IORedis from 'ioredis'
import {Job,Worker} from 'bullmq'
import {AddUserToDB} from './addusertask'
let worker : Worker

const {QUEUE_NAME} = process.env
export async function InitWorker(redisConnection:IORedis){
    if(worker || !redisConnection) return
    worker = new Worker(QUEUE_NAME as string,async(job:Job)=>{
        const {name,data} = job
        if(name === 'adduser'){
            const user = data as DevBlogType.user
            AddUserToDB(user)
            return 1
        }
        return 0
    },{
        autorun:true,
        connection:redisConnection,
    })
}

export const getWorker = () :Worker =>worker

