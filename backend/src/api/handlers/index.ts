import Login from "./login"
import DevBlog from './devblog'
import NewPost from "./new"
import { profileHandler } from "./profile"
import {getFileUploadLink} from "./getfileuploadlink"
export const handler = {
    Login,
    DevBlog,
    NewPost,
    profileHandler,
    getFileUploadLink
}