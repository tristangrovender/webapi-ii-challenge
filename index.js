// import express from 'express'; // ES2015 Module Import
const express = require('express'); // CommonJS module import

const postsRoutes = require('./posts/postsRoutes');

const server = express();

server.use(express.json()); // What is this for again?

server.use('/api/posts', postsRoutes);

server.use('/', (req, res) => {
  res.status(200).send("It's alive!!");
});

server.listen(4500, () => {
    console.log('\n** API up and running on port 4k **');
  });