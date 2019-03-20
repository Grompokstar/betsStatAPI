const express        = require('express');
const MongoClient    = require('mongodb').MongoClient;
const bodyParser     = require('body-parser');
const db             = require('./config/db');
const cors           = require('cors');
const app            = express();
app.use(bodyParser.json());
app.use(cors());
const port = 8088;


MongoClient.connect(db.url, (err, database) => {
  const myAwesomeDB = database.db('newBets');

  if (err) return console.log(err);

  require('./app/routes')(app, myAwesomeDB);
  app.listen(port, () => {
    console.log('We are live on ' + port);
  });
})
