var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Distributions = new Schema({
  Name:{
    type:String,
    required:true,
    unique:true
  },
  Registrations: [
    {
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
     Language:{
       type:String
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
        type:String
      }
  }],
  Version:{
    type:Boolean,
    default:false
  },
  Date: {
    type: String,
    required: true
  }
});
const distribution=mongoose.model('Distributions',Distributions);
module.exports=distribution;