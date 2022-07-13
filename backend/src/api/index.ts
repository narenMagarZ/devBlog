import express from 'express'
import { handler } from './handlers'

const router = express.Router()
const {Login,DevBlog,NewPost,profileHandler} = handler
router.post('/one-tap-login',Login)
router.get('/',DevBlog)
router.get('/profile',profileHandler.getProfile).post('/profile',profileHandler.postProfile)
router.post('/new',NewPost)
export default router