import app from './app'
import Logger from './utils/logger'
import * as db from './db/mongo/mongo'
import * as redisClient from './db/redis/redis'
async function BootServer(port:number | string){
    try {
        Logger.info(`Connecting to the database ${process.env.DB_NAME}`)
        await db.connect()
        Logger.success('Connected to the database')

        Logger.info('Connecting to the redis')
        await redisClient.connect()
        if(redisClient.isConnected()){
            Logger.success('Connected to the redis')
        }
        
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