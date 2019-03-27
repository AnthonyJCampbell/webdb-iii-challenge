const express = require('express');
const helmet = require('helmet');
const knex = require('knex');

const knexConfig = require('./knexfile');
const db = knex(knexConfig.development);

const server = express();


server.use(express.json());
server.use(helmet());


// POST REQUEST SAVES COHORT TO DB, RETURNS AN ARRAY WITH THE ID OF THE NEWLY-MADE COHORT
server.post('/api/cohorts', (req, res) => {
  const name = req.body;
  if (name.length < 2) {
    res.status(404).json({ 
      message: "You forgot to pass a name, silly!"
    })
  } else {
    db('cohorts')
      .insert(name)
      .then(data => {
        res.status(201).json(data)
      })
      .catch(err => {
        res.status(500).json({
          message: "Some useful error message. Your post request is no good" 
        })
      })
  }
})

// GET REQUEST RETURNS ARRAY OF ALL COHORTS
server.get('/api/cohorts', (req,res) => {
  db('cohorts')
  .then(data => {
    res.status(200).json(data)
  })
  .catch(() => {
    res.status(500).json({ 
      error: "Some useful error message, since you suck at making get requests" 
    })
  })
})

// GET REQUEST RETURNING THE COHORT OBJECT WITH THE SPECIFIED ID
server.get('/api/cohorts/:id', (req, res) => {
  const { id } = req.params;
  db('cohorts')
    .where({ id })
    .then(data => {
      res.status(200).json(data);
    })
    .catch(() => {
      res.status(500).json({ 
        "error": "Some useful error message, since you suck at making get by ID requests" 
      })
    })
})

// GET REQUEST TO RETURN ALL STUDENTS WITH THE SPECCIFIED COHORT_ID
server.get('/api/cohorts/:id/students', (req, res) => {
  const { id } = req.params
  db('cohorts')
    .join('students', {'students.cohort_id' : 'cohorts.id'})
    .where('cohort_id', '=', `${id}`)
    .then(data => {
      res.status(200).json(data);
    })
    .catch(() => {
      res.status(500).json({ 
        "error": "Some useful error message, since you suck at SQLITE" 
      })
    })
})

// UPDATES COHORT, RETURNS NUMBER OF RECORDS ALTERED
server.put('/api/cohorts/:id', (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
    db('cohorts')
      .where({ id })
      .update({ name })
      .then(data => {
        res.status(202).json(data);
      })
      .catch(() => {
        res.status(500).json({ 
          "error": "Some useful error message, since you suck at SQLITE" 
        })
      })
})

server.delete('/api/cohorts/:id', (req, res) => {
  const { id } = req.params;
  if(typeof id !== "number") {
    res.status(404).json({
      "error": "Hey, you forgot to give me a proper ID!" 
    })
  } else {
    db('cohorts')
      .where({ id })
      .del()
      .then(data => {
        res.status(200).json({ 
          "message": `Successfully deleted ${data} record(s)`
        });
      })
      .catch(() => {
        res.status(500).json({ 
          "error": "SOMETHING'S WRONG WITH YOUR DELETE YO!" 
        })
      })
  }
})

const port = 4000;
server.listen(port, () => { console.log(`Running on port ${port}`)})