import {Schema,Model} from 'mongoose'
import * as db from './mongo'


function Article():Model<any> {
    const articleSchema = new Schema({
    })
    const article = db.getDB().model('article',articleSchema)
    return article
}