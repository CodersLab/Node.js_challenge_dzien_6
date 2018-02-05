//Twój kod
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const app = express();
const serializeResponse = (value) => `<h1 style='text-align: center'>${value}</h1>`;

app.use(express.static(path.join(__dirname, './public/zadanie02/')));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

app.post('/cookie/set', (req, res) => {
  const { name, surname } = req.body;
  
  res.cookie('names', `${name},${surname}`);
  res.send(serializeResponse(`Ciastko ustawione: "${name},${surname}"`));
});

app.get('/cookie/show', (req, res) => {
  const [ name, surname ] = req.cookies.names.split(',');
  res.send(serializeResponse(`User name is: ${name} and surname is: ${surname}`));
});

app.get('/cookie/check', (req, res) => {
  res.send(req.cookies ? serializeResponse('Bon a\'petit! There is a cookie here :)') : serializeResponse('Echo... echo... Nothing here.'));
});

app.listen(3000, () => console.log('serwer stoi na porcie 3000'));