const express = require('express');
const axios = require('axios');
const Post = require('../models/Post');

const router = express.Router();

router.get('/fetch', async (req, res) => {
  try {
    const response = await axios.get('https://jsonplaceholder.typicode.com/posts');
    await Post.insertMany(response.data);
    res.json({ message: 'Data fetched and saved successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch data' });
  }
});

router.get('/posts', async (req, res) => {
  try {
    const posts = await Post.find();
    res.json(posts);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve posts' });
  }
});


router.get('/posts/:id', async (req, res) => {
  try {
    const post = await Post.findOne({ id: req.params.id });
    if (!post) return res.status(404).json({ message: 'Post not found' });
    res.json(post);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve the post' });
  }
});


router.post('/posts', async (req, res) => {
  try {
    const newPost = new Post(req.body);
    await newPost.save();
    res.status(201).json(newPost);
  } catch (error) {
    res.status(400).json({ error: 'Failed to create post' });
  }
});


router.put('/posts/:id', async (req, res) => {
  try {
    const updatedPost = await Post.findOneAndUpdate({ id: req.params.id }, req.body, { new: true });
    if (!updatedPost) return res.status(404).json({ message: 'Post not found' });
    res.json(updatedPost);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update post' });
  }
});


router.delete('/posts/:id', async (req, res) => {
  try {
    const deletedPost = await Post.findOneAndDelete({ id: req.params.id });
    if (!deletedPost) return res.status(404).json({ message: 'Post not found' });
    res.json({ message: 'Post deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete post' });
  }
});

module.exports = router;
