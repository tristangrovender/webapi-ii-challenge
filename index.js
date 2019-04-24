// import express from 'express'; // ES2015 Module Import
const express = require('express'); // CommonJS module import

const db = require('./data/db.js'); // **************************** add this line

const server = express();

server.use(express.json()); // ******************************** add this for POST

server.get('/', (req, res) => {
  res.send("It's alive!!");
});

// POST: /api/posts 
// Creates a post using the information sent inside the request body.
server.post('/api/posts', (req, res) => {
  const post = req.body;
  if (!post.title || !post.contents)
    return res.status(400).json({
      errorMessage: "Please provide title and contents for the post." 
    })
    db
    .insert(post)
    .then(post => {
      res.status(201).json(post);
    })
    .catch(err => {
      res.status(500).json({
        error: "There was an error while saving the post to the database"
      });
    })
})

// GET: /api/posts 
// Returns an array of all the post objects contained in the database.
server.get('/api/posts', (req, res) => {
  db
  .find()
  .then(posts => {
    res.status(200).json(posts)
  })
  .catch(err => {
    res.status(500).json({ 
      error: "The posts information could not be retrieved." 
    })
  })
})

// GET: /api/posts 
// Returns the post object with the specified id.
server.get('/api/posts/:id', (req, res) => {
  const {id} = req.params;

  db.findById(id)
    .then(([post]) => {
      if (!post)
        return res.status(404).json({ 
          message: "The post with the specified ID does not exist." 
        });

      return res.status(200).json([post]);
    })
    .catch(err => {
      res.status(500).json({
        error: "The post information could not be retrieved."
      });
    });
});

// DELETE: /api/posts/:id
// Removes the post with the specified id and returns the deleted post object. 
// You may need to make additional calls to the database in order to satisfy this requirement.
server.delete('/api/posts/:id', (req, res) => {
  const { id } = req.params;

    db.remove(id)
        .then(posts => {
            if (!posts)
                return res.status(404).json({
                    message: "The user with the specified ID does not exist."
                });

            return res.status(200).json(posts);
        })
        .catch(err => {
            res.status(500).json({ error: "The user could not be removed" });
        });
})

// PUT: /api/posts/:id
// Updates the post with the specified id using data from the request body. 
// Returns the modified document, NOT the original.
server.put('/api/posts/:id', (req, res) => {
  const postID = req.params.id;
  const postBody = req.body;

  if ( !postBody.title || !postBody.contents ) {
    res.status(400).json({ errorMessage: "Please provide title and contents for the post." })
  }

  db
  .update(postID, postBody)
  .then(newPost => {
      if ( newPost ) {
          res.status(200).json(newPost)
      } else {
      res.status(404).json({ message: "The post with the specified ID does not exist." })}
  })
  .catch(error => {
      res.status(500).json({ error: "The post information could not be modified." })
  })


})

server.listen(4500, () => {
    console.log('\n** API up and running on port 4k **');
  });