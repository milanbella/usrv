const { getConnection } = require('../db')
const { v4: uuidv4 } = require('uuid')
const { closeConnection } = require('../db')

async function vypozickaCreate(kniznicaId, studentId, knihaId) {
    let conn
    try {
        conn = await getConnection()

        let rows = await conn.query(
            'select student_id from kniznica_student where student_id = ?',
            [studentId]
        )
        if (rows.length < 1) {
            throw new Error('no such student in the kniznica')
        }

        rows = await conn.query(
            'select kniha_id from kniznica_kniha where kniha_id = ?',
            [knihaId]
        )
        if (rows.length < 1) {
            throw new Error('no such kniha in the kniznica')
        }

        let id = uuidv4()
        let currentDate = new Date()
        await conn.query(
            'insert into vypozicka(id, kniznica_id, student_id, kniha_id, datum_vypozicky, datum_vratenia) values(?, ?, ?, ?, ?, null)',
            [id, kniznicaId, studentId, knihaId, currentDate]
        )
        return id
    } finally {
        closeConnection(conn)
    }
}

async function vypozickaVratenieKnihy(kniznicaId, studentId, knihaId) {
    let conn
    try {
        conn = await getConnection()

        let rows = await conn.query(
            'select id from vypozicka where kniznica_id = ? and student_id = ? and kniha_id = ?',
            [kniznicaId, studentId, knihaId]
        )
        if (rows.length < 1) {
            throw new Error('no such vypozicka')
        }
        let vypozickaId = rows[0].id
        let currentDate = new Date()
        await conn.query(
            'update vypozicka set datum_vratenia = ? where id = ?',
            [currentDate, vypozickaId]
        )
    } finally {
        closeConnection(conn)
    }
}

async function vypozickaGet(kniznicaId, studentId, knihaId) {
    let conn
    try {
        conn = await getConnection()

        let rows = await conn.query(
            'select * from vypozicka where kniznica_id = ? and student_id = ? and kniha_id = ?',
            [kniznicaId, studentId, knihaId]
        )
        if (rows.length < 1) {
            return null
        }
        return rows[0]
    } finally {
        closeConnection(conn)
    }
}

async function vypozickaGetHistoryOfVypozickaForStudent(kniznicaId, studentId) {
    let conn
    try {
        conn = await getConnection()

        let rows = await conn.query(
            'select * from vypozicka where kniznica_id = ? and student_id = ?',
            [kniznicaId, studentId]
        )
        if (rows.length < 1) {
            return null
        }
        return rows
    } finally {
        closeConnection(conn)
    }
}

exports.vypozickaCreate = vypozickaCreate
exports.vypozickaVratenieKnihy = vypozickaVratenieKnihy
exports.vypozickaGet = vypozickaGet
exports.vypozickaGetHistoryOfVypozickaForStudent =
    vypozickaGetHistoryOfVypozickaForStudent
