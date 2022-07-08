import app from './app'
import Logger from './utils/logger'
import * as db from './db/mongo/mongo'
async function BuildServer(port:number | string){
    try {
        Logger.info(`Connecting to the database ${process.env.DB_NAME}`)
        await db.Connect()
        Logger.success('Connected to the database')
        app.listen(port,()=>{
            Logger.success(`API server listening to port ${port}`)
        })
        
    } catch (error) {
        
    }
}
const PORT = process.env.PORT || 5000 
BuildServer(PORT)