const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

app.listen(port, () => {
    console.log(`Server running on port: ${port}`);
});

app.use(express.static('./public/zadanie01/'));
app.use(bodyParser.urlencoded({
    extended: true
}));

app.post('/check', (req, res) => {
    const { numA, numB } = req.body;
    const ans = (parseInt(numA) % parseInt(numB) === 0) ? 'is' : 'is NOT';
    res.send(`Number B: ${numB} ${ans} modulo of Number A: ${numA}`);
});