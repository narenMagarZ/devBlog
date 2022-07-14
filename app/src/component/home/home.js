import './home.css'
import { baseApi } from '../../utils/baseurl'
import { useEffect, useState } from 'react'
import GoogleLogin from '../../utils/googlelogin'
export default function Home(){
    const [isUser,setUser] = useState(null)
    const [article,setArticle] = useState({
        'title' : '',
        'content' : '',
        'coverimg' : '',
        'links' : [],
        'tags' : []
    })
    useEffect(()=>{
        baseApi.get('/').then(res=>{
            console.log(res.data)
            if(res.status === 200 && res.data === 'not okay'){
                    setUser(()=>false)
            }else if(res.status === 200 && res.data !=='not okay') {
                setUser(()=>true)
                const {content} = res.data
                if(typeof content === 'string' && content.length > 0){
                }
                setArticle(()=>res.data)
            }
            // if(res.data === 'done')
            // else setUser(()=>false)

        }).catch(err=>{
            console.error(err)
        })
    },[])
    return(
        <div className='home-wrapper'>
            <div>
           {isUser === false ? <GoogleLogin /> : '' }
           <div className='article-wrapper'>
            <div>
                <img  src={article.coverimg} alt='' />
            </div>
            <h1>{article.title}</h1>
           <div>
            {
                article.tags.length > 0 ? article.tags.map((tag,index)=>{
                    return (
                        <span key={index}>#{tag} </span>
                    )
                }) : ''
            }
           </div>
           <div>
            <p>
                {
                }
            </p>
           </div>
           </div>
            </div>
        </div>
    )
}