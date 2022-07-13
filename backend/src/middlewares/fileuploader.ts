import multer,{diskStorage} from 'multer'
import {resolve} from 'node:path'
import {v4 as uuidv4} from 'uuid'

const fileStorage = diskStorage({
    destination(_req:DevBlogType.Request,_file,cb){
            const destinationDir = resolve(__dirname,'../','./uploadfiles')
            cb(null,destinationDir)
    },
    filename(_req:DevBlogType.Request,file,cb){
        const fileOriginalName = file.originalname.split(' ').join('')
        const fileName = uuidv4().split('-').join('') + '-' + fileOriginalName
        cb(null,fileName)
    }
})
export const fileUploader = multer({storage:fileStorage,fileFilter:function(_req,file,cb){
    if(file.originalname.match(/\.(jpeg|jpg|png|gif)$/)){
        return cb(null,true)
    } else {
        return cb(null,false)
    }
}})
