const express = require('express');
const router = express.Router();
const { router: routerUser } = require('./user');

router.get('/', function (req, res) {
  res.json({massage: 'Hello from /api !'});
})

router.post('/', function (req, res) {
  res.json({massage: 'Hello from /api !'});
})

router.use('/user', routerUser);

exports.router = router;
