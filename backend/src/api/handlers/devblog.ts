import {Response,NextFunction} from 'express'
import Logger from '../../utils/logger'
import * as db from '../../db/mongo/mongo'
export default async function DevBlog(req:DevBlogType.Request,res:Response,next:NextFunction){
    try{
        const {email,uid} = req
        if(email && uid) {
            const user = db.getUser()
            const requestedUser = await user.findOne({'uid':uid}).exec()
            console.log(requestedUser)
            const testcontent = {
                'title' : 'Simple Http server on nodejs ',
                'coverimg' : 'https://res.cloudinary.com/practicaldev/image/fetch/s--_QMQU86---/c_imagga_scale,f_auto,fl_progressive,h_420,q_auto,w_1000/https://dev-to-uploads.s3.amazonaws.com/i/6dnng3pre04xxdebia1g.png',
                'links' : ['www.nodejs.org','www.npmpackage.com'],
                'content' : `
                I will show you how to set up a Rest API with Node and Express. I hope you can learn something from this tutorial at [](www.nodejs.org) and I can learn something with your feedback.
                REST, or REpresentational State Transfer, is an architectural style for providing standards between computer systems on the web,
                making it easier for systems to communicate with each other. REST-compliant systems, often called RESTful systems, 
                are characterized by how they are stateless and separate the concerns of client and server.
                We will go into what these terms mean and why they are beneficial characteristics for services on the Web.
                `,
                'tags' : ['nodejs','express','python']
            }
            return res.json(testcontent)
        } else {
            res.end('not okay')
        }
    }
    catch(err){
        Logger.error(err.message)
    }
}