const { Router } = require('express');
const JamSession = require('../models/JamSession');


module.exports = Router()
  .post('/', (req, res, next) => {
    const {
      where,
      when,
      who
    } = req.body;

    JamSession
      .create({
        where,
        when,
        who
      })
      .then(user => res.send(user))
      .catch(next);
  })
  .get('/', (req, res) => {
    JamSession
      .find()
      .select({ __v: false })
      .then(jamSessions => res.send(jamSessions));
  });
