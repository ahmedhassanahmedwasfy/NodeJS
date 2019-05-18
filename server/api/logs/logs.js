var winston = require('winston');
require('winston-mongodb');
const config = require('../config/config');
var dbURI = config.development.mongodb.dburl;

let options={db:dbURI ,collection:'logs'}

const logger = winston.createLogger({
    level: 'debug',
    format: winston.format.json(),
    defaultMeta: { service: 'user-service' },
    transports: [
        new winston.transports.MongoDB(options)
        // new winston.transports.File({ filename: 'error.log', level: 'error' }),
        // new winston.transports.File({ filename: 'combined.log' })
    ]
});


module.exports=logger;