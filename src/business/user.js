const { getConnection } = require('../db')
const { closeConnection } = require('../db')
const { generateJWT, readKeyFromFs, importPrivateKey, importPublicKey, verifyJWT } = require('../auth/token');
const { v4: uuidv4 } = require('uuid');

const FILE = 'business/user.js'; 

async function userVerifyPassword(userName, password) {
    const FUNC = 'userVerifyPassword()';
    let conn
    let sql, sparams, rows;
    try {
        conn = await getConnection()

        sql = 'select * from user where username = ?';
        sparams = [ userName ]
        let rows = await conn.query(sql, sparams);
        if (rows.length < 1) {
            throw new Error('no such user')
        }
        let user = rows[0]
        //attention this is not correct, we should store and compare encrypted password
        if (user.heslo === password) {
            delete user.heslo
            return user;
        } else {
          return null;
        }
    } catch(err) {
      console.error(`${FILE}:${FUNC}: error, sql: ${sql}, sparams: ${sparams}`, err);
      throw err;
    } finally {
        closeConnection(conn)
    }
}

async function issueJwt(claims) {
  const FUNC = 'issueJwt()';
  try {
    let key = readKeyFromFs('certs/key-pkcs8.pem');
    let privateKey = await importPrivateKey(key);
    let expirationTimeSeconds = 3600 * 24 * 365;
    let expiresIn = `${expirationTimeSeconds}s`;
    let jwt = await generateJWT(privateKey, expiresIn, claims);
    return jwt;
  } catch(err) {
    console.error(`${FILE}:${FUNC}: error`, err);
    throw err;
  }

}


async function userVerifyPasswordAndIssueJwt(applicationName, userName, password) {
  const FUNC = 'userVerifyPasswordAndIssueJwt()';  
  let conn;
  let sql, sparams, rows;
  try {
      conn = await getConnection()

      sql = 'select * from user where username = ?';
      sparams = [ userName ]; 
      rows = await conn.query(sql, sparams);
      if (rows.length < 1) {
          throw new Error('no such user')
      }
      let user = rows[0]

      //attention this is not correct, we should store and compare encrypted password
      if (user.heslo === password) {
        delete user.heslo
        user.jwt = await issueJwt({
          'application': applicationName,
          'user': userName,
        });

        sql = 'select id from application where name = ?';
        sparams = [applicationName];
        rows = await conn.query(sql, sparams); 
        if (rows.length < 1) {
          throw new Error('no such application');
        }
        let applicationId = rows[0].id;

        let id = uuidv4()
        sql = 'insert into token(id, user_username, application_id, token, created_at) values(?, ?, ?, ?, CURRENT_TIMESTAMP)';
        sparams = [id, userName, applicationId, user.jwt];
        await conn.query(sql, sparams);

        return user;
      } else {
        return null;
      }
  } catch(err) {
      console.error(`${FILE}:${FUNC}: error, sql: ${sql}, sparams: ${sparams}`, err);
      throw err;
  } finally {
      closeConnection(conn)
  }
}

async function userVerifyJwt(jwt, applicationName, userName) {
  const FUNC = 'verifyJwt()';
  try {
    let key = readKeyFromFs('certs/cert.pem');
    let publicKey = await importPublicKey(key);
    let vresult = await verifyJWT(publicKey, publicKey);

    if (vresult.payload.application !== applicationName) {
      throw new Error("claim 'application' was not verified");  
    }
    if (vresult.payload.user !== userName) {
      throw new Error("claim 'user' was not verified");  
    }

    return vresult;

    return true;
  } catch(err) {
    console.error(`${FILE}:${FUNC}: error`, err);
    throw err;
  }
}


exports.userVerifyPassword = userVerifyPassword;
exports.userVerifyPasswordAndIssueJwt = userVerifyPasswordAndIssueJwt;
exports.userVerifyJwt = userVerifyJwt;
