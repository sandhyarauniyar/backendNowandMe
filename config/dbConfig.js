const dotenv = require('dotenv');
dotenv.config();
module.exports = {
    PORT: '3306',
    USER: 'root',
    PASSWORD: '',
    DB: 'userdb',
    otherConfig: {
        logging: process.env.NODE_ENV === 'development',
        host: 'localhost',
        dialect: 'mysql',
        dialectModule: require('mysql2'),
        pool: {
            max: 5,
            min: 0,
            acquire: 30000,
            idle: 10000
        },
    }
}