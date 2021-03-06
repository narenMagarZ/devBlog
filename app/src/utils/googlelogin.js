import { baseApi } from "./baseurl"
export default function GoogleLogin(){
    function handleCredentialResponse(res){
        console.log(res)
        const loginObj = {
            'clientId':res.clientId,
            'credential':res.credential
        }
        baseApi.post('/one-tap-login',loginObj,{'headers':{
            
        }}).then(res=>{
            console.log(res)
        }).catch(err=>{
            console.error(err)
        })
    }
    function initGoogleApi(){
        const googleApiPlatformScript = document.createElement('script')
        googleApiPlatformScript.src = "https://accounts.google.com/gsi/client"
        googleApiPlatformScript.onload = ()=>{
            window.google.accounts.id.initialize({
                client_id:'278447342299-h9kf3018umacfckqjmhdrd31abpfm26a.apps.googleusercontent.com',
                callback:handleCredentialResponse,
                // auto_select:true,
                login_uri:'http://localhost:3000/login'
            })
            window.google.accounts.id.prompt((notification)=>{
                console.log(notification)
            })
        }
        document.body.append(googleApiPlatformScript)
        }
        initGoogleApi()
}
