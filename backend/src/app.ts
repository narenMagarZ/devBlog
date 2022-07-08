import express,{json,urlencoded} from 'express'
import cors from 'cors'


function BuildApp(){
    const app = express()
    app.use(json())
    app.use(urlencoded({extended:true}))
    app.use(cors())
    app.set('trust proxy',1)
    app.use((err,req,res,next)=>{
        // this is for err routes
        next()
    })
    return app
}
export default BuildApp()