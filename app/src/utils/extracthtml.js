export default function ExtractLink(text){
    let newText = replaceAll(text)
    let to = ''
    if(typeof newnewText === 'string'){
        for(let i = 0 ; i < newText.length ; i ++){
            to = ''
            let newLink = ''
            if(newText[i] === '<' && newText[i+1] === 'a') {
                let isOpenTagClosed = false
                let isClosedTagOpened = false
                for(let j = i ; j < newText.length ; j++){
                    if(newText[j] === '>' && !isOpenTagClosed){
                        isOpenTagClosed = true
                    }
                    else if(newText[j] === '<' && isOpenTagClosed){
                        isOpenTagClosed = false
                        isClosedTagOpened = true
                    }
                
                    else if(isOpenTagClosed && !isClosedTagOpened){
                        to += newText[j]
                    }
                    newLink += newText[j]
                    if(newText[j] === '>' && isClosedTagOpened){
                        break
                    }
                    i = j
                }
                const tempLink = newLink
                newLink = newLink.slice(0,2) + ` href = "${to}"` + newLink.slice(2,newLink.length)
                newText = newText.replace(tempLink,newLink)
            }

        }

    }
    return newText
}

function replaceAll(str){
    if(!/\r|\n/.exec(str)) return str
    const newStr = str.replace(/\r|\n/.exec(str),'<br/>')
    return replaceAll(newStr)
}
