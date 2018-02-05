const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    const comments = readComments(req.cookies.comments);
    res.render('index', { comments: comments });
});

router.post('/save', (req, res) => {
    const comments = addComment(req.cookies.comments, req.body.comment);
    res.cookie('comments', comments, {
        maxAge: 31536000000 // expires after 1 year
    });
    const commentsLoaded = readComments(req.cookies.comments);
    commentsLoaded.push(req.body.comment);
    res.render('index', { msg: 'Successfully added a comment', comments: commentsLoaded });
});

router.get('/delete', (req, res) => {
    res.clearCookie('comments');
    res.render('index', { msg: 'All comments deleted.' });
});

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


module.exports = router;