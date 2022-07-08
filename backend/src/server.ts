import app from './app'
function BuildServer(port){
    app.listen(port,()=>{

    })
}
const PORT = process.env.PORT || 5000 
BuildServer(PORT)