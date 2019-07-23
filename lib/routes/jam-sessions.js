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
  });
