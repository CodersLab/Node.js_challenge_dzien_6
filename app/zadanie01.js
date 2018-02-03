//Twój kod
const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.urlencoded());
app.use(bodyParser());

app.use(express.static('public/zadanie01/'))

app.post('/modulo', (req, res) => {
    const {a,b} = req.body; //Pamiętasz ten skrótowy zapis z ES6?
    const modulo = ((parseInt(a) % parseInt(b))===0)? 'jest dzielnikiem liczby: ' : 'nie jest dzielnikiem liczby: '
    res.send(`
    liczba ${b} ${modulo} ${a}`);
});

app.listen(3000, () => {
    console.log('Serwer uruchomiony na porcie 3000');
});