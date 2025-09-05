import {config} from 'dotenv';

config({path: `.env.${process.env.NODE_ENV || "development"}.local`});

export const {
    API_SERVICE,
    PORT,
    DB_HOST, DB_PASSWORD, DB_USER, DB_NAME
} = process.env;