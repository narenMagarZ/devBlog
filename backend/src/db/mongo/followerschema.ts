import {Schema} from 'mongoose'
export const followerSchema = new Schema({
        'uid' : {
            type : Schema.Types.ObjectId,
            ref : 'user'
        },
        'follwerid' : {
            type : Schema.Types.ObjectId,
            ref : 'user'
        }
    })