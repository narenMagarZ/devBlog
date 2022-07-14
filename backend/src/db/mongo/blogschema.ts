import {Schema} from 'mongoose'


export const blogSchema = new Schema({
        'title' : {
            type : String,
            required : true
        },
        'email' : {
            type : String,
            required : true
        },
        'organization' :{
            type : String,
            required : true
        },
        'tags' : {
            type : String,
            default : ''
        },
        'postid' : {
            type : String,
            required : true
        },
        'postedat' : {
            type : Date,
            required : true,
            default : Date.now
        },
        'content' : {
            type : String,
            default : '',
            required : true
        },
        'originalname' : {
            type : String,
            required : true
        },
        'filesize' : {
            type : Number,
            required : true
        },
        'filename' : {
            type : String,
            required : true
        },
        'mimetype' : {
            type : String,
            required : true
        },
        'path' : {
            type : String,
            required : true
        },
        'likes' :{
            type : Number,
            default : 0
        },
        'uid' : {
            type : String,
            ref : 'user',
            required : true
        }
    })

