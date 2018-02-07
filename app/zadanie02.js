const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const app = express();
app.use(express.static('./public/zadanie02'));
app.use(bodyParser.urlencoded({extended:false}));
app.use(cookieParser());

app.post('/cookie/set',(req,res)=>{
  const {name} = req.body;
  res.cookie('newName', name,{
    maxAge : 31536000000,
  });
  res.send('Zapisano imię: ' + name);
});
app.get('/cookie/show',(req,res)=>{
  const myCookie = req.cookies.newName;
  res.send('Zapisane imię: ' + myCookie);
});
app.get('/cookie/check',(req,res)=>{
  const myCookie = req.cookies.newName;
  if(myCookie === undefined){
    res.send('Brak zapisanego imienia!');
  } else{
    res.send('Zapisane imię: '+myCookie);
  }
});
app.listen(3000,()=>{
  console.log('Serwer uruchomiony na porcie 3000');
});
