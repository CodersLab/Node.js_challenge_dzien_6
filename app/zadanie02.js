const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const app = express();
app.use(bodyParser.urlencoded());
app.use(cookieParser());

app.use(express.static('./public/zadanie02/'))

app.post('/cookie/set', (req, res) => {
    let name  = req.body.name;

    res.cookie('name', name, {
        maxAge : 31536000000,
    });

    res.send('Zapisano imie');
    
});

app.get('/cookie/show', (req, res) => {
    res.send('Ciastko ma wartość: ' + req.cookies.name); 
});

app.get('/cookie/check', (req, res) => {
    let name = req.cookies.name;

    if(name != 'undefined'){
        res.send('Ciastko ma wartość: ' + name); 
    } else {
        res.send('Ciastko nie zostalo ustawione'); 
    }
});

app.listen(3000, () => {
    console.log('Serwer uruchomiony na porcie 3000');
});