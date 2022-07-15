import './home.css'
import { baseApi } from '../../utils/baseurl'
import { useEffect, useReducer, useState } from 'react'
import ExtractLink from '../../utils/extracthtml'
import GoogleLogin from '../../utils/googlelogin'
import htmlParser from 'html-react-parser'
export default function Home(){
    const [isUser,setUser] = useState(null)    
    const prevBlogs = [{
        'title' : '',
        'tags' : [],
        'content' : '',
        
    }]
    const blogReducer = (initialState,{type,paylaod})=>{
        switch(type){
            case "SETBLOGPOST":
                let blogContent = []
                for(let i of paylaod){
                    const parsedContent = ExtractLink(i.content)
                    const parsedTag = i.tags.split(',')
                    i = {...i,'content':parsedContent,'tags':parsedTag}
                    blogContent.push(i)
                }
                return blogContent
            default :
                return {...initialState}
        }
    }
    const [blogs,dispatchBlog] = useReducer(blogReducer,prevBlogs)
    useEffect(()=>{
        baseApi.get('/').then(res=>{
            console.log(res.data)
            if(res.status === 200 && res.data === 'not okay'){
                    setUser(()=>false)
            }else if(res.status === 200 && res.data !=='not okay') {
                setUser(()=>true)
                dispatchBlog({
                    type:'SETBLOGPOST',
                    paylaod:res.data
                })
            }

        }).catch(err=>{
            console.error(err)
        })
    },[])
    useEffect(()=>{
        console.log(blogs)
    },[blogs])
    return(
        <div className='home-wrapper'>
            <div>
           {isUser === false ? <GoogleLogin /> : '' }
           <div className='blog-wrapper'>
            {
                blogs.length > 0 ? blogs.map((blog,index)=>{
                    return (
                        <div className='blog' key={index}>
                            <img src='' alt='' />
                            <div>
                                <h1>{blog.title}</h1>
                            </div>
                            <div>
                                {
                                blog.tags.map((tag,i)=>{
                                    return (
                                        <button key={i}>{tag}</button>
                                    )
                                }
                                
                                )}
                            </div>
                            <div>
                                {htmlParser(blog.content)}
                                </div>
                            </div>
                    )
                }) : ''
            }
           </div>
            </div>
        </div>
    )
}