import winston from 'winston'



const logger = winston.createLogger({
    level:'info',
    format:winston.format.json(),
    transports:[
        new winston.transports.File({filename:'error.log',level:'error'})
    ]
})


logger.add(new winston.transports.Console({
    format:winston.format.simple()
}))

