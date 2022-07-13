import {Schema,Model} from 'mongoose'
import * as db from './mongo'


export function Follower():Model<any> {
    const followerSchema = new Schema({
        'uid' : {
            type : Schema.Types.ObjectId,
            ref : 'user'
        },
        'follwerid' : {
            type : Schema.Types.ObjectId,
            ref : 'user'
        }
    })
    const follower = db.getDB().model('follower',followerSchema)
    return follower
}