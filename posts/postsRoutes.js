const express = require('express');

const router = express.Router();

const db = require('../data/db');

// POSTS ROUTES

// POST: /api/posts 
// Creates a post using the information sent inside the request body.
router.post('/', (req, res) => {
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
  router.get('/', (req, res) => {
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
  router.get('/:id', (req, res) => {
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
  router.delete('/:id', (req, res) => {
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
  router.put('/:id', (req, res) => {
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

module.exports = router;