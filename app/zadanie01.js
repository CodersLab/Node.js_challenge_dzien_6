const express = require('express');
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.urlencoded({extended:false}));
app.use(express.static('./public/zadanie01'));

app.post('/result', (req, res) => {
  const {firstNumb,secondNumb} = req.body;
  let result = '';
  if(parseInt(firstNumb) % parseInt(secondNumb)){
    result = `${firstNumb} jest dzielnikiem ${secondNumb}`;
  }else{
    result = `${firstNumb} nie jest dzielnikiem ${secondNumb}`;
  }
    res.send(result);
});

app.listen(3000,()=>{
  console.log('Serwer uruchomiony na porcie 3000');
});
