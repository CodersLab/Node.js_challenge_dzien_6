const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

const app = express();
app.use(cookieParser());
app.use(bodyParser.urlencoded({extended:false}));
app.use(express.static('./public/zadanieDnia/'))

app.post('/save', (req, res) => {
    const allComments = addComment(req.cookies.comments, req.body.comment)

    res.cookie('comments', allComments, {
        maxAge : 31536000000,
    });
    res.send('Zapisano komentarz <a href="/">Powrót do strony głównej</a>');
});

app.get('/', (req, res) => {
    const comments = readComments(req.cookies.comments);
    res.send(`${comments}</br><a href="/add.html">Dodaj nowy komentarz</a>`);
});

app.listen(3000, () => {
    console.log('Serwer uruchomiony na porcie 3000');
});

function addComment(commentsCookieValue, newComment) {
    const comments = readComments(commentsCookieValue);
    comments.push(newComment);
    return JSON.stringify(comments);
}
function readComments(commentsCookieValue) {
    return commentsCookieValue ? JSON.parse(commentsCookieValue) : [];
}
