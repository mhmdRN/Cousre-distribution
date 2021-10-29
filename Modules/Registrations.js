var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Registration = new Schema({
  Course_Code: {
    type: String,
    required: true
  },
  DFile_number: {
    type: String,
    required: true
  },
  Facility_year: {
    type: String,
    required: true
  },
  Language: {
    type: String
  },
 
  Lab: {
    type: Boolean
  },
  Exercise: {
    type: Boolean
  },
  Course: {
    type: Boolean
  },
  Lab_hours: {
    type: Number
  },
  Exercise_hours: {
    type: Number
  },
  Course_hours: {
    type: Number
  },
  Section_ID: {
    type: String
  },
  Location:{
    type:String,
    default:"Lebanese University-Faculty of Science - Hadath"
  }
});
const registration=mongoose.model('Registrations',Registration);
module.exports=registration;