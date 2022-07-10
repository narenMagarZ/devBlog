import { useEffect, useRef, useState } from 'react'
import './post.css'

export default function CreatePost(){
    useEffect(()=>{
        document.title = "New Post-devBlog"
    },[])
    let isImgAlreadyPickedUp = useRef(false)
    function PickCoverImage(){
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
                <TextEditorFieldController />
                <TextEditor/>
            </div>
            <PublishPost/>
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
    const tags = useRef([])
    let tagEntered = useRef('')
    const tapToRemovedTag = useRef(null)
    const tagBg = ['#CADFF2','#B8EFDF','#F2CAF0','#D8E8C5','#BCD8EB','#EBDFBC','#E1CCED','#EDCCE4']
    function random(){
        return Math.floor(Math.random() * tagBg.length)
    }
    function RemoveTag(ev){
        tapToRemovedTag.current = ev.target.parentNode
        if(tapToRemovedTag.current){
            console.log(tapToRemovedTag.current)
            const tagName = tapToRemovedTag.current.innerText.split('#')[1].split('×')[0].trim()
            for(let i = 0 ; i < tags.current.length ; i ++){
                if(tags.current[i] === tagName){
                    tags.current.splice(i,1)
                    break
                } 
            }
            const tagField = document.getElementById('tag-field')
            tagField.value = ''
            if(tags.current.length > 0){
                tagField.placeholder = 'Add another'
            } else tagField.placeholder = 'Add up to 5 tags...'
            document.getElementById('tag-space-wrapper').removeChild(tapToRemovedTag.current)
        }
    }
    function CreateTag(ev){
        if(ev.key.length === 1){
            if(ev.key === ' ' && tags.current.length < 5){
                let parseTag = tagEntered.current
                const tagWrapper = document.getElementById('tag-field-wrapper')
                const tag = document.createElement('div')
                tag.id = 'tag-btn'
                tag.style.background = tagBg[random()]
                const cancelBtn = document.createElement('button')
                cancelBtn.addEventListener('click',RemoveTag)
                cancelBtn.id = 'cancel-btn'
                const hashTag = document.createElement('span')
                const tagName = document.createElement('span')
                tagName.innerText = parseTag 
                hashTag.innerText = '#'
                cancelBtn.innerHTML = '×'
                tag.appendChild(hashTag)
                tag.appendChild(tagName)
                tag.appendChild(cancelBtn)
                tagWrapper.insertAdjacentElement('beforebegin',tag)
                ev.target.value = ''
                tagEntered.current = ''
                tags.current = [...tags.current,parseTag]

            } else if(tags.current.length === 5){ 
                ev.target.placeholder = ''               
            }
             else {
                tagEntered.current += ev.key
            }
        } 
    }

    useEffect(()=>{
        console.log(tags)
    },[tags])
    return(
        <div id='tag-space-wrapper'>
            <div id='tag-field-wrapper'>
                <input id='tag-field' placeholder='Add up to 5 tags...' onKeyDown={CreateTag} />
            </div>
        </div>
    )
}

function TextEditorFieldController(){
    const btnType = [
        {'id':'bold','encloser':'****','context':'Bold','curPosHelper':2},
        {'id':'italic','encloser':'__','context':'Italic','curPosHelper':1},
        {'id':'link','encloser':'[](url)','context':'Link','curPosHelper':4},
        {'id':'ordered list','encloser':'1. ','context':'Ordered list','curPosHelper':0},
        {'id':'unordered list','encloser':'- ','context':'Unordered list','curPosHelper':0},
        {'id':'heading','encloser':'## ','context':'Heading','curPosHelper':0},
        {'id':'quote','encloser':'> ','context':'Quote','curPosHelper':0},
        {'id':'< >','encloser':'``','context':'Code','curPosHelper':1},
        {'id':'upload image','encloser':'','context':'Upload image','curPosHelper':0}
    ]

    return(
        <div className='text-editor-field-controller'>
            <div id='editor-control-box'>
                {
                    btnType.map((btn,index)=>{
                        return <ControllerButton key={index} curPosHelper={btn.curPosHelper} encloser={btn.encloser} context={btn.context} id={btn.id}></ControllerButton>
                    })
                }
            </div>
        </div>
    )
}

function ControllerButton({id,encloser,context,curPosHelper}){

    const icon =  id !== '< >' ?  id[0].toUpperCase() : "< >"
    function ActivateControlAction(ev){
        const textArea = document.getElementById('text-area')
        textArea.value = textArea.value + encloser
        textArea.selectionStart = textArea.value.length - curPosHelper
        if(id === 'link'){
        textArea.selectionEnd = textArea.value.length - 1
        } else textArea.selectionEnd = textArea.value.length - curPosHelper
        console.log(textArea.selectionStart)
        textArea.focus()
    }
    function UnHideBtnDefiner(ev){
        console.log(ev.target.previousElementSibling)
        const controllerDefiner = ev.target.previousElementSibling
        controllerDefiner.hidden = false
    }
    function HideBtnDefiner(ev){
        console.log(ev.target.previousElementSibling)
        const controllerDefiner = ev.target.previousElementSibling
        controllerDefiner.hidden = true
    }
    return(
        <div id='control-btn-wrapper'>
            <span hidden id='control-btn-definer'>
                {context}
            </span>
            <button id='control-btn' onMouseLeave={HideBtnDefiner} onMouseEnter={UnHideBtnDefiner} onClick={ActivateControlAction} >{icon}</button>
        </div>
    )
}


function TextEditor(){
    function TrackInputKey(ev){
        const startPos = ev.target.selectionStart
        const endPos = ev.target.selectionEnd
        console.log(startPos,endPos,'these are starpos and endpos')
        if(ev.key === 'Enter'){
            console.log('you just enterd enter')
        }

    }
    return(
        <div className='text-editor-wrapper'>
            <textarea onKeyDown={TrackInputKey} placeholder='write your post content here...' id='text-area'></textarea>
        </div>
    )
}

function PublishPost(){
    return(
        <div className='publish-post-btn-wrapper'>
            <button id='publish-btn'>Publish</button>
        </div>
    )
}