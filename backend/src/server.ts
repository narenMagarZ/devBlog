import app from './app'
import Logger from './utils/logger'
import * as db from './db/mongo/mongo'
import * as redisClient from './db/redis/redis'
import { InitJobQueue} from './task/queue'
import {InitWorker} from './task/worker'
import type IORedis from 'ioredis'
import {QueueEvents} from 'bullmq'
async function BootServer(port:number | string){
    try {
        Logger.info(`Connecting to the database ${process.env.DB_NAME}`)
        await db.connect()
        Logger.success('Connected to the database')
        Logger.info('Connecting to the redis')
        await redisClient.connect()
        if(redisClient.isConnected()){
            Logger.success('Connected to the redis')

            const redisConnection = redisClient.getRedisConnection() as IORedis
            Logger.info('Initializing the task queue...')
            InitJobQueue(redisConnection)
            Logger.success('Success to initialize task queue')

            Logger.info('Initializing the worker...')
            await InitWorker(redisConnection)
            Logger.success('Success to initialize worker')
        }
        const {QUEUE_NAME} = process.env
        const taskEvent = new QueueEvents(QUEUE_NAME as string)
        taskEvent.on('error',(err)=>{
            Logger.info(err.message)
            Logger.error(err.message)
        })
        taskEvent.on('completed',({jobId,returnvalue},_id)=>{
            Logger.success(`Task-id[${jobId}]: has been completed`)
        })

    } catch (error:any) {
        Logger.error('Failed to boot the server')
        Logger.error(error)
        return process.exit(1)
    }
    app.listen(port,()=>{
        Logger.success(`API server listening to port ${port}`)
    })
}
const PORT = process.env.PORT || 5000 
BootServer(PORT)