import Logger from '../../utils/logger'
import mongoose,{Connection, Model} from 'mongoose'
import {userSchema} from '../mongo/userschema'
import {blogSchema} from './blogschema'
let db : Connection
let user : Model<any>
let blog : Model<any>
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
        user = db.model('user',userSchema)
        blog = db.model('blog',blogSchema)
        connected = true
    } catch (error:any) {
        Logger.error(error.message)
        Logger.error(
            "failed to connected to database. Exiting with status code 1."
        )
        process.exit(1)
    }

}

export const getDB = () => db
export const getUser = ()=> user
export const isDBConnected = ()=> connected
export const getBlog = ()=> blog