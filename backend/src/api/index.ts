import express from 'express'
import { handler } from './handlers'
import DevBlog from './handlers/devblog'

const router = express.Router()
const {Login} = handler
router.post('/one-tap-login',Login)
router.get('/',DevBlog)
export default router