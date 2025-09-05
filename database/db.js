import { DB_HOST, DB_PASSWORD, DB_USER, DB_NAME } from "../config/env.js";

const dbConfig = {
  development: {
    username: DB_USER,
    password: DB_PASSWORD,
    database: DB_NAME,
    host: DB_HOST,
    dialect: "postgres",
    sslmode: "require",
    },

};

export default dbConfig;