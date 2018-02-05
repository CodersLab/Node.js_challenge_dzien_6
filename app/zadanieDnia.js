//Twój kod
const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

const app = express();
app.use(cookieParser());
app.use(bodyParser.urlencoded());
app.use(express.static('./public/zadanieDnia/'));


function addComment(commentsCookieValue, newComment) {
    let comments = readComments(commentsCookieValue);
    comments = [newComment, ...comments];
    comments.join(" ");
    return JSON.stringify(comments);
}

function readComments(commentsCookieValue) {
    return commentsCookieValue ? JSON.parse(commentsCookieValue) : [];
}


app.use(express.static('./public/zadanieDnia/'));



app.get('/', (req, res) => {
    console.log(JSON.stringify(req.cookies.comments));
  const comments = readComments(req.cookies.comments);

  const commentList = comments.map(comment=>{return `<li><hr>${comment}</li>`})
  res.send( `<ul>${commentList}</ul><hr><a href="/add.html">Dodaj nowy komentarz</a>
  <br> 
  <hr>
  <a href='/clear'>USUŃ KOMENTARZE</a>
     <style>
        *{
        list-style-type: none;
        }
    </style>
  `);
});

app.post('/save', (req, res) => {
  const comments = addComment(req.cookies.comments, req.body.comment);
  res.cookie('comments', comments, {
    maxAge: 31536000000
  });
  res.send(`Zapisano nowy komentarz. 
            <a href="/">wróć</a>`);
});

app.get('/clear', (req, res) => {
    res.clearCookie('comments');
    res.send(`Wszystko usunięte <a href="/">wróć</a>`);
  });

app.listen(3000, () => {
  console.log('Serwer uruchomiony na porcie 3000');
});