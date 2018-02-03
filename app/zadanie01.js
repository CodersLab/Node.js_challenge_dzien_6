//Twój kod
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const app = express();

app.use(express.static(path.join(__dirname, './public/zadanie01/')));
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/form', (req, res) => {
  const { num1, num2 } = req.body;
  const success = `<h1>BINGO! ${num2} jest dzielnikiem ${num1}</h1>`
  const failure = `<h1>${num2} nie jest dzielnikiem ${num1}</h1>`

  res.send(num1 % num2 !== 0 ? failure : success); // rozumiem następuje kastowanie na Number ze względu na działanie %?
});

app.listen(3000, () => console.log('serwer stoi na porcie 3000'));