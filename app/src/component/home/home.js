import './home.css'
import { baseApi } from '../../utils/baseurl'
import { useEffect, useState } from 'react'
import GoogleLogin from '../../utils/googlelogin'
export default function Home(){
    const [isUser,setUser] = useState(null)
    useEffect(()=>{
        baseApi.get('/').then(res=>{
            if(res.data === 'done')
                setUser(()=>true)
            else setUser(()=>false)

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