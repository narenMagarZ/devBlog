import Logger from '../../utils/logger'
import mongoose,{Connection} from 'mongoose'
let db : Connection
let connected = false
export async function connect():Promise<void> {
    const {
        DB_USERNAME,
        DB_PASSWORD,
        DB_NAME,
        DB_URI
    } = process.env
    if(!DB_NAME || !DB_URI){
        throw new Error('No database configuration is provided')
    }
    try {
        db =  mongoose.createConnection(DB_URI as string)
        connected = true
        
    } catch (error:any) {
        Logger.error(error.message)
        Logger.error(
            "failed to connected to database. Exiting with status code 1."
        )
        process.exit(1)
    }

}

export const getDB = ():Connection => db
export const isDBConnected = ()=> connected
// db uri = mongodb://[username:password]localhost:27017/dbname