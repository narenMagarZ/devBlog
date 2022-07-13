import {Schema,Model} from 'mongoose'
import * as db from './mongo'

export function User():Model<any>{
    const userSchema = new Schema({
        'name' : {
            type:String,
            required:true,
        },
        'email' : {
            type:String,
            required:true,
            unique:true
        },
        'profile' : {
            type : String,
            required : true
        },
        'uid' : {
            type : String ,
            required : true,
            unique : true
        },
        'favourite' : {
            type  : [{
                type : String,
                unique : true
            }]
        },
        'bio' : {
            type : String,
            default :''
        },
        'createdat' : {
            type : Date,
            default : Date.now,
        },
        'link' : {
            type : [{
                type : String
            }]
        }
    })
    const user = db.getDB().model('user',userSchema)
    return user
}

