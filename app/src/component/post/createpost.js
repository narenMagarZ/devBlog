import { useRef, useState } from 'react'
import './post.css'

export default function CreatePost(){
    let isImgAlreadyPickedUp = useRef(false)
    function PickCoverImage(ev){
        this.removeEventListener('change',PickCoverImage)
        const coverImgContent = URL.createObjectURL(this.files[0])
        const coverImg = document.getElementById('cover-img')
        coverImg.src = coverImgContent
        coverImg.hidden = false
        const addCoverImgBtn = document.getElementById('cover-img-picker-btn')
        const configureBtnWrapper = document.getElementById('cover-img-configure-wrapper')
        if(!isImgAlreadyPickedUp.current){
            addCoverImgBtn.hidden = true
            configureBtnWrapper.hidden = false
            isImgAlreadyPickedUp.current = true
        } else if(isImgAlreadyPickedUp.current){
        }
    }
    function EmitInputPicker(e){
        const coverImgPicker = document.getElementById('cover-img-picker')
        coverImgPicker.addEventListener('change',PickCoverImage)
        coverImgPicker.click()
    }
    function RemoveCoverImg(){
        const coverImg = document.getElementById('cover-img')
        coverImg.src = ''
        coverImg.hidden = true
        const configureBtnWrapper = document.getElementById('cover-img-configure-wrapper')
        const addCoverImgBtn = document.getElementById('cover-img-picker-btn')
        if(isImgAlreadyPickedUp.current){
            configureBtnWrapper.hidden = true
            isImgAlreadyPickedUp.current = false
            addCoverImgBtn.hidden = false
        }
    }

    return(
        <div className='create-post-wrapper'>
            <div className='new-post-space'>
                <div id='cover-img-wrapper'>
                    <input id='cover-img-picker' hidden type='file' accept='image/*' />
                    <img hidden id='cover-img' alt=''/>
                    <button id='cover-img-picker-btn' onClick={EmitInputPicker}>Add a cover image</button>
                    <div hidden id='cover-img-configure-wrapper'>
                        <button id='cover-img-change-btn' onClick={EmitInputPicker} >Change</button>
                        <button onClick={RemoveCoverImg} >Remove</button>
                    </div>
                </div>
                <BlogTitleWrapper/>
            </div>
        </div>
    )
}

function BlogTitleWrapper(){
    const title = useRef('')
    const isAllTitleContentSelected = useRef(false)
    function ReadInput(e){
        console.log(e.key)
        
        if(e.key.length === 1){
            title.current += e.key
        }
        else if(e.key === 'Backspace'){
            title.current = title.current.substring(0,title.current.length - 1)
        }
        if(isAllTitleContentSelected.current){
            if(e.key === 'Backspace') title.current = ''
        }
        console.log(title)
        if(title.current.length > 0){
            const titlePlaceholder = document.getElementById('title-placeholder')
            titlePlaceholder.innerHTML = ''
        } else if(title.current.length === 0) {
            const titlePlaceholder = document.getElementById('title-placeholder')
            titlePlaceholder.innerHTML = 'New post title here...'
        }
    }
    function ReadSelectContent(){
        isAllTitleContentSelected.current = true
    }
    return (
        <div id='blog-title-wrapper'>
            <span id='title-placeholder'>New post title here...</span>
            <div onSelect={ReadSelectContent} onKeyDown={ReadInput}  contentEditable='true' id='title-field'>
            </div>
        </div>
    )
}