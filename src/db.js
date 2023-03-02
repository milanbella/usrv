const mariadb = require('mariadb')
const dotenv = require('dotenv')
dotenv.config()
let pool
function init() {
    if (!pool) {
        pool = mariadb.createPool({
            port: process.env.DATABASE_PORT,
            host: process.env.DATABASE_HOST,
            user: process.env.DATABASE_USER,
            password: process.env.DATABASE_PASSWORD,
            database: process.env.DATABASE_NAME,
            connectionLimit: 5,
        })
    }
}
function destroy() {
    if (pool) {
        pool.end()
        pool = null
    }
}

async function getConnection() {
    if (!pool) {
        init()
    }
    let conn = await pool.getConnection()
    return conn
}

async function closeConnection(conn) {
    conn.close()
}

async function tryIfDatabaseConnectionIsWorking() {
    let conn
    try {
        conn = await getConnection()
        const rows = await conn.query('SELECT 1 as val')
        const res = await conn.query('select * from kniznica', [])
    } finally {
        closeConnection(conn)
    }
}

exports.tryIfDatabaseConnectionIsWorking = tryIfDatabaseConnectionIsWorking
exports.destroy = destroy
exports.getConnection = getConnection
exports.closeConnection = closeConnection
