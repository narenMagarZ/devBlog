import express from 'express'
import getBucketKey from './handler/getbucketkey'

export const router = express.Router()

// here two routes are mentioned 
// one for server to server 
// another for client to server

router.post('/getlink',getBucketKey)
