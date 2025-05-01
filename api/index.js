const express = require('express');
const app = express();
const cors = require('cors');
const User = require('./models/User');
const Post = require('./models/Post');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const secret = 'revsv';
const cookieParser = require('cookie-parser');
const multer = require('multer');
const uploadMiddleware = multer({dest: 'uploads/'});
const fs = require('fs');


app.use(cors({credentials: true, origin: 'http://localhost:5173'}));
app.use(express.json());
app.use(cookieParser());
app.use('/uploads', express.static(__dirname + '/uploads'));

const salt = bcrypt.genSaltSync(10);

mongoose.connect('mongodb://localhost:27017/blog');
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
    const passOk = bcrypt.compareSync(password, userDoc.password);
    if(passOk) {
        // logged in
        jwt.sign({username, id: userDoc._id}, secret, {}, (err, token) => {
            if(err) throw err;
            res.cookie('token', token).json({
                id: userDoc._id,
                username,
            });
        })
    } else {
        res.status(400).json('wrong credentials');
    }
});

app.get('/profile', (req, res) => {
    const {token} = req.cookies;
    jwt.verify(token, secret, {}, (err, info) => {
        if(err) throw err;
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
      const newPath = path + '.' + ext;
  
      fs.renameSync(path, newPath);
      const normalizedPath = newPath.replace(/\\/g, '/');

      const { token } = req.cookies;
      jwt.verify(token, secret, {}, async (err, info) => {
        if (err) {
          return res.status(401).json({ error: 'Invalid token' });
        }
  
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
