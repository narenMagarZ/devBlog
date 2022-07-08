import app from './app'
import Logger from './utils/logger'
function BuildServer(port:number | string){
    app.listen(port,()=>{
        Logger.success(`API server listening to port ${port}`)
    })
}
const PORT = process.env.PORT || 5000 
BuildServer(PORT)