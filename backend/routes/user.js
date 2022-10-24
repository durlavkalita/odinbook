var express = require('express');
var router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const passport = require('passport');
require('../auth');

// POST register users
router.post('/register', (req,res,next)=>{
  const user = new User({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email
  });

  bcrypt.hash(req.body.password, 10, (error, hashedPassword)=> {
    if(error) {return next(error);}
    user.set('password', hashedPassword);
    user.save(error=> {
        if(error) {return next(error);}
        jwt.sign({user}, 'secretKey', {expiresIn: '1d'},(error,token)=>{
          if(error) {return next(error);}
          res.json({
              token, user
          })
        });
    })
  });
});

router.post('/login', async (req, res, next)=> {
  passport.authenticate('login', {session: false}, async (err,user)=>{
    try {
        if(err || !user) {
            return next(err);
        }

        req.login(user, {session: false}, async(error)=>{
            if(error) return next(error);
            
            const body = {_id: user._id, email: user.email};
            const token = jwt.sign({ user: body }, 'secretKey', {expiresIn: '1d'});

            return res.json({ token, body });
        })
    } catch (error) {
        return next(error);
    }
  })(req, res, next);
});

module.exports = router;