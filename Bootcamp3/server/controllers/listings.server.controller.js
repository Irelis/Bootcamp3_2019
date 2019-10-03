
var mongoose = require('mongoose'), 
    Listing = require('../models/listings.server.model.js'),
    coordinates = require('./coordinates.server.controller.js');
    
exports.create = function(req, res) {

  var listing = new Listing(req.body);

  if(req.results) {
    listing.coordinates = {
      latitude: req.results.lat, 
      longitude: req.results.lng
    };
  }

  
  listing.save(function(err) {
    if(err) {
      console.log(err);
      res.status(400).send(err);
    } else {
      res.json(listing);
      console.log(listing)
    }
  });
};

exports.read = function(req, res) {
  res.json(req.listing);
};

exports.update = function(req, res) {
  var listing = req.listing;

  listing.name = req.body.name;
  listing.address = req.body.address;
  listing.code = req.body.code;

 if(req.results) {
    listing.coordinates = {
      latitude: req.results.lat, 
      longitude: req.results.lng
    };
  }

  listing.save(function(err) {
    if(err) {
      console.log(err);
      res.status(400).send(err);
    } else {
      res.json(listing);
      console.log(listing)
    }
  });
};


exports.delete = function(req, res) {
  var listing = req.listing;

  listing.remove(function(err){
    if (err) throw err;

    res.end();
  });
};

exports.list = function(req, res) {
  var listing = req.listing;

     Listing.find({}, function(err, data){
    if (err){
      throw error;
    }

   res.send(data);
 })
};


exports.listingByID = function(req, res, next, id) {
  Listing.findById(id).exec(function(err, listing) {
    if(err) {
      res.status(400).send(err);
    } else {
      req.listing = listing;
      next();
    }
  });
};