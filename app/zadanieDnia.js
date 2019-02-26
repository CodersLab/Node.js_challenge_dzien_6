//Twój kod
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

app.use(express.static('./public/zadanieDnia'))
// app.use('/public', express.static(__dirname + '/zadanieDnia'))

app.use(bodyParser.urlencoded())
app.use(cookieParser())

app.listen(3000, () => {
    console.log('dziala na 3000')
})