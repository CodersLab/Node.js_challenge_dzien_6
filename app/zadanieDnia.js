const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const app = express();
app.use(cookieParser());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static('./public/zadanieDnia/'));

app.get('/remove', (req, res) => {
  res.clearCookie('comments');
  res.send('Komentarze usunięte!');
});

app.get('/', (req, res) => {
  const comments = readComments(req.cookies.comments);
  res.send(comments + '<hr><a href="/add.html">Dodaj nowy komentarz</a>');
});

app.post('/save', (req, res) => {
  const comments = addComment(req.cookies.comments, req.body.comment);
  res.cookie('comments', comments, {
    maxAge: 2628000000,
  });
  res.send('Zapisano nowy komentarz. <a href="/">Zobacz komentarze</a>');
});

app.listen(3000, () => {
  console.log('Serwer uruchomiony na porcie 3000');
});

// Funkcje pomocnicze

/**
 * Ta funkcja pobiera string dotychczasowego ciastka, dodaje nowy komentarz i zwraca nowy string - taki z jakim należy nadpisać to ciasto.
 * @param {string} commentsCookieValue Wartość dotychczasowego ciastka przechowującego komentarze
 * @param {string} newComment Nowy komentarz
 * @return {string} Nowy string z komentarzami do zapisania w ciastku
 */
function addComment(commentsCookieValue, newComment) {
  const comments = readComments(commentsCookieValue);
  comments.push(newComment);
  return JSON.stringify(comments);
}

/**
 * Ta funkcja odczytuje już dodane komentarze i zwraca je w postaci tablicy.
 * @param {string} commentsCookieValue Wartość dotychczasowego ciastka przechowującego komentarze
 * @return {Array} Tablica z komentarzami
 */
function readComments(commentsCookieValue) {
  return commentsCookieValue ? JSON.parse(commentsCookieValue) : [];
}
