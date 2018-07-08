const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.urlencoded());

app.post('/zad1/solution', (req, res) => {
    const { A, B } = req.body; //Pamiętasz ten skrótowy zapis z ES6?
    const modulo = parseInt(A) % parseInt(B);
    if (modulo === 0) {
        res.send('Liczba ' + B + ' jest dzielnikiem liczby ' + A);
    }
    else {
        res.send('Liczba ' + B + ' nie jest dzielnikiem liczby ' + A);
    }

});

app.listen(3000, () => {
    console.log('Serwer uruchomiony na porcie 3000');
});