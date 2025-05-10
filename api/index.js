require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const multer = require('multer');
const fs = require('fs');

const User = require('./models/User');
const Post = require('./models/Post');
const { storage } = require('./cloudinary');

const app = express();
const uploadMiddleware = multer({ storage });

const secret = process.env.SECRET_KEY;
const clientUrl = process.env.CLIENT_URL || 'http://localhost:5173';
const allowedOrigins = [clientUrl, 'https://blog-client-yourname.vercel.app'];

app.use(cors({
  credentials: true,
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  }
}));
app.use(express.json());
app.use(cookieParser());

mongoose.connect(process.env.MONGO_URL);

const salt = bcrypt.genSaltSync(10);

// Auth routes
app.post('/register', async (req, res) => {
  const { username, password } = req.body;
  try {
    const userDoc = await User.create({
      username,
      password: bcrypt.hashSync(password, salt),
    });
    res.json(userDoc);
  } catch (e) {
    res.status(400).json(e);
  }
});

app.post('/login', async (req, res) => {
  const { username, password } = req.body;
  const userDoc = await User.findOne({ username });
  if (!userDoc) return res.status(400).json('User not found');

  const passOk = bcrypt.compareSync(password, userDoc.password);
  if (passOk) {
    jwt.sign({ username, id: userDoc._id }, secret, {}, (err, token) => {
      if (err) return res.status(500).json('Token error');
      res.cookie('token', token).json({ id: userDoc._id, username });
    });
  } else {
    res.status(400).json('Wrong credentials');
  }
});

app.get('/profile', (req, res) => {
  const { token } = req.cookies;
  if (!token) return res.status(401).json({ error: 'Token missing' });

  jwt.verify(token, secret, {}, (err, info) => {
    if (err) return res.status(403).json({ error: 'Invalid token' });
    res.json(info);
  });
});

app.post('/logout', (req, res) => {
  res.cookie('token', '').json('ok');
});

// Post creation
// Updated Post creation - no file upload here
app.post('/post', async (req, res) => {
    try {
      const { token } = req.cookies;
      if (!token) return res.status(401).json({ error: 'Token missing' });
  
      jwt.verify(token, secret, {}, async (err, info) => {
        if (err) return res.status(403).json({ error: 'Invalid token' });
  
        const { title, summary, content, cover } = req.body;
        if (!cover) return res.status(400).json({ error: 'Cover image is required' });
  
        const postDoc = await Post.create({
          title,
          summary,
          content,
          cover, // Cloudinary URL comes from frontend
          author: info.id,
        });
  
        res.json(postDoc);
      });
    } catch (error) {
      console.error('Error in /post route:', error);
      res.status(500).json({ error: 'Server error' });
    }
  });
  
// Upload endpoint for Cloudinary
app.post('/upload', uploadMiddleware.single('file'), async (req, res) => {
    try {
      if (!req.file?.path) {
        return res.status(400).json({ error: 'No file uploaded' });
      }
  
      res.json({ url: req.file.path }); // Cloudinary returns URL in `path` when using multer-storage-cloudinary
    } catch (error) {
      console.error('Error in /upload:', error);
      res.status(500).json({ error: 'Upload failed' });
    }
  });
  

// Post update
// Updated Post editing - accepts Cloudinary URL from frontend
app.put('/post', async (req, res) => {
    const { token } = req.cookies;
    if (!token) return res.status(401).json({ error: 'Token missing' });
  
    jwt.verify(token, secret, {}, async (err, info) => {
      if (err) return res.status(403).json({ error: 'Invalid token' });
  
      const { id, title, summary, content, cover } = req.body;
  
      const postDoc = await Post.findById(id);
      const isAuthor = JSON.stringify(postDoc.author) === JSON.stringify(info.id);
      if (!isAuthor) return res.status(403).json({ error: 'You are not the author' });
  
      postDoc.title = title;
      postDoc.summary = summary;
      postDoc.content = content;
      if (cover) {
        postDoc.cover = cover; // use new image URL if provided
      }
  
      await postDoc.save();
      res.json(postDoc);
    });
  });
  

// Post list & detail
app.get('/post', async (req, res) => {
  const posts = await Post.find()
    .populate('author', ['username'])
    .sort({ createdAt: -1 })
    .limit(20);
  res.json(posts);
});

app.get('/post/:id', async (req, res) => {
  const postDoc = await Post.findById(req.params.id).populate('author', ['username']);
  res.json(postDoc);
});

app.listen(4000);
