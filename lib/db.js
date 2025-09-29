import mysql from 'mysql2/promise'
import dotenv from 'dotenv'

dotenv.config()

let pool;

if (!global.db) {
    global.db = mysql.createPool({
        host: process.env.MYSQL_HOST,
        user: process.env.MYSQL_USER,
        password: process.env.MYSQL_PASSWORD,
        database: process.env.MYSQL_DATABASE,
        port: process.env.MYSQL_PORT,
        waitForConnections: true,
        connectionLimit: 10,
        queueLimit: 0,
        typeCast: (field, next) => {
            // Handle DATE → strip to yyyy-mm-dd
            if (field.type === "DATE") {
                return field.string(); // "2025-09-19"
            }

            // Handle DATETIME or TIMESTAMP → return as string with time
            if (field.type === "DATETIME" || field.type === "TIMESTAMP") {
                return field.string(); // "2025-09-19 14:30:00"
            }

            return next(); // everything else → default
        },
    }
    )

    // test
    global.db
        .query('SELECT 1')
        .then(() => console.log('MySQL connected successfully'))
        .catch((err) => console.error('MySQL connection failed:', err));

}



pool = global.db;

export const db = pool;