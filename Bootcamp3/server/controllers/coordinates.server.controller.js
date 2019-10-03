var config = require('../config/config'), 
    request = require('request');


module.exports = function(req, res, next) {
  if(req.body.address) {
      var addressTemp = req.body.address;
      var addressTemp2 = addressTemp.toLowerCase();
      var addressTemp3 = addressTemp2.replace(/\s/g, "%20");
      var addressTemp4 = addressTemp3.replace(/,/g , "%2C");
      
    var options = { 
      q: addressTemp4,
      key: config.openCage.key,  
    }

    request({
      url: 'https://api.opencagedata.com/geocode/v1/json', 
      qs: options,
      }, function(error, response, body) {
        var data = JSON.parse(body);
        
        req.results = data.results[0].geometry;
        
        next();
    });
  } else {
    next();
  }
};  