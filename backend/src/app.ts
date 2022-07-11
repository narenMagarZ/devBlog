import express,{json,NextFunction,urlencoded,Request,Response} from 'express'
import cors from 'cors'
import router from './api'
import { middleware } from './middlewares'
import cookieParser from 'cookie-parser'
import ErrorHandlingMiddleware from './middlewares/error'
function App(){
    const app = express()
    app.use(json())
    app.use(urlencoded({extended:true}))
    app.set('trust proxy',1)
    app.use(cors())
    app.use(cookieParser(process.env.COOKIE_SECRET as string))
    const {AuthenticateRequest} = middleware
    app.use(AuthenticateRequest)
    app.use('/api',router)
    app.use(ErrorHandlingMiddleware)
    return app
}
export default App()