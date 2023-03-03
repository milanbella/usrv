const express = require('express');
const { router: routerUser } = require('./user');

const router = express.Router();

router.get('/', function (req, res) {
  res.json({massage: 'Hello from /api !'});
})

router.post('/', function (req, res) {
  res.json({massage: 'Hello from /api !'});
})

router.use('/user', routerUser);

exports.router = router;
