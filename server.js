const express = require('express');
const server = express();
const studentsRoutes = require('./students/studentsRoutes');
const cohortsRoutes = require('./cohorts/cohortsRoutes');
server.use(express.json());

server.use('/api/cohorts/', cohortsRoutes);
server.use('/api/students/', studentsRoutes);


module.exports = server;