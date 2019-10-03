var path = require('path'),  
    express = require('express'),  //refers to Express the middleware helper for Node.js 
    mongoose = require('mongoose'),
    morgan = require('morgan'),
    bodyParser = require('body-parser'),
    config = require('./config'),
    listingsRouter = require('../routes/listings.server.routes'), 
    getCoordinates = require('../controllers/coordinates.server.controller.js');

module.exports.init = function() {
  mongoose.connect(config.db.uri, { useNewUrlParser: true });
    mongoose.set('useCreateIndex', true);
    mongoose.set('useFindAndModify', false);

  var app = express();

  app.use(morgan('dev'));

  app.use(bodyParser.json());

  app.use('/', express.static(__dirname + '/../../client'));

  app.use('/api/listings', listingsRouter);


  app.post('/api/coordinates', getCoordinates, function(req, res) {
    res.send(req.results);
  });


  app.all('/*', function(req, res) {

   res.sendFile(path.resolve('client', 'index.html'));
  });
  
  return app;
};  