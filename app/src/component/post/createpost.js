import { useEffect, useRef, useState } from 'react'
import './post.css'

export default function CreatePost(){
    let isImgAlreadyPickedUp = useRef(false)
    function PickCoverImage(){
        this.removeEventListener('change',PickCoverImage)
        const coverImgContent = URL.createObjectURL(this.files[0])
        const coverImg = document.getElementById('cover-img')
        coverImg.src = coverImgContent
        coverImg.hidden = coverImg.hidden ? false : false
        const addCoverImgBtn = document.getElementById('cover-img-picker-btn')
        const configureBtnWrapper = document.getElementById('cover-img-configure-wrapper')
        if(!isImgAlreadyPickedUp.current){
            addCoverImgBtn.hidden = true
            configureBtnWrapper.hidden = false
            isImgAlreadyPickedUp.current = true
        } else if(isImgAlreadyPickedUp.current){
        }
    }
    function EmitInputPicker(){
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
                <Tag/>
            </div>
        </div>
    )
}

function BlogTitleWrapper(){
    const title = useRef('')
    function ReadInput(e){
        const titleContent = document.getElementById('title-field')
        if(e.key.length === 1){
            title.current += e.key
        }
        else if(e.key === 'Backspace'){
            setTimeout(()=>{
                if(titleContent.innerText.length === 1 ){
                    title.current = ''
                    if(title.current.length === 0){
                        const titlePlaceholder = document.getElementById('title-placeholder')
                        titlePlaceholder.innerHTML = 'New post title here...'
                    }
                }
            })
            if(title.current.length > 0)
                title.current = title.current.substring(0,title.current.length - 1)
        }
        if(title.current.length > 0){
            const titlePlaceholder = document.getElementById('title-placeholder')
            titlePlaceholder.innerHTML = ''
        }
    }

    return (
        <div id='blog-title-wrapper'>
            <span id='title-placeholder'>New post title here...</span>
            <div onKeyDown={ReadInput}  contentEditable='true' id='title-field'>
            </div>
        </div>
    )
}

function Tag(){
    const [tags,setTag] = useState([])
    const inputText = useRef('')
    const prevInputLen = useRef(0)
    const lastTagPos = useRef(0)
    const lastTagLen = useRef(0)
    function AddTag({target}){
        console.log(target.value)
        const inputTag = target.value
        const isLastValueSpace = inputTag[inputTag.length - 1]
        if(isLastValueSpace === ' '){
            // check if first letter is space
            if(inputText.current.length === 0 && tags.length === 0){
                target.value = ''
            }
            else {
                // then add tags
                inputText.current = inputTag.substring(lastTagPos.current,inputTag.length - 1)
                if(tags.length <5){
                    setTag((tag)=>[...tag,inputText.current])
                    lastTagPos.current = inputTag.length
                }   
            }
        } else {
            inputText.current += inputTag
        }

        if(inputTag.length === 0){
            setTag(()=>[])
            inputText.current = ''
            lastTagPos.current = 0
        }
        if(lastTagPos.current - 1 === inputTag.length && inputTag.length < prevInputLen.current){
            console.log(tags.length,'this is tags.length')
            const lastTag = tags[tags.length - 1]
            console.log(lastTag,'this is lasttag')
            console.log(lastTag)
        }
        prevInputLen.current = inputTag.length
        console.log(lastTagPos.current,inputTag.length)

    }
    useEffect(()=>{
        console.log(tags)
    },[tags])
    return(
        <div id='tag-wrapper'>
            <div id='tag-field-wrapper'></div>
            <input onChange={AddTag} placeholder='Add up to 5 tags...' id='tag-field' />
        </div>
    )
}