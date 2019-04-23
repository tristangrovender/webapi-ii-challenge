// import express from 'express'; // ES2015 Module Import
const express = require('express'); // CommonJS module import

const db = require('./data/db.js'); // **************************** add this line

const server = express();

server.use(express.json()); // ******************************** add this for POST

server.get('/', (req, res) => {
  res.send("It's alive!");
});

server.listen(4500, () => {
    console.log('\n** API up and running on port 4k **');
  });