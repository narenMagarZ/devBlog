import Winston from 'winston'
import {} from 'node:path'

const logger = Winston.createLogger({
    levels:{
        error:0,
        warning:1,
        success:2,
        info:3
    },
    transports: [
        new Winston.transports.File({
            level:'error'
        }),
        new Winston.transports.File({
            level:'success'
        }),
        new Winston.transports.Console({
            level:'success'
        }),
    ],
    exceptionHandlers:[
        new Winston.transports.File({
            
        })
    ]
})