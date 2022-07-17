import express from 'express'
import fs from 'node:fs'
import path from 'node:path'
import multer from 'multer'
import {router} from './route'
import { Logger } from './utils/logger'

function ImgBucket(){
    Logger.info('Starting the server...')
    const app = express()
    const bucketPort = process.env.PORT || 7777
    app.use('/imgbucket',router)
    app.listen(bucketPort,()=>{
        Logger.info(`Server is listening on port ${bucketPort}`)
    })
}

ImgBucket()