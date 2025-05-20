const express = require('express');

const router = express.Router();
const postController = require('../controllers/postController');

router.get('/posts', postController.handleGetPostList)
router.get('/posts/:id', postController.handleGetPost)

module.exports = router