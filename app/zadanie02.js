//Twój kod
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser')
let myCookie = "";

app.use(express.static('./public/zadanie02/'))
app.use(bodyParser.urlencoded())
app.use(cookieParser())

app.post('/cookie/set/', (req, res) => {
    const {name} = req.body;
    if(name.length > 0){
        res.cookie('zadanie02', name, {
            maxAge: 86400000*31,
        })
        res.send(`Ciastko zostało wysłane<br>
    check name on <a href="/cookie/show/">show</a><br>
    <a href="/cookie/check/">check</a>`)
    }
    else{
        res.send(`Ciastko nie zostało wysłane <br>
        <a href="/">wróć</a><br>
        <a href="/cookie/check/">check</a>`)
    }
   
})

app.get('/cookie/show/', (req, res) => {
    myCookie = req.cookies.zadanie02
    res.send('Ciasto ma wartość: ' + myCookie)
})

app.get('/cookie/check/', (req, res) => {
    myCookie = req.cookies.zadanie02
    
    res.send('check: ' + myCookie)
})

app.listen(3000, () => {
    console.log('3000')
})