import {Schema} from 'mongoose'
  export  const userSchema = new Schema({
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
