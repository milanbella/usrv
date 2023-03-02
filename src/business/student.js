const { getConnection } = require('../db')
const { v4: uuidv4 } = require('uuid')
const { closeConnection } = require('../db')

async function studentCreate(meno, priezvisko) {
    let conn
    try {
        conn = await getConnection()
        let id = uuidv4()
        await conn.query(
            'insert into student(id, meno, priezvisko) values(?, ?, ?)',
            [id, meno, priezvisko]
        )
    } finally {
        closeConnection(conn)
    }
}

async function studentUpdate(id, meno, priezvisko) {
    let conn
    try {
        conn = await getConnection()
        let result = await conn.query(
            'update student  set meno = ?,  priezvisko =  ?  where id = ?',
            [meno, priezvisko, id]
        )
    } finally {
        closeConnection(conn)
    }
}

async function studentGet(id) {
    let conn
    try {
        conn = await getConnection()
        let rows = await conn.query('select * from student where id = ?', [id])
        if (rows.length > 0) {
            return rows[0]
        } else {
            return null
        }
    } finally {
        closeConnection(conn)
    }
}

async function studentGetAll() {
    let conn
    try {
        conn = await getConnection()
        let rows = await conn.query('select * from student', [])
        return rows
    } finally {
        closeConnection(conn)
    }
}

exports.studentCreate = studentCreate
exports.studentUpdate = studentUpdate
exports.studentGet = studentGet
exports.studentGetAll = studentGetAll
