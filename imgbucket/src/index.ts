import express from 'express'
import fs from 'node:fs'
import path from 'node:path'
import multer from 'multer'


function ImgBucket(){
    const app = express()
    const bucketPort = process.env.PORT || 7777
    app.listen(bucketPort,()=>{
        console.log('server is listening on port',bucketPort)
    })
}

ImgBucket()