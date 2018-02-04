const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

app.use(bodyParser.urlencoded({extended:true}));
app.use('/', express.static('./public/zadanie02/'));
app.use(cookieParser());

app.post('/cookie/set', (req, res) => {
	const name = req.body.name;
	res.cookie('name', name);
	res.send(`Ciasteczko zostało ustawione: ${name}`);
});

app.get('/cookie/show', (req, res) => {
	const cookie = req.cookies.name;
	res.send(`Ciasteczko ma wartosc: ${cookie}`)
});

app.get('/cookie/check', (req, res) => {
	const cookie = req.cookies.name ? 'Ciasteczko poprawnie zapisane' : 'Ciasteczko nie zostało zapisane';
	res.send(cookie);
});

app.listen(3000, () => {
	console.log('Aplikacja działa na porcie 3000')
});