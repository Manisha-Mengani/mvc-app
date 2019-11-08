const Datastore = require('nedb') // set up a temporary (in memory) database
const developerData = require('../data/developers.json') // read in data file
const StudentData = require('../data/student.json')
const instructorData=require('../data/instructor.json')
const sectionData=require('../data/section.json')
const courseData=require('../data/course.json')
// inject Express app to configure it - EVERYTHING in through argument list

module.exports = (app) => {
  console.log('START data seeder.')
  const db = {} // empty object to hold all collections

  db.developers = new Datastore() // new object property
  db.developers.loadDatabase() // call the loadDatabase method
  db.students = new Datastore()
  db.courses=new Datastore()
  db.instructors=new Datastore()
  db.sections=new Datastore()
  
  // insert the sample data into our datastore
  db.developers.insert(developerData)
  db.students.insert(StudentData)
  db.courses=new Datastore()
  db.instructors.insert(instructorData)
  db.sections.insert(sectionData)
 



  // initialize app.locals (these objects are available to the controllers)
  app.locals.developers = db.developers.find(developerData)
  app.locals.students = db.students.find(StudentData)
  app.locals.courses = db.courses.find(courseData)
  app.locals.instructors = db.instructors.find(instructorData)
  app.locals.sections = db.sections.find(sectionData)

 


  console.log(`${app.locals.developers.query.length} developers seeded`)
  console.log(`${app.locals.students.query.length} students seeded`)
  console.log(`${app.locals.courses.query.length} courses seeded`)
  console.log(`${app.locals.instructors.query.length} instructors seeded`)
  console.log(`${app.locals.sections.query.length} sections seeded`)




  console.log('END Data Seeder. Sample data read and verified.')
}
