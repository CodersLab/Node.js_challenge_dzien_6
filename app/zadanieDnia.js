//Twój kod
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const app = express();

app.use(express.static(path.join(__dirname, './public/zadanieDnia/')));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

app.post('/save', (req, res) => {
  const { comment: newComment } = req.body;
  const comments = (req.cookies.comments && JSON.parse(req.cookies.comments)) || [];
  
  comments.push(newComment)
  res.cookie('comments', JSON.stringify(comments));
  res.send('Komentarz został zapisany. <a href="/">Powrót na stronę główną</a>');
});

app.get('/', (req, res) => {
  const comments = JSON.parse(req.cookies.comments);

  res.send(`
    <ul>
    ${
      comments.map((comment, index) => {
        return '<li>' + comment + '</li>';
      }).join('')
    }
    </ul>`)
});

app.listen(3000, () => console.log('serwer stoi na porcie 3000'));