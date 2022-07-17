import Winston from 'winston'
import {resolve,join} from 'node:path'
import colors from 'colors'


const PATHTOLOG = resolve(__dirname,'../','../','./logs')
const normalColor = colors.blue.bold

const timestampFormat = Winston.format.timestamp({
    format:'DD-MMM-YYYY HH:mm:ss.SSS'
})

const coloredFormat = Winston.format.printf((log)=>{
    let color = normalColor
    switch(log.level){
        case "error":
            color = colors.red.bold
            break
        case "success":
            color = color.green.bold
            break
        case "warning":
            color = color.yellow.bold
        case "info":
            color = normalColor
            break
        
    }
    return `${log.timestamp}\t${log.level} : ${log.message}`
})
const simpleFormat = Winston.format.printf((log)=>{
    return `${log.timestamp}\t${log.level} : ${log.message}`
})

const consoleFormat = Winston.format.combine(timestampFormat,coloredFormat)
const fileFormat = Winston.format.combine(timestampFormat,simpleFormat)
const logger = Winston.createLogger({
    levels:{
        error:0,
        warning:1,
        success:2,
        info:3
    },
    transports: [
        new Winston.transports.File({
            level:'error',
            filename:join(PATHTOLOG,'./error.log'),
            format:fileFormat
        }),
        new Winston.transports.File({
            level:'success',
            filename:join(PATHTOLOG,'./success.log'),
            format:fileFormat
        }),
        new Winston.transports.Console({
            level:'success',
            format:consoleFormat
        }),
    ],
    exceptionHandlers:[
        new Winston.transports.File({
            filename:join(PATHTOLOG,'./exception.log'),
            format:fileFormat
        })
    ]
})

export const Logger = {
    error : (message:string)=>logger.error(message),
    warn : (message:string)=>logger.warn(message),
    info : (message:string)=>logger.info(message),
    success : (message:string)=>logger.log('success',message)
}
