//Twój kod



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