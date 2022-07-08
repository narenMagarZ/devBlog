import express,{json,NextFunction,urlencoded,Request,Response} from 'express'
import cors from 'cors'


function BuildApp(){
    const app = express()
    app.use(json())
    app.use(urlencoded({extended:true}))
    app.use(cors())
    app.set('trust proxy',1)
    app.use((err:Error,req:Request,res:Response,next:NextFunction)=>{
        next()
    })
    return app
}
export default BuildApp()