import express from 'express'
import { handler } from './handlers'
import { fileUploader } from '../middlewares/fileuploader'
const router = express.Router()
const {Login,DevBlog,NewPost,profileHandler} = handler
router.post('/one-tap-login',Login)
router.get('/',DevBlog)
router.get('/profile',profileHandler.getProfile).post('/profile',profileHandler.postProfile)
router.post('/new',fileUploader.fields([{name:'coverimg',maxCount:1},{name:'embeddedimg'}]),NewPost)
export default router