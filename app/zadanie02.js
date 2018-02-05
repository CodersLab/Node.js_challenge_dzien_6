const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

const app = express();
app.use(cookieParser());
app.use(bodyParser.urlencoded());
app.use(express.static('./public/zadanie02/'));

app.post('/cookie/set', (req, res) => {
    res.cookie('name', req.body.name, {maxAge : 31536000000}); 
    res.send('Imię: ' + req.body.name);
});

app.get('/cookie/check', (req, res) => {
    const imie = req.cookies.name === undefined ? res.cookies.name : 'nie';
    res.send(`Imię ${imie} zostało zapisane w ciastku.`);
});

app.get('/cookie/show', (req, res) => {res.send('Zapisane imię: ' + req.cookies.name); });

app.listen(3000, () => {
  console.log('Serwer uruchomiony na porcie 3000');
});