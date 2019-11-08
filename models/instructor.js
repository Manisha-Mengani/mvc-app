/**
*  Developer model
*  Describes the characteristics of each attribute in a developer resource.
*
* @author Manisha Mengani
* @requires mongoose
*
*/
const mongoose = require('mongoose')

const InstructorSchema = new mongoose.Schema({

  _id: {
    type: Number,
    required: true
  },
  Given: {
    type: String,
    minlength: 3,
    maxlength: 100,
    required: false,
    default: 'Given name'
  },
  Family: {
    type: String,
    minlength: 3,
    maxlength: 100,
    required: false,
    default: 'Family name'
  },
  Email: {
    type: String,
    minlength: 5,
    maxlength: 100,
    required: true,
    unique: true
  },
  Salary: {
      type:Number,
      required: true,
  },
  GitHub: {
    type:String,
    required: true,
    minlength:8,
    maxlength:10
}
})
module.exports = mongoose.model('instructor', InstructorSchema)
// the model Developer is for the developers collection in the database.
