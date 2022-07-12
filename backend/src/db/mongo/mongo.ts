import {Db, MongoClient,MongoClientOptions} from 'mongodb'
import Logger from '../../utils/logger'

let db : Db
let connected = false
export async function connect():Promise<void> {
    const {
        DB_USERNAME,
        DB_PASSWORD,
        DB_NAME,
        DB_URI
    } = process.env
    if(!DB_NAME){
        throw new Error('No database configuration is provided')
    }
    const connectOptions : MongoClientOptions = {
        connectTimeoutMS : 2000,
        auth : {
            // username:DB_USERNAME,
            // password:DB_PASSWORD
        }
    }
    const mongoClient = new MongoClient( DB_URI as string )
    try {
        await mongoClient.connect()
        db = mongoClient.db(DB_NAME)
        connected = true
        // const ans = db.collection('users')
        // console.log(await ans.findOne({'gmail':'naren@gmail.com'}))
        
    } catch (error:any) {
        Logger.error(error.message)
        Logger.error(
            "failed to connected to database. Exiting with status code 1."
        )
        process.exit(1)
    }

}

export const getDB = ():Db => db
export const isDBConnected = ()=> connected
// db uri = mongodb://[username:password]localhost:27017/dbname