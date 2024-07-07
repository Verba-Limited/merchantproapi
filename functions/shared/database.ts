import { Sequelize } from "sequelize";
// import { DB_HOST, DB_NAME, DB_PASSWORD, DB_USER } from "../config";

const DB_HOST = "localhost"
const DB_NAME =  "billondb"
const DB_PASSWORD = "" 
const DB_USER = "root"

export const DB = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
    host: DB_HOST,
    dialect: "mysql", //mssql
    logging: false,
    typeValidation: true,
    // dialectOptions: {
    //     supportBigNumbers: true,
    //     bigNumberStrings: true,
    //     options: {
    //         encrypt: true
    //       }
    //   },
    define: {
        charset: "utf8mb4",
        collate: "utf8mb4_unicode_ci",
        createdAt: "created_at",
        updatedAt: "updated_at",
        deletedAt: "deleted_at",
        paranoid: true,
        underscored: true,
    },
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000,
    },
    port:3306,
});


// Or you can simply use a connection uri
// export const DB = new Sequelize('postgres://user:pass@example.com:5432/dbname');

