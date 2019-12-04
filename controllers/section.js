/**
*  section controller
*  Handles requests related to developer resources.
*
* @author Manisha Mengani
*
*/

const express = require('express')
const api = express.Router()
const SectionSchema = require('../models/section.js')
const CourseModal = require('../models/course.js')
const find = require('lodash.find')
const LOG = require('../utils/logger.js')
const notfoundstring = 'Could not find section with id='

// RESPOND WITH JSON DATA  --------------------------------------------

// GET all JSON
api.get('/findall', (req, res) => {
  LOG.info(`Handling /findall ${req}`)
  SectionSchema.find({}, (err, data) => {
    if (err) { return res.end('Error finding all') }
    res.json(data)
  })
})

// GET one JSON by ID
api.get('/findone/:id', (req, res) => {
  LOG.info(`Handling /findone ${req}`)
  const id = parseInt(req.params.id)
  SectionSchema.find({ _id: id }, (err, results) => {
    if (err) { return res.end(`notfoundstring ${id}`) }
    res.json(results[0])
  })
})
//test
// RESPOND WITH VIEWS  --------------------------------------------

// GET to this controller base URI (the default)
api.get('/', (req, res) => {
  LOG.info(`Handling GET / ${req}`)
  SectionSchema.find({}, (err, data) => {
    if (err) { return res.end('Error') }
    res.locals.sections = data
    res.render('section/index')
  })
})

// GET create
api.get('/create', (req, res) => {
  LOG.info(`Handling GET /create ${req}`)
  SectionSchema.find({}, (err, data) => {
    if (err) { return res.end('error on create') }
    res.locals.sections = data
    res.locals.section = new SectionSchema()
    res.render('section/create')
  })
})

// GET /delete/:id
api.get('/delete/:id', (req, res) => {
  LOG.info(`Handling GET /delete/:id ${req}`)
  const id = parseInt(req.params.id)
  SectionSchema.find({ _id: id }, (err, results) => {
    if (err) { return res.end(notfoundstring) }
    LOG.info(`RETURNING VIEW FOR ${JSON.stringify(results)}`)
    res.locals.section = results[0]
    return res.render('section/delete.ejs')
  })
})

// GET /details/:id
api.get('/details/:id', (req, res) => {
  LOG.info(`Handling GET /details/:id ${req}`)
  const id = parseInt(req.params.id)
  SectionSchema.find({ _id: id }, (err, results) => {
    if (err) { return res.end(notfoundstring) }
    LOG.info(`RETURNING VIEW FOR ${JSON.stringify(results)}`)
    res.locals.section = results[0]
    return res.render('section/details.ejs')
  })
})

// GET one
api.get('/edit/:id', (req, res) => {
  LOG.info(`Handling GET /edit/:id ${req}`)
  const id = parseInt(req.params.id)
  SectionSchema.find({ _id: id }, (err, results) => {
    if (err) { return res.end(notfoundstring) }
    LOG.info(`RETURNING VIEW FOR${JSON.stringify(results)}`)
    res.locals.section = results[0]
    return res.render('section/edit.ejs')
  })
})

// HANDLE EXECUTE DATA MODIFICATION REQUESTS --------------------------------------------

// POST new

api.post('/save', (req, res) => {
  
  LOG.info(`Handling POST ${req}`)
  LOG.debug(JSON.stringify(req.body))

  CourseModal.findOne({ _id: req.body.CourseID }, (err, results) => {
    if (err || !results) {
      console.log(results);
      return res.end(`Invalid course is available with given ID: ${req.body.courseId}`)
    } else {
      const item = new SectionSchema()
      LOG.info(`NEW ID ${req.body._id}`)
      item._id = parseInt(req.body._id)
      item.SectionNumber = req.body.SectionNumber
      item.Days = req.body.Days
      item.StartTime = req.body.StartTime
      item.RoomNumber = req.body.RoomNumber
      item.InstructorID = req.body.InstructorID
      item.CourseID = req.body.CourseID
      item.save((err) => {
        if (err) { 
          console.log(err);
          return res.end('ERROR: item could not be saved', err) 
        }
        LOG.info(`SAVING NEW item ${JSON.stringify(item)}`)
        return res.redirect('/section')
      })
    }
  })

})

// POST update with id
api.post('/save/:id', (req, res) => {
  LOG.info(`Handling SAVE request ${req}`)
  const id = parseInt(req.params.id)
  LOG.info(`Handling SAVING ID=${id}`)

  SectionSchema.updateOne({ _id: id },
    { // use mongoose field update operator $set
      $set: {
        SectionNumber: req.body.SectionNumber,
        Days: req.body.Days,
        StartTime: req.body.StartTime,
        RoomNumber: req.body.RoomNumber,
        InstructorId: req.body.InstructorID,
        CourseId: req.body.CourseID
      }
    },
    (err, item) => {
      if (err) { return res.end(notfoundstring) }
      LOG.info(`ORIGINAL VALUES ${JSON.stringify(item)}`)
      LOG.info(`UPDATED VALUES: ${JSON.stringify(req.body)}`)
      LOG.info(`SAVING UPDATED item ${JSON.stringify(item)}`)
      return res.redirect('/section')
    })
})

// DELETE id (uses HTML5 form method POST)
api.post('/delete/:id', (req, res) => {
  LOG.info(`Handling DELETE request ${req}`)
  const id = parseInt(req.params.id)
  LOG.info(`Handling REMOVING ID=${id}`)
  SectionSchema.remove({ _id: id }).setOptions({ single: true }).exec((err, deleted) => {
    if (err) { return res.end(notfoundstring) }
    console.log(`Permanently deleted item ${JSON.stringify(deleted)}`)
    return res.redirect('/section')
  })
})

module.exports = api