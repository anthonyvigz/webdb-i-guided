const express = require('express');

// database access using knex
const db = require('../data/db-config.js');

const router = express.Router();

router.get('/', (req, res) => {
    // SELECT * FROM Posts
    db('posts')
    .then((posts) => {
        res.json(posts)
    })
    .catch((error) => {
        res.status(500).json({ message: 'Failed to get posts.' })
    })
    
});

router.get('/:id', (req, res) => {
    const { id } = req.params;

    db('posts').where('id', id)
    .then((posts) => {
        const post = posts[0];

        if (post) {
            res.json(post);
        } else {
            res.status(404).json({ message: 'Invalid post ID' })
        }
    })
    .catch((error) => {
        res.status(500).json({ message: 'Failed to get post.' })
    })
});

router.post('/', (req, res) => {

});

router.put('/:id', (req, res) => {

});

router.delete('/:id', (req, res) => {

});

module.exports = router;