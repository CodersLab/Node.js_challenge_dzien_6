const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

const app = express();
app.use(cookieParser());
app.use(express.static('./warmup/'))
app.use(bodyParser.urlencoded());

app.post('/sciezka/w/backendzie', (req, res) => {
    const {name, surname} = req.body;
    res.send('Wiec twierdzisz, że nazywasz się' + name + ' ' + surname)
})

app.get('/cookie/show', (req, res) => {
    const myCookie = req.cookies.test;
    res.send('Ciastko ma wartoć: ' + myCookie)
})

app.get('/cookie/remove', (req, res) => {
    res.clearCookie('test');
    res.send('ciastko usunięte!')
})

app.listen(3000, () => {
    console.log('blebleble')
})

