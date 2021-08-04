import dotenv from 'dotenv';
dotenv.config()

export default {
    port: process.env.PORT,
    host: process.env.HOST,
    dbUri: process.env.MONGO_URI,
    saltWorkFactor: process.env.SALTWORKFACTOR,
    privateKey: 'oloro',
    refreshToken: process.env.JWT_ACCESS_EXPIRATION_MINUTES,
    accessTokenTtl: process.env.JWT_REFRESH_EXPIRATION_HOURS,
}