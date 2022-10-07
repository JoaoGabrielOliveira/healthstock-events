import winston from 'winston';
import * as dotenv from 'dotenv';

dotenv.config();
const logger = winston.createLogger({
    format: winston.format.combine(
        winston.format.errors({ stack: true }),
        winston.format.json()
    ),
    transports: [
        new winston.transports.File({ filename: `${process.env.LOG_DIR}error.log`, level: 'error' }),
        new winston.transports.File({ filename: `${process.env.LOG_DIR}info.log`, level: 'info' }),
    ],
});
 
if (process.env.NODE_ENV !== 'production') {
    logger.add(new winston.transports.Console({
        format: winston.format.simple()
    }));
}

export default logger;