const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const app = express();
app.use(bodyParser.urlencoded());
app.use(cookieParser());

// app.get('/zad2/cookie/set', (req, res) => {
//     const name = req.body;
//     res.cookie('name', name, {
//         maxAge : 2678400000,
//     }); 
// });

app.post('/zad2/cookie/set', (req, res) => {
    const name = req.body;
    res.cookie('namecookie', name, {
        maxAge : 2678400000,
    }); 
    res.send('Ciastko ustawione!');
});


app.get('/cookie/show', (req, res) => {
    const myCookie = req.cookies.namecookie;
    res.send('Imię: ' + String(myCookie.name));
});

app.get('/cookie/check', (req, res) => {
    const myCookie = req.cookies.namecookie;
    if(myCookie === undefined)
    res.send('Ciastko nie zapisane');
    else
    res.send('Ciastko zapisane');
});


app.listen(3000, () => {
    console.log('Serwer uruchomiony na porcie 3000');
});