//Twój kod
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

let commentsArray = [];

app.use(express.static('./public/zadanieDnia'))
// app.use('/public', express.static(__dirname + '/zadanieDnia'))

app.use(bodyParser.urlencoded())
app.use(cookieParser())


app.post('/save/', (req, res) => {
    const { comment } = req.body;
    commentsArray.push(comment);
    res.cookie("zadanieDnia", JSON.stringify(commentsArray))
    myCookie = req.cookies.zadanieDnia

    res.send(JSON.parse(myCookie) + '<br> <a href="/">wróć</a>')
    

})




app.listen(3000, () => {
    console.log('dziala na 3000')
})