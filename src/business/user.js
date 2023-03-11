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


async function userVerifyPasswordAndIssueJwt(applicationName, deviceId, userName, password) {
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

        sql = 'select id from application where name = ?';
        sparams = [applicationName];
        rows = await conn.query(sql, sparams); 
        if (rows.length < 1) {
          console.warn(`${FILE}:${FUNC}: no such application`);
          return null;
        }
        let applicationId = rows[0].id;

        user.jwt = await issueJwt({
          'application': applicationName,
          'device': deviceId,
          'user': userName,
        });

        let id = uuidv4()
        sql = 'insert into token(id, user_username, application_id, device_id, token, created_at) values(?, ?, ?, ?, ?, CURRENT_TIMESTAMP)';
        sparams = [id, userName, applicationId, deviceId, user.jwt];
        await conn.query(sql, sparams);

        //@@@@@@@@@@@@@@@@@@@@@@@@@@@@
        console.log('@@@@@@@@@@@@@@@@@@@@@@@ cp 1500');
        console.dir(user); //@@@@@@@@@@@@@@@@@@@

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

async function userVerifyJwt(jwt, applicationName, deviceId, userName) {
  const FUNC = 'verifyJwt()';
  try {
    let key = readKeyFromFs('certs/cert.pem');
    let publicKey = await importPublicKey(key);
    let vresult = await verifyJWT(jwt, publicKey);

    if (vresult.payload.application !== applicationName) {
      console.warn(`${FILE}:${FUNC}: claim 'application' was not verified`);  
      return null;
    }
    if (vresult.payload.device !== deviceId) {
      console.warn(`${FILE}:${FUNC}: claim 'device' was not verified`);  
      return null;
    }
    if (vresult.payload.user !== userName) {
      console.warn(`${FILE}:${FUNC}: claim 'user' was not verified`);  
      return null;
    }

    return vresult;

  } catch(err) {
    console.error(`${FILE}:${FUNC}: error`, err);
    throw err;
  }
}


exports.userVerifyPassword = userVerifyPassword;
exports.userVerifyPasswordAndIssueJwt = userVerifyPasswordAndIssueJwt;
exports.userVerifyJwt = userVerifyJwt;
