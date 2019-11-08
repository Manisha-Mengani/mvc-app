
/**
*  Section model
*  Describes the characteristics of each attribute in a section resource.
*
* @author Manisha Mengani
* @requires mongoose
*
*/
const mongoose = require('mongoose')

const SectionSchema = new mongoose.Schema({

  _id: {
    type: Number,
    required: true
  },
  SectionNumber: {
    type: String,
    minlength: 2,
    maxlength: 2,
    required: true,
    unique: true
  },
  Days: {
    type: String,
    minlength: 0,
    maxlength: 10,
    required: true,
    },
  StartTime: {
    type: Number,
    minlength: 0,
    maxlength: 10,
    required: true,
    },
  RoomNumber: {
    type: String,
    minlength: 1,
    maxlength: 10,
    required: true,
  },
  InstructorID: {
    type: Number,
    minlength: 1,
    maxlength: 10,
    required: true,
    },
  CourseID: {
    type: Number,
    minlength: 1,
    maxlength: 10,
    required: true,
  }

})
module.exports = mongoose.model('section', SectionSchema)
// the model Developer is for the developers collection in the database.
