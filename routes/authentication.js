const express = require('express');
const bcryptjs = require('bcryptjs');
const router = new express.Router();

const User = require('./../models/user');

router.get('/sign-up', (req, res, next) => {
  res.render('sign-up');
});

router.post('/sign-up', (req, res, next) => {
  const data = req.body;

  User.findOne({
    email: data.email
  })
    .then((user) => {
      if (user) {
        throw new Error('There is already a user with that email.');
      } else {
        return bcryptjs.hash(data.password, 10);
      }
    })
    .then((passwordHashAndSalt) => {
      return User.create({
        name: data.name,
        email: data.email,
        passwordHashAndSalt: passwordHashAndSalt
      });
    })
    .then(() => {
      res.redirect('/');
    })
    .catch((error) => {
      next(error);
    });
});

module.exports = router;
