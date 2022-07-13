import {Schema} from 'mongoose'


export const articleSchema = new Schema({
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

