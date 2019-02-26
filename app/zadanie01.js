//Twój kod
const express = require('express');
const app = express();
const bodyParser = require('body-parser')

app.use(express.static('./public/zadanie01/'))
app.use(bodyParser.urlencoded());
// app.get('/', (req, res) => {
//     res.send('hello')
// })
app.post('/result/', (req, res) => {
    const {a, b} = req.body;
    
    a%b == 0 ? 
        res.send(`liczba B:(${b}) jest dzielnikiem liczby A:(${a})`):
        res.send(`liczba B:(${b}) nie jest dzielnikiem liczby A:(${a})`)   
})
app.listen(3000, () => {
    console.log('dziala na 3000')
})