import express from 'express'
import { handler } from './handlers'

const router = express.Router()
const {Login} = handler
router.post('/one-tap-login',Login)

export default router