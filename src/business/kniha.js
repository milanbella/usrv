const { getConnection } = require('../db')
const { v4: uuidv4 } = require('uuid')
const { closeConnection } = require('../db')

async function knihaCreate(titul, popis) {
    let conn
    try {
        conn = await getConnection()
        let id = uuidv4()
        await conn.query(
            'insert into kniha(id, titul, popis) values(?, ?, ?)',
            [id, titul, popis]
        )
        return id
    } finally {
        closeConnection(conn)
    }
}

async function knihaUpdate(id, titul, popis) {
    let conn
    try {
        conn = await getConnection()
        let result = await conn.query(
            'update kniha  set titul = ?,  popis =  ?  where id = ?',
            [titul, popis, id]
        )
    } finally {
        closeConnection(conn)
    }
}

async function knihaGet(id) {
    let conn
    try {
        conn = await getConnection()
        let rows = await conn.query('select * from kniha where id = ?', [id])
        if (rows.length > 0) {
            return rows[0]
        } else {
            return null
        }
    } finally {
        closeConnection(conn)
    }
}

async function knihaGetAll() {
    let conn
    try {
        conn = await getConnection()
        let rows = await conn.query('select * from kniha', [])
        return rows
    } finally {
        closeConnection(conn)
    }
}

exports.knihaCreate = knihaCreate
exports.knihaGet = knihaGet
exports.knihaUpdate = knihaUpdate
exports.knihaGetAll = knihaGetAll
