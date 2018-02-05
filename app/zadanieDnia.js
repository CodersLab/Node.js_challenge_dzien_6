const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const port = 3000;

const app = express();

const index = require('./public/zadanieDnia/routes/index');
const add = require('./public/zadanieDnia/routes/add');

// View engine setup
app.set('views', path.join(__dirname, '/public/zadanieDnia/views'));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

app.use(express.static('./public/zadanieDnia/'));
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(cookieParser());

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});

app.use('/', index);
app.use('/add', add);

