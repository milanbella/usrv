const express = require('express');
const { router } = require('./router/router.js');

const app = express()

const port = 3000

app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

app.use(express.static('public'))
app.use('/api', router);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
