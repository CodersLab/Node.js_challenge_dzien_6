const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

const app = express();
app.use(cookieParser());
app.use(bodyParser.urlencoded());
app.use(express.static('./public/zadanie02/'));


app.post("/cookie/set", (req, res) => {
    if (req.body.name) {
        res.cookie('name', req.body.name, {
            maxAge: 1000 * 60 * 60 * 24 * 30,
        });
        res.send('Ciastko ustawione!');
    }
    else {
        res.send('Nie podałeś imienia!');
    }
});

app.get("/cookie/show", (req, res) => {
    const name = req.cookies.name;
    if (typeof name !== 'undefined') {
        res.send("Imię zapisane w ciastku to: " + name);
    }
    else {
        res.send("Nie ma zapisanego imienia w ciastku");
    }
});

app.get("/cookie/check", (req, res) => {
    const name = req.cookies.name;
    if (typeof name !== 'undefined') {
        res.send("Imię jest zapisane w ciastku");
    }
    else {
        res.send("Nie ma zapisanego imienia w ciastku");
    }
});

app.listen(3000);