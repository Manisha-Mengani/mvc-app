/**
*  Developer model
*  Describes the characteristics of each attribute in a developer resource.
*
* @author Sushmita Rudra
* @requires mongoose
*
*/
const mongoose = require('mongoose')

const CourseSchema = new mongoose.Schema({

  _id: {
    type: Number,
    required: true
  },
  schoolnumber: {
    type: String,
    minlength: 5,
    maxlength: 100,
    required: true
   
  },
  coursenumber: {
    type: String,
    minlength: 3,
    maxlength: 100,
    required: false,
    default: 'Given name'
  },
  name: {
    type: String,
    minlength: 3,
    maxlength: 100,
    required: false,
    default: 'name'
  },
  inspring: {
    type: Boolean,
    required: true
  },
  insummer: {
    type: Boolean,
   
    required: true,
    
  },
  infall: {
    type: Boolean,
   
    required: true,

  }

})
module.exports = mongoose.model('Course', CourseSchema)
// the model Developer is for the developers collection in the database.
