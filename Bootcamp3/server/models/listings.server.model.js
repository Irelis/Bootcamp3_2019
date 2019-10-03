var mongoose = require('mongoose'), 
    Schema = mongoose.Schema;

var listingSchema = new Schema({
  code: {type: String, required: true, unique: true},
  name: {type: String, required: true},
  coordinates:{
    latitude: Number,
    longitude: Number
  },
  address: String,

  created_at: Date,
  updated_at: Date
})

listingSchema.pre('save', function(next) {
  var currentDate = new Date();
  this.updated_at = currentDate;

  if (!this.created_at)
    this.created_at = currentDate;

    next();
  next();
});

var Listing = mongoose.model('Listing', listingSchema);

module.exports = Listing;
