const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded());

app.get('/', (req, res) => {
	res.sendFile(path.join(__dirname + '/public/zadanie01/index.html'));
});

app.post('/form', (req, res) => {
	let {num1, num2} = req.body;
	let result = (Number(num1) % Number(num2)) === 0 ? 
		`Liczba ${num2} jest dzielnikiem liczby ${num1}`:
		`Liczba ${num2} nie jest dzielnikiem liczby ${num1}`;
	res.send(result);
});

app.listen(3000, () => {
	console.log('Aplikacja działa na porcie 3000')
});