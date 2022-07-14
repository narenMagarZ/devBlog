export default function ExtractLink(text){
    let to = ''
    if(typeof text === 'string'){
        for(let i = 0 ; i < text.length ; i ++){
            to = ''
            let newLink = ''
            if(text[i] === '<' && text[i+1] === 'a') {
                let isOpenTagClosed = false
                let isClosedTagOpened = false
                for(let j = i ; j < text.length ; j++){
                    if(text[j] === '>' && !isOpenTagClosed){
                        isOpenTagClosed = true
                    }
                    else if(text[j] === '<' && isOpenTagClosed){
                        isOpenTagClosed = false
                        isClosedTagOpened = true
                    }
                
                    else if(isOpenTagClosed && !isClosedTagOpened){
                        to += text[j]
                    }
                    newLink += text[j]
                    if(text[j] === '>' && isClosedTagOpened){
                        break
                    }
                    i = j
                }
                const tempLink = newLink
                newLink = newLink.slice(0,2) + ` href = "${to}"` + newLink.slice(2,newLink.length)
                text = text.replace(tempLink,newLink)
            }

        }

    }
    return text
}
