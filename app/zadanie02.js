const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const app = express();
const port = 3000;

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

app.use(express.static('./public/zadanie02/'));
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(cookieParser());

app.post('/cookie/set', (req, res) => {
    const { name } = req.body;
    res.cookie('name', name, {
        maxAge: 31536000000 // expires after 1 year
    });
    res.send(`Saved in cookies name: ${name}`);
});

app.get('/cookie/show', (req, res) => {
    const name = req.cookies.name;
    res.send(`Saved name is ${name}`); 
});

app.get('/cookie/check', (req, res) => {
    const name = req.cookies.name;
    const ans = (name === undefined ? 'is NOT' : 'is');
    res.send(`Name ${ans} saved to cookies`);
});