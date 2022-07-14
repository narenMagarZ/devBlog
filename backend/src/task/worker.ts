import type IORedis from 'ioredis'
import {Job,Worker} from 'bullmq'
import {AddUserToDB} from './tasks/task_adduser'
import { AddNewPost } from './tasks/task_addnewpost'
let worker : Worker

const {QUEUE_NAME} = process.env
export async function InitWorker(redisConnection:IORedis){
    if(worker || !redisConnection) return
    worker = new Worker(QUEUE_NAME as string,async(job:Job)=>{
        const {name,data} = job
        if(name === 'adduser'){
            const user = data as DevBlogType.User
            AddUserToDB(user)
            return 1
        }
        else if(name === 'newpost'){
            const newArticle = data as DevBlogType.Blog
            AddNewPost(data)
            return 1
        }
        return 0
    },{
        autorun:true,
        connection:redisConnection,
    })
}

export const getWorker = () :Worker =>worker

