const express = require('express');
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.urlencoded({
    extended: true  //body-parser deprecated undefined extended: provide extended option
}));
app.use(express.static('./public/zadanie01/'));

app.post('/result', (req, res) => {
    const {a, b} = req.body; 
    const is = parseInt(a) % parseInt(b) === 0 ? '' : ' nie';
    res.send('Liczba ' + b + is + ' jest dzielnikiem liczby ' + a);
});

app.listen(3000, () => {
  console.log('Serwer uruchomiony na porcie 3000');
});
