const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const app = express();
app.use(bodyParser.urlencoded());
app.use(cookieParser());

app.use(express.static('./public/zadanieDnia/'))

app.post('/save', (req, res) => {

    let text  = req.body.text;
    let actual = req.cookies.content;

    if(typeof actual == 'undefined'){

        res.cookie('content', JSON.stringify({ "messages": [text] }), {
            maxAge : 31536000000,
        });

    } else {

        let parsed = JSON.parse(actual);
        res.cookie('content', JSON.stringify({ "messages": [ ...parsed.messages, text] }), {
            maxAge : 31536000000,
        });
    
    }
    
    res.send('Wiadomość została dodana');

});

app.get('/', (req, res) => {
    let actual = req.cookies.content;

    if(typeof actual == 'undefined'){
        res.send('Brak wiadomości');
    } else {
       res.json(JSON.parse(actual));
    }
});

app.listen(3000, () => {
    console.log('Serwer uruchomiony na porcie 3000');
});