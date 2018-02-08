const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.urlencoded());

app.use(express.static('./public/zadanie01/'))

app.post('/result', (req, res) => {
    let {number1, number2} = req.body;
  
    if(number1 % number2 === 0){
        let result  = Number.parseInt(number1) / Number.parseInt(number2);
        res.send(`rozwiazanie: ${result}`);
    } else {
        res.send(`liczba ${number2} nie jest dzielnikiem liczby ${number1}`)
    }
});

app.listen(3000, () => {
    console.log('Serwer uruchomiony na porcie 3000');
});