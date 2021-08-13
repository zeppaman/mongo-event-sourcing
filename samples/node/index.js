const eventSourcing = require('./node_modules/mongo-event-sourcing/index');


var app=eventSourcing
.configFromEnv();
//app.config.connection="xx"; if you do not want to read it from .env

app.start();




