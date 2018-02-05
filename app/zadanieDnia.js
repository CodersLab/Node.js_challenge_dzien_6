//Twój kod

const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const app = express();
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static('./public/zadanieDnia/'));

app.post('/save', (req, res) => {
    const comments = addComment(req.cookies.commentSaved, req.body.comment)

    res.cookie('commentSaved', comments, {
        maxAge : 2592000000,
    });
    res.send('Zapisano komentarz <a href="/">Powrót do strony głównej</a>');
});

app.get('/', (req, res) => {
    const comments = readComments(req.cookies.commentSaved);
    res.send(`${comments}</br><a href="/add.html">Dodaj nowy komentarz</a>`);
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