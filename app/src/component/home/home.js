import './home.css'
import { baseApi } from '../../utils/baseurl'
import { useEffect, useState } from 'react'
import GoogleLogin from '../../utils/googlelogin'
export default function Home(){
    const [isUser,setUser] = useState(null)
    useEffect(()=>{
        baseApi.get('/').then(res=>{
            console.log(res.headers)
            const {isauthenticated} = res.headers
            console.log(isauthenticated)
            if(typeof isauthenticated !== 'undefined')
                setUser(()=>true)

        }).catch(err=>{
            console.error(err)
        })
    },[])
    return(
        <div className='home-wrapper'>
            <div>
           {isUser === false ? <GoogleLogin /> : '' }
            </div>
        </div>
    )
}