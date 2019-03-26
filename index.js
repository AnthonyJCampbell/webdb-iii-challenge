const express = require('express');
const helmet = require('helmet');
const knex = require('knex');

const knexConfig = require('./knexfile');
const db = knex(knexConfig.development);

const server = express();


server.use(express.json());
server.use(helmet());

server.get('/cohorts', (req,res) => {
  db('cohorts')
  .then(data => {
    res.status(200).json(data)
  })
})

const port = 4000;
server.listen(port, () => { console.log(`Running on port ${port}`)})