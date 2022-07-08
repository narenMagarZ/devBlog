import express,{json,NextFunction,urlencoded,Request,Response} from 'express'
import cors from 'cors'
import router from './api'
import { middleware } from './middlewares'
function App(){
    const app = express()
    app.use(json())
    app.use(urlencoded({extended:true}))
    app.use(cors())
    app.set('trust proxy',1)
    const {AuthenticateRequest} = middleware
    app.use(AuthenticateRequest)
    app.use('/api',router)
    app.use((err:Error,req:Request,res:Response,next:NextFunction)=>{
        next()
    })
    return app
}
export default App()