const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

const app = express();
app.use(cookieParser());
app.use(bodyParser.urlencoded());
app.use(express.static('./public/zadanie01/'));


app.post("/divider", (req, resp) => {
    resp.send( (parseInt(req.body.numberA) % parseInt(req.body.numberB) === 0) ? "Liczba B jest dzielnikiem liczby A" : "Liczba B nie jest dzielnikiem liczby A" );
});

app.listen(3000);