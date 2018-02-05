//Twój kod

const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const app = express();
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static('./public/zadanie02/'));

app.post('/cookie/set', (req, res) => {
    const {name} = req.body;
    res.cookie('nameSaved', name, {
        maxAge : 2592000000,
    });
    res.send(`Zapisano imię: ${name}`);
});

app.get('/cookie/show', (req, res) => {
    res.send(`Zapisane imię: ${req.cookies.nameSaved}`);
});

app.get('/cookie/check', (req, res) => {
    let information = req.cookies.nameSaved === undefined ? 'Nie zapisano imienia.' : 'Imię zapisane.';
    res.send(information);
});

app.listen(3000, () => {
    console.log('Serwer uruchomiony na porcie 3000');
});