const express = require('express')
const cors = require('cors')
const watch = require('./watch');
const app = express()

app.use(cors());

app.use('/app', express.static(__dirname + '/ui/dist'));

let count="1";

app.get('/', (req, res) => {
  res.json({
    "changed":count
  });
})

app.get('/count', (req, res) => {
  res.json({
    "changed":count
  });
})


const background=function() {
    console.log('backgroung executed');
    setTimeout(background, 5000);
    count++;
}

background();

module.exports = 
{
    config:{},
    server:app,
    watcher:watch,
    configFromEnv()
    {
        const dotenv = require('dotenv');
        dotenv.config();
        this.config.port = process.env.PORT || 3000;
        this.config.connection = process.env.MONGODB_URL 
        return this;
        
    },
    start()
    {
          this.server.listen(this.config.port, () => {
            console.log(`MESS (Mongo Event Sourcing) listening at http://localhost:${this.config.port}`);
          });

          this.watcher( this.config.connection).catch(console.dir);
          return this;
    }
};

