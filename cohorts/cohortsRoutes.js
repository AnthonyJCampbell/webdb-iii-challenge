const express = require('express');
const cohortsDB = require('../data/helpers/cohortsDb');

const router = express.Router();

router.use(express.json());

// POST REQUEST SAVES COHORT TO DB, RETURNS AN ARRAY WITH THE ID OF THE NEWLY-MADE COHORT
router.post('/', (req, res) => {
  
  const name = req.body;
  if (name.length < 2) {
    res.status(404).json({ 
      message: "You forgot to pass a name, silly!"
    })
  } else {
    cohortsDB.insert(name)
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
router.get('/', (req,res) => {
  console.log('made it')
  cohortsDB.get()
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
router.get('/:id', (req, res) => {
  const { id } = req.params;
  cohortsDB.getById(id)
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
router.get('/:id/students', (req, res) => {
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
router.put('/:id', (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  cohortsDB.update(id, name)
    .then(data => {
      res.status(202).json(data);
    })
    .catch(() => {
      res.status(500).json({ 
        "error": "Some useful error message, since you suck at SQLITE" 
      })
    })
})

router.delete('/:id', (req, res) => {
  const { id } = req.params;
  if(typeof id !== "number") {
    res.status(404).json({
      "error": "Hey, you forgot to give me a proper ID!" 
    })
  } else {
    cohortsDB.remove(id)
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

module.exports = router;