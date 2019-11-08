/**
*  Developer controller
*  Handles requests related to developer resources.
*
* @author Manisha Mengani
*
*/
const express = require('express')
const api = express.Router()
const Model = require('../models/section.js')
const find = require('lodash.find')
const notfoundstring = 'Could not find developer with id='

// RESPOND WITH JSON DATA  --------------------------------------------

// GET all JSON
api.get('/findall', (req, res) => {
  res.setHeader('Content-Type', 'application/json')
  const data = req.app.locals.sections.query
  res.send(JSON.stringify(data))
})

// GET one JSON by ID
api.get('/findone/:id', (req, res) => {
  res.setHeader('Content-Type', 'application/json')
  const id = parseInt(req.params.id)
  const data = req.app.locals.sections.query
  const item = find(data, { _id: id })
  if (!item) { return res.end(notfoundstring + id) }
  res.send(JSON.stringify(item))
})

// RESPOND WITH VIEWS  --------------------------------------------

// GET to this controller base URI (the default)
api.get('/', (req, res) => {
  res.render('section/index.ejs', {
    sections: req.app.locals.sections.query
  })
})

// GET create
api.get('/create', (req, res) => {
  res.render('section/create', {
    sections: req.app.locals.sections.query,
    section: new Model()
  })
})

// GET /delete/:id
api.get('/delete/:id', (req, res) => {
  const id = parseInt(req.params.id)
  const data = req.app.locals.sections.query
  const item = find(data, { _id: id })
  if (!item) { return res.end(notfoundstring + id) }
  res.render('section/delete', {
    section: item
  })
})

// GET /details/:id
api.get('/details/:id', (req, res) => {
  const id = parseInt(req.params.id)
  const data = req.app.locals.sections.query
  const item = find(data, { _id: id })
  if (!item) { return res.end(notfoundstring + id) }
  res.render('section/details', {
    section: item
  })
})

// GET one
api.get('/edit/:id', (req, res) => {
  const id = parseInt(req.params.id)
  const data = req.app.locals.sections.query
  const item = find(data, { _id: id })
  if (!item) { return res.end(notfoundstring + id) }
  res.render('section/edit', {
    section: item
  })
})

// HANDLE EXECUTE DATA MODIFICATION REQUESTS --------------------------------------------

// POST new


api.post('/save', (req, res) => {
    console.info(`Handling POST ${req}`)
    console.debug(JSON.stringify(req.body))
    const item = new Model()
    console.info(`NEW ID ${req.body._id}`)
    item._id = parseInt(req.body._id)
    item.sectionNo  = req.body.sectionNumber 
    item.Days = req.body.Days
    item.StartTime = req.body.StartTime
    item.RoomNumber = req.body.RoomNumber
    item.CourseID = req.body.CourseID
    res.send(`THIS FUNCTION WILL SAVE A NEW Section ${JSON.stringify(item)}`)
  }) 
   
  

// POST update with id
api.post('/save/:id', (req, res) => {
  console.info(`Handling SAVE request ${req}`)
  const id = parseInt(req.params.id)
  console.info(`Handling SAVING ID=${id}`)
  res.send(`THIS FUNCTION WILL SAVE CHANGES TO AN EXISTING section with id=${id}`)
})

// DELETE id (uses HTML5 form method POST)
api.post('/delete/:id', (req, res) => {
  console.info(`Handling DELETE request ${req}`)
  const id = parseInt(req.params.id)
  console.info(`Handling REMOVING ID=${id}`)
  res.send(`THIS FUNCTION WILL DELETE FOREVER THE EXISTING section with id=${id}`)
})

module.exports = api
