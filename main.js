
const express = require('express')
const watch = require('./watch');
const app = express()



const dotenv = require('dotenv');
dotenv.config();
const port = process.env.PORT || 3000;
const connection = process.env.MONGODB_URL 
console.log(`Your port is ${port}`); // 3001


let count="1";

app.get('/', (req, res) => {
  res.send('Cjhanged' +count);
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})





const background=function() {
    console.log('backgroung executed');
    setTimeout(background, 5000);
    count++;
}

background();

watch(connection).catch(console.dir);