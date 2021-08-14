const express = require('express')
const watch = require('./watch');
const app = express()



let count="1";

app.get('/', (req, res) => {
  res.send('Changed' +count);
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

