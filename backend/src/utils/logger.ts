import winston,{format} from 'winston'
import { resolve , join} from 'path'
// import chalk from 'chalk'
import colors from 'colors'

const PATHTOLOGFOLDER = resolve(__dirname,'../../','./logs')
const MAXLOGSIZE = 10485760

const errorColor = colors.red.bold
const successColor = colors.green.bold
const warningColor = colors.yellow.bold
const infoColor = colors.white


const timestampFormat = format.timestamp({
    format:'DD-MMM-YYYY HH:mm:ss.SSS'
})

const simpleOutoutFormat = format.printf((log)=>{
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
        default :
            break
    }
    return `${log.timestamp}\t ${color(log.message)}`

})

const fileFormat = format.combine(timestampFormat,simpleOutoutFormat)

const consoleFormat = format.combine(timestampFormat,coloredOutputFormat)

const logger = winston.createLogger({
    level:'info',
    format:winston.format.json(),
    transports:[
        new winston.transports.File({
            level:'error',
            filename:join(PATHTOLOGFOLDER,'./error.log'),
            maxsize:MAXLOGSIZE,
            format:fileFormat
        }),
        new winston.transports.Console({
            level:'success',
            format:consoleFormat
        })
    ]
})

const Logger = {
    error:(message:string):winston.Logger => logger.error(message),
    warning:(message:string):winston.Logger => logger.warning(message),
    success:(message:string):winston.Logger => logger.log('success',message)
}


export default Logger