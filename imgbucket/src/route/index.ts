import express from 'express'
import getLink from './handler/gelink'

export const router = express.Router()

// here two routes are mentioned 
// one for server to server 
// another for client to server

router.post('/getlink',getLink)
router.post('/uploadcoverimage')
