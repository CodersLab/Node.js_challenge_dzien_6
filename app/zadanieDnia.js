const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static('./public/zadanieDnia/'));
app.use(cookieParser());

const addComment = (commentsTab, newComment) => {
	const comments = readComments(commentsTab);
	comments.push(newComment);
	return JSON.stringify(comments);
}

const readComments = comments => {
	return comments ? JSON.parse(comments) : [];
}

app.get('/', (req, res) => {
	let comments = readComments(req.cookies.comments);
	res.send(`
		Wpisy:
		<br>
		${comments}
		</br>
		<a href="add.html">Dodaj wpis</a>
	`);
});

app.post('/save', (req, res) => {
	let comments = addComment(req.cookies.comments, req.body.comment)
	res.cookie('comments', comments, {maxAge: 10000000});
	res.send(`
		Wpis dodany
		${req.body.comment}
		<br>
		<a href="/">Powrót</a>
	`)
});

app.listen(3000, () => {
	console.log('Aplikacja działa na porcie 3000')
});

