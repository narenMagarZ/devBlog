import winston,{format} from 'winston'
import { resolve , join} from 'path'
import colors from 'colors'

const PATHTOLOGFOLDER = resolve(__dirname,'../../','./logs')
const MAXLOGSIZE = 10485760

const errorColor = colors.red.bold
const successColor = colors.green.bold
const warningColor = colors.yellow.bold
const infoColor = colors.cyan.bold


const timestampFormat = format.timestamp({
    format:'DD-MMM-YYYY HH:mm:ss.SSS'
})

const simpleOutputFormat = format.printf((log)=>{
    return `${log.timestamp}\t ${log.level} : ${log.message}`
})

const coloredOutputFormat = format.printf((log)=>{
    let color = infoColor
    switch(log.level){
        case "error":
            color = errorColor
            break
        case "success":
            color = successColor
            break
        case "warning":
            color = warningColor
        case "info":
            color = infoColor
        default :
            break
    }
    return `${log.timestamp}\t ${color(log.message)}`

})

const fileFormat = format.combine(timestampFormat,simpleOutputFormat)

const consoleFormat = format.combine(timestampFormat,coloredOutputFormat)


const logger = winston.createLogger({
    levels:{
        error:0,
        warning:1,
        info:2,
        success:3
    },
    transports:[
        new winston.transports.File({
            level:'error',
            filename:join(PATHTOLOGFOLDER,'./error.log'),
            maxsize:MAXLOGSIZE,
            format:fileFormat
        }),
        new winston.transports.File({
            level:'success',
            filename:join(PATHTOLOGFOLDER,'./success.log'),
            maxsize:MAXLOGSIZE,
            format:fileFormat
        }),
        new winston.transports.Console({
            level:'success',
            format:consoleFormat
        })
    ],
    exceptionHandlers:[
        new winston.transports.File({
            filename:join(PATHTOLOGFOLDER,'./exceptions.log'),
            format:fileFormat
        })
    ]
})

const Logger = {
    error:(message:string):winston.Logger => logger.error(message),
    warning:(message:string):winston.Logger => logger.warning(message),
    success:(message:string):winston.Logger => logger.log('success',message),
    info:(message:string):winston.Logger => logger.info(message)
}

// logger.info('i am done with this')


export default Logger