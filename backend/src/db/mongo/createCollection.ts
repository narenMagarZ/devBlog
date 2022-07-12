import * as db from './mongo'

interface collection {
    creatUser:()=>void
}
export let dbCollection : collection = {
    'creatUser' : ()=>{}
}

dbCollection.creatUser = async function(){
    await db.getDB().createCollection('user')
    await db.getDB().command({
        'collMod':'user',
        'validator':{
            $jsonSchema:{
                "bsonType":'object',
                'required':['name','email','createdAt'],
                "properties":{
                    "name" :{
                        "bsonType":"string"
                    },
                    "email":{
                        "bsonType":"string"
                    },
                    "createdAt":{
                        "bsonType":"string",
                    }
                }
            }
        }
    })
    //     db.getDB().createCollection('user',{
    //      validator : {
    //         $jsonSchema : {
    //             bsonType : 'object',
    //             required : ['name','email','profile','uid'],
    //             properties : {
    //                 name :{
    //                     bsonType : 'string',
    //                     description : 'it must be a string',
    //                 },

    //                 email : {
    //                     bsonType : 'string',
    //                     description : 'it must be a string'
    //                 },
    //                 profile : {
    //                     bsonType : 'string',
    //                     description : "it must be the link or path of profile "
    //                 },
    //                 uid : {
    //                     bsonType : 'string',
    //                     description : 'it must be a string'
    //                 },
    //                 addedAt : {
    //                     bsonType : 'date',
    //                     default : Date.now(),
    //                     description:'it must be a date type'
    //                 }
    //             }
    //         }
    //     }
    // })
}
