import {Schema,Model} from 'mongoose'
import * as db from './mongo'


function Tag():Model<any>{
    const tagSchema = new Schema({
    })
    const tag = db.getDB().model('tag',tagSchema)
    return tag
}