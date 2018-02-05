//Twój kod

const express = require('express');
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static('./public/zadanie01/'));

app.post('/result', (req, res) => {
    const {numberA, numberB} = req.body;
    let information = '';
    if (parseInt(numberA) % parseInt(numberB) === 0) {
        information = `Tak! Liczba ${numberB} jest dzielnikiem liczby ${numberA}`;
    } else {
        information = `Nie! Liczba ${numberB} nie jest dzielnikiem liczby ${numberA}`;
    }
    res.send(`<h1>${information}</h1>`);
});

app.listen(3000, () => {
    console.log('Serwer uruchomiony na porcie 3000');
});