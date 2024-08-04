const express = require('express');
const app = express()
const cors = require('cors');

app.set('port', 3000);
app.use(cors())
app.use(express.json())

const uploadRouter = require('./router/uploadRouter')

app.use('/api', uploadRouter);

module.exports = app;