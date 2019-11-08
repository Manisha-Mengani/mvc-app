/**
*  Developer model
*  Describes the characteristics of each attribute in a developer resource.
*
* @author Gangadhar Yerramsetti
* @requires mongoose
*
*/
const mongoose = require('mongoose')

const StudentSchema = new mongoose.Schema({

  _id: {
    type: Number,
    required: true
  },
  email: {
    type: String,
    minlength: 5,
    maxlength: 100,
    required: true,
    unique: true
  },
  given: {
    type: String,
    minlength: 3,
    maxlength: 100,
    required: false,
    default: 'Given name'
  },
  family: {
    type: String,
    minlength: 3,
    maxlength: 100,
    required: false,
    default: 'Family name'
  },
  gpa: {
    type: Number,
    required: true
  },
  github: {
    type: String,
    minlength: 8,
    maxlength: 100,
    required: true,
    default: 'https://github.com/'
  },
  website: {
    type: String,
    minlength: 8,
    maxlength: 12,
    required: true,
    default: 'ttps://website.com/'
  },
  sectionid: {
    type: String,
    minlength: 5,
    maxlength: 100,
    required: true,
    
  }

})
module.exports = mongoose.model('Student', StudentSchema)
// the model Developer is for the developers collection in the database.
