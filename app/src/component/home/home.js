import './home.css'
import { baseApi } from '../../utils/baseurl'
import { useEffect } from 'react'
export default function Home(){
    useEffect(()=>{
        baseApi.get('/').then(res=>{
            console.log(res)
        }).catch(err=>{
            console.error(err)
        })
    },[])
    return(
        <div className='home-wrapper'>
            <div>
                
            </div>
        </div>
    )
}