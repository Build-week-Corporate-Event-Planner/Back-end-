const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const userDb = require('./userModel');


const router = express.Router();

router.post('/register', (req, res) => {
    const user = req.body;
    const hash = bcrypt.hashSync(user.password, 12);
    user.password = hash;

    userDb.create(user)
    .then(u => {
      console.log(u);
        res.status(201).json({message: `Welcome ${user.username}`})
        
    })
    .catch(err => {
        res.status(500).json({error: err})
    })

})

router.post('/login', (req, res) => {
    let {username, password} = req.body;
    userDb.findBy({username})
    .first()
    .then(u => {
      if (u && bcrypt.compareSync(password, u.password)) {
        const token = generateToken(u);
        res.status(200).json({message: `Hi ${u.username}`, token})
      } else {
        res.status(401).json({message: 'Easy there, you cannot pass'})
      }
    })
    .catch(err => {
      res.status(500).json(err);
    })
  });

  //after user logs in react would call a get on all the users event info
  
  function generateToken(user) {
    const payload = {
      subject: user.id,
      username: user.username
    }
    const secret =  "AliDaShizzyManizzy"
  const options = {
    expiresIn: '1h'
  }
  return jwt.sign(payload, secret, options);
  };


module.exports = router;