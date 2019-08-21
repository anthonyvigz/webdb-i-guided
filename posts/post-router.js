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
    const postData = req.body;

    db('posts').insert(postData)
    .then(ids => {
        res.status(201).json({ newPost: ids[0] });
    })
    .catch(err => {
        res.status(500).json({ message: 'Failed to insert post.' })
    })
});


router.put('/:id', (req, res) => {
    const { id } = req.params;
    const changes = req.body;

    db('posts').where({ id }).update(changes)
    .then(count => {
        if (count) {
            res.json({ updated: count });
        } else {
            res.status(404).json({ message: 'Invalid post ID.' })
        }
    })
    .catch(err => {
        res.status(500).json({ message: 'Failed to update post.' })
    })
});

router.delete('/:id', (req, res) => {
    const { id } = req.params;

    db('posts').where({ id }).delete()
    .then(count => {
        res.status(201).json({ message: 'Successfully deleted post.'})
    })
    .catch(err => {
        res.status(500).json({ message: 'Failed to delete post.' })
    })
});

module.exports = router;