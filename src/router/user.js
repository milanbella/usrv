const router = express.Router();
const { userVerifyPasswordAndIssueJwt, userVerifyJwt } = require('../business/user');

const FILE = 'router/user.js';

router.get('/', function(req, res) {
  res.json({message: 'Hello from /api/user !'});
});
router.post('/', function(req, res) {
  res.json({message: 'Hello from /api/user !'});
});

router.post('/userVerifyPasswordAndIssueJwt', async function(req, res) {
  const FUNC = 'post(/userVerifyPasswordAndIssueJwt)';
  try {

    let applicationName = req.body.applicationName;
    let userName = req.body.userName;
    let password = req.body.password;

    if (!applicationName) {
      console.warn(`${FILE}:${FUNC}: missing 'applicationName'`);
      res.status(400);
      res.end();
      return;
    }
    if (!userName) {
      console.warn(`${FILE}:${FUNC}: missing 'userName'`);
      res.status(400);
      res.end();
      return;
    }
    if (!password) {
      console.warn(`${FILE}:${FUNC}: missing 'password'`);
      res.status(400);
      res.end();
      return;
    }

    let user = await userVerifyPasswordAndIssueJwt(applicationName, userName, password);

    if (user !== null) {
      res.status(200);
      res.json({
        ...user
      });
      res.end();
    } else {
      console.warn(`${FILE}:${FUNC}: unauthorized, applicationName: ${applicationName}, userName: ${userName}`);
      res.status(401);
      res.end();
      return;
    }

  } catch(err) {
    console.error(`${FILE}:${FUNC}: erorr: ${err}`, err);
    res.status(500);
    res.end();
  }
});

router.post('/userVerifyJwt', async function(req, res) {
  const FUNC = 'post(/userVerifyJwt)';
  try {

    let jwt = req.body.jwt;
    let applicationName = req.body.applicationName;
    let password = req.body.password;

    if (!jwt) {
      console.warn(`${FILE}:${FUNC}: missing 'jwt'`);
      res.status(400);
      res.end();
      return;
    }
    if (!userName) {
      console.warn(`${FILE}:${FUNC}: missing 'applicationName'`);
      res.status(400);
      res.end();
      return;
    }
    if (!userName) {
      console.warn(`${FILE}:${FUNC}: missing 'userName'`);
      res.status(400);
      res.end();
      return;
    }

    let vresult = await userVerifyJwt(jwt, applicationName, userName)

    if (vresult !== null) {
      res.status(200);
      res.json({
        ...vresult
      });
      res.end();
    } else {
      console.warn(`${FILE}:${FUNC}: unauthorized`);
      res.status(401);
      res.end();
      return;
    }

  } catch(err) {
    console.error(`${FILE}:${FUNC}: erorr: ${err}`, err);
    res.status(500);
    res.end();
  }
});

exports.router = router;
