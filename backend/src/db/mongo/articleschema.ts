import {Schema,Model} from 'mongoose'
import * as db from './mongo'


export function Article():Model<any> {
    const articleSchema = new Schema({
        'title' : {
            type : String,
            required : true
        },
        'postedby' : {
            type : Schema.Types.ObjectId,
            ref : 'user'
        },
        'postedat' : {
            type : Date,
            default : Date.now
        },
        'coverimagepath' : {
            type : String,
            default : ''
        },
        'likes' :{
            type : Number,
            default : 0
        }
    })
    const article = db.getDB().model('article',articleSchema)
    return article
}

