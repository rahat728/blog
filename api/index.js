require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const User = require('./models/User');
const Post = require('./models/Post');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const multer = require('multer');
const uploadMiddleware = multer({ dest: 'uploads/' });
const fs = require('fs');

const secret = process.env.SECRET_KEY;
const clientUrl = process.env.CLIENT_URL || 'http://localhost:5173';
const allowedOrigins = [clientUrl, 'https://blog-client-yourname.vercel.app']; // Update this with your actual frontend URL

app.use(cors({ 
    credentials: true, 
    origin: function(origin, callback) {
        if(!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    }
}));
app.use(express.json());
app.use(cookieParser());
app.use('/uploads', express.static(__dirname + '/uploads'));

const salt = bcrypt.genSaltSync(10);

mongoose.connect(process.env.MONGO_URL);

app.post('/register', async (req, res) => {
    const {username, password} = req.body;

    try {
        
    const userDoc = await User.create({
        username, 
        password: bcrypt.hashSync(password, salt)
    });
       res.json(userDoc);
    } catch (e) {
        res.status(400).json(e);
    }
});

app.post('/login', async (req, res) => {
  const {username, password} = req.body;
  const userDoc = await User.findOne({username});
  if (!userDoc) {
      return res.status(400).json('User not found');
  }
  const passOk = bcrypt.compareSync(password, userDoc.password);
  if (passOk) {
      jwt.sign({username, id: userDoc._id}, secret, {}, (err, token) => {
          if (err) return res.status(500).json('Token error');
          res.cookie('token', token).json({id: userDoc._id, username});
      });
  } else {
      res.status(400).json('Wrong credentials');
  }
});


app.get('/profile', (req, res) => {
  const {token} = req.cookies;
  if (!token) {
      return res.status(401).json({error: 'Token missing'});
  }
  jwt.verify(token, secret, {}, (err, info) => {
      if (err) return res.status(403).json({error: 'Invalid token'});
      res.json(info);
  });
});

app.post('/logout', (req, res) => {
    res.cookie('token', '').json('ok');
});


app.post('/post', uploadMiddleware.single('file'), async (req, res) => {
  try {
      if (!req.file) {
          return res.status(400).json({ error: 'No file uploaded' });
      }

      const { originalname, path } = req.file;
      const ext = originalname.split('.').pop();
      const newPath = `${path}.${ext}`;
      fs.renameSync(path, newPath);
      const normalizedPath = newPath.replace(/\\/g, '/');

      const { token } = req.cookies;
      if (!token) {
          return res.status(401).json({ error: 'Token missing' });
      }

      jwt.verify(token, secret, {}, async (err, info) => {
          if (err) return res.status(403).json({ error: 'Invalid token' });

          const { title, summary, content } = req.body;
          const postDoc = await Post.create({
              title,
              summary,
              content,
              cover: normalizedPath,
              author: info.id,
          });

          res.json(postDoc);
      });
  } catch (error) {
      console.error('Error in /post route:', error);
      res.status(500).json({ error: 'Server error' });
  }
});
app.put('/post', uploadMiddleware.single('file'), async (req, res) => {
  let newPath = null;
  if (req.file) {
      const { originalname, path } = req.file;
      const ext = originalname.split('.').pop();
      newPath = `${path}.${ext}`;
      fs.renameSync(path, newPath);
  }

  const { token } = req.cookies;
  if (!token) {
      return res.status(401).json({ error: 'Token missing' });
  }

  jwt.verify(token, secret, {}, async (err, info) => {
      if (err) return res.status(403).json({ error: 'Invalid token' });

      const { id, title, summary, content } = req.body;
      const postDoc = await Post.findById(id);
      const isAuthor = JSON.stringify(postDoc.author) === JSON.stringify(info.id);
      if (!isAuthor) {
          return res.status(403).json({ error: 'You are not the author' });
      }

      postDoc.title = title;
      postDoc.summary = summary;
      postDoc.content = content;
      if (newPath) postDoc.cover = newPath;
      await postDoc.save();

      res.json(postDoc);
  });
});


  app.get('/post', async (req,res) => {
    res.json(
      await Post.find()
        .populate('author', ['username'])
        .sort({createdAt: -1})
        .limit(20)
    );
  });

  app.get('/post/:id', async (req, res) => {
    const {id} = req.params;
    const postDoc = await Post.findById(id).populate('author', ['username']);
    res.json(postDoc);
  })
  

app.listen(4000);
