const { getConnection } = require('../db')
const { closeConnection } = require('../db')

async function userVerifyPassword(userName, password) {
    let conn
    try {
        conn = await getConnection()

        let rows = await conn.query('select * from user where username = ?', [
            userName,
        ])
        if (rows.length < 1) {
            throw new Error('no such user')
        }
        let user = rows[0]
        //attention this is not correct, we should store and compare encrypted password
        if (user.heslo === password) {
            delete user.heslo
            return user
        }
        return rows
    } finally {
        closeConnection(conn)
    }
}

exports.userVerifyPassword = userVerifyPassword
