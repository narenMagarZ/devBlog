import { useEffect, useReducer } from 'react'
import { useLocation } from 'react-router'
import { baseApi } from '../../utils/baseurl'
import './openblog.css'

export default function ReadBlog(){
    const location = useLocation()
    const initialBlogContent = {
        'blogTitle' : 'What is Deno',
        'coverImg' : 'https://res.cloudinary.com/practicaldev/image/fetch/s--vO_muh2a--/c_imagga_scale,f_auto,fl_progressive,h_420,q_auto,w_1000/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/s4rykg32xnqkbo8155be.png',
        'postedby' : 'Naren magar',
        'postedAt' : Date(Date.now),
        'tags' : ['nodejs','deno','javascript'],
        'content' : "Luca Casonato: So look back at Node and tried to reflect on everything that went wrong with Node and tried to fix everything that was wrong with Node. What came outta that is Deno and Deno tries to be like a JavaScript runtime, but also a TypeScript runtime, because that's very popular at this point, have TypeScript built in, it's much more fully integrated, like batteries included like other modern languages, like Rust and Go where they have like formatters and linters and testing frameworks, benchmarking, dependency management, all that built in, into the mm-hmm like as one integrated system."
    }
    const blogReducer = (state,{type,payload})=>{
        switch(type){
            case "SETBLOGCONTENT":
                return payload
            default :
                return {...state}
        }
    }
    const [blog,dispatchBlog] = useReducer(blogReducer,initialBlogContent)
    useEffect(()=>{
        const paths = location.pathname.split('/')
        const endPoint = `/${paths[1]}/?blogid=${paths[2]}`
        baseApi.get(endPoint).then(res=>{
            console.log(res)
        }).catch(err=>{
            console.error(err)
        })    
    },[])
    return (
        <div className='open-blog-wrapper'>
            <Blog  blogContent = {blog}/>
            <Profile />
        </div>
    )
}



function Blog({blogContent}){
    console.log(blogContent)
    const {blogTitle,coverImg,postedAt,postedby,content,tags} = blogContent
    return (
        <div className='blog-post-wrapper'>
            <div className='post-activity-wrapper'>
                
            </div>
            <div className='blog-post'>
                <div>
                    <img alt='' src={coverImg} />
                    <div>
                        <img alt='' />
                        <div>
                            <b>
                                {postedby}
                            </b>
                            <span>
                                Posted on {postedAt}
                            </span>
                        </div>
                    </div>
                        <div>
                            <h1>
                                {blogTitle}
                            </h1>
                            <div>
                                {/* this is for tags */}
                                {
                                    tags.map((tag,index)=>{
                                        return (
                                            <button key={index}>{tag}</button>
                                        )
                                    })
                                }
                            </div>
                        </div>
                        <div className='blog-content-wrapper'>
                            {content}
                        </div>
                </div>
            </div>
        </div>
    )
}


function Profile(){
    return(
        <div className='profile-wrapper'>

        </div>
    )
}