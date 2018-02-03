const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const app = express();
app.use(cookieParser());
app.use(bodyParser.urlencoded({
    extended: true 
}));
app.use(express.static('./public/zadanie02/'));

app.post('/cookie/set', (req, res) => {
    res.cookie('cookieName', req.body.name, {
        maxAge : 2628000000,
    }); 
    res.send('Zapisano imię: ' + req.body.name);
});

app.get('/cookie/show', (req, res) => {
    res.send('Zapisane imię: ' + req.cookies.cookieName); 
});

app.get('/cookie/check', (req, res) => {
    let is = req.cookies.cookieName === undefined ? 'nie' : '';
    res.send('Imię '+ is + ' zostało zapisane w ciastku.');
});

app.listen(3000, () => {
  console.log('Serwer uruchomiony na porcie 3000');
});
