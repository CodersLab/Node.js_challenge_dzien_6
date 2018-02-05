const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

const app = express();
app.use(cookieParser());
app.use(bodyParser.urlencoded());
app.use(express.static('./public/zadanieDnia/'));


let posts = [];

app.get("/", (req, res) => {
    let response = '';

    if (req.cookies.posts) {
        posts = JSON.parse(req.cookies.posts);
    }

    if (posts.length > 0) {
        posts.forEach( val => {
            response += "post: " + val + "<br>";
        });
    }

    response += "<br><a href='add.html'>Dodaj posta</a>";
    res.send(response);
});

app.post("/save", (req, res) => {
    if (req.cookies.posts) {
        posts = JSON.parse(req.cookies.posts);
    }
    if (req.body.post) {
        posts.push(req.body.post);
        res.cookie("posts", JSON.stringify(posts));
    }
    res.send("Zapisano<br><a href='/'>Strona główna</a>")
});

app.listen(3000);