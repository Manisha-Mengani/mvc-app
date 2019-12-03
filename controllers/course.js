

/**
*  Course controller
*  Handles requests related to course resources.
*
* @author Sushmita Rudra <Sushmitarudra@nwmissouri.edu>
*
*/




const express = require('express')
const api = express.Router()
const CourseSchema = require('../models/course.js')
const LOG = require('../utils/logger.js')
const notfoundstring = 'Could not find developer with id='

// RESPOND WITH JSON DATA  --------------------------------------------

// GET all JSON
api.get('/findall', (req, res) => {
  LOG.info(`Handling /findall ${req}`)
  CourseSchema.find({}, (err, data) => {
    if (err) { return res.end('Error finding all') }
    res.json(data)
  })
})

// GET one JSON by ID
api.get('/findone/:id', (req, res) => {
  LOG.info(`Handling /findone ${req}`)
  const id = parseInt(req.params.id)
  CourseSchema.find({ _id: id }, (err, results) => {
    if (err) { return res.end(`notfoundstring ${id}`) }
    res.json(results[0])
  })
})

// RESPOND WITH VIEWS  --------------------------------------------

// GET to this controller base URI (the default)
api.get('/', (req, res) => {
  LOG.info(`Handling GET / ${req}`)
  CourseSchema.find({}, (err, data) => {
    if (err) { return res.end('Error') }
    res.locals.courses = data
    res.render('course/index.ejs')
  })
})

// GET create
api.get('/create', (req, res) => {
  LOG.info(`Handling GET /create ${req}`)
  CourseSchema.find({}, (err, data) => {
    if (err) { return res.end('error on create') }
    res.locals.courses = data
    res.locals.course = new CourseSchema()
    res.render('course/create')
  })
})

// GET /delete/:id
api.get('/delete/:id', (req, res) => {
  LOG.info(`Handling GET /delete/:id ${req}`)
  const id = parseInt(req.params.id)
  CourseSchema.find({ _id: id }, (err, results) => {
    if (err) { return res.end(notfoundstring) }
    LOG.info(`RETURNING VIEW FOR ${JSON.stringify(results)}`)
    res.locals.course = results[0]
    return res.render('course/delete')
  })
})


// GET /details/:id
api.get('/details/:id', (req, res) => {
  LOG.info(`Handling GET /details/:id ${req}`)
  const id = parseInt(req.params.id)
  CourseSchema.find({ _id: id }, (err, results) => {
    if (err) { return res.end(notfoundstring) }
    LOG.info(`RETURNING VIEW FOR ${JSON.stringify(results)}`)
    res.locals.course = results[0]
    return res.render('course/details')
  })
})

// GET one
api.get('/edit/:id', (req, res) => {
  LOG.info(`Handling GET /edit/:id ${req}`)
  const id = parseInt(req.params.id)
  CourseSchema.find({ _id: id }, (err, results) => {
    if (err) { return res.end(notfoundstring) }
    LOG.info(`RETURNING VIEW FOR${JSON.stringify(results)}`)
    res.locals.course = results[0]
    return res.render('course/edit')
  })
})

// RESPOND WITH DATA MODIFICATIONS  -------------------------------

// POST new
api.post('/save', (req, res) => {
  console.info(`Handling POST ${req}`)
  console.debug(JSON.stringify(req.body))
  const item = new CourseSchema()
  console.info(`NEW ID ${req.body._id}`)
  item._id = parseInt(req.body._id)
  item.schoolnumber = req.body.schoolnumber
  item.coursenumber = req.body.coursenumber
  item.name = req.body.name
  item.inspring = req.body.availability === 'inspring' ? true : false
  item.insummer = req.body.availability === 'insummer' ? true : false
  item.infall = req.body.availability === 'infall' ? true : false
  // res.send(`THIS FUNCTION WILL SAVE A NEW course ${JSON.stringify(item)}`)
  item.save((err) => {
    if (err) { return res.end('ERROR: item could not be saved '+ err.message) }
    LOG.info(`SAVING NEW item ${JSON.stringify(item)}`)
    return res.redirect('/course')
  })
})

// POST update with id
api.post('/save/:id', (req, res) => {
  LOG.info(`Handling SAVE request ${req}`)
  const id = parseInt(req.params.id)
  LOG.info(`Handling SAVING ID=${id}`)

  let courseData = {
    schoolnumber: req.body.schoolnumber,
    coursenumber: req.body.coursenumber,
    name: req.body.name
  }
  courseData.inspring = req.body.availability === 'inspring' ? true : false
  courseData.insummer = req.body.availability === 'insummer' ? true : false
  courseData.infall = req.body.availability === 'infall' ? true : false
  CourseSchema.updateOne({ _id: id },
    { // use mongoose field update operator $set
      $set: courseData
    },
    (err, item) => {
      if (err) { return res.end(notfoundstring) }
      LOG.info(`ORIGINAL VALUES ${JSON.stringify(item)}`)
      LOG.info(`UPDATED VALUES: ${JSON.stringify(req.body)}`)
      LOG.info(`SAVING UPDATED item ${JSON.stringify(item)}`)
      return res.redirect('/course')
    })
})

// DELETE id (uses HTML5 form method POST)
api.post('/delete/:id', (req, res) => {
  LOG.info(`Handling DELETE request ${req}`)
  const id = parseInt(req.params.id)
  LOG.info(`Handling REMOVING ID=${id}`)

  SectionSchema.findOne({ courseId: id }, (err, results) => {
    if (err) {
      return res.end(`Invalid course is available with given ID: ${err}`)
    } else if (results) {
      return res.end(`Course can't be deleted it is assigined with one/more section`)
    } else {
      CourseSchema.deleteOne({ _id: id }).setOptions({ single: true }).exec((err, deleted) => {
        if (err) { return res.end(notfoundstring) }
        console.log(`Permanently deleted item ${JSON.stringify(deleted)}`)
        return res.redirect('/course')
      })
    }
  })

})


module.exports = api