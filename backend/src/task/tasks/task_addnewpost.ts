import * as db from '../../db/mongo/mongo'
import Logger from '../../utils/logger'

export async function AddNewPost(postContent:DevBlogType.User):Promise<void>{
    try{
        console.log(postContent)
        const blogModel = db.getBlog()
        const blog = new blogModel(postContent)
        await blog.save()
        Logger.success('Success to write the user to db')
    }
    catch(err){
        Logger.info(err.message)
        Logger.error(err.message)
        process.exit(1)
    }
}


