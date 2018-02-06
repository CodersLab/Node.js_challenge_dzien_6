const express = require('express');
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.urlencoded());


app.use(express.static('./public/zadanie01/'));

app.post('/sum', (req, res) => {
 const {a, b} = req.body;

 if (!(parseInt(a) % parseInt(b))){
 	res.send('Liczba B jest dzielnikiem liczby A.')
 } else {
 	res.send('Liczba B nie jest dzielnikiem liczby A.');
 }
});


app.listen(3000, () => {
	console.log('Wystartowalem serwerek na porcie 3000');
});