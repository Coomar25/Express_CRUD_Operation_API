import mysql from 'mysql2';

const db = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "",
    database: "express_crud"
});

export default db;