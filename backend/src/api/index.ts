import express from 'express'
import { handler } from './handlers'

const router = express.Router()
const {Login,Signup} = handler
router.post('/login',Login)
router.post('/signup',Signup)

export default router