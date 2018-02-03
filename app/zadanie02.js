//Twój kod
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const app = express();

app.use(express.static(path.join(__dirname, './public/zadanie02/')));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

app.post('/cookie/set', (req, res) => {
  const { name, surname } = req.body;
  
  res.cookie('names', `${name},${surname}`);
  res.send('ustawione');
  console.log('Ciastko ustawione', `${name},${surname}`);
});

app.get('/cookie/show', (req, res) => {
  console.log(req.cookie);
  // const [ name, surname ] = req.cookies.names.split(',');
  // console.log('names', `${name},${surname}`);
});


app.listen(3000, () => console.log('serwer stoi na porcie 3000'));