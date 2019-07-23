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
  .get('/', (req, res, next) => {
    JamSession
      .find()
      .select({ __v: false })
      .then(jamSessions => res.send(jamSessions))
      .catch(next);
  })
  .get('/:id', (req, res, next) => {
    JamSession
      .findById(req.params.id)
      .select({ __v: false })
      .then(jamSession => res.send(jamSession))
      .catch(next);
  })
  .put('/:id', (req, res, next) => {
    const {
      where,
      when,
      who
    } = req.body;

    JamSession
      .findByIdAndUpdate(req.params.id, {
        where,
        when,
        who
      }, { new: true })
      .select({ __v: false })
      .then(jamSession => res.send(jamSession))
      .catch(next);
  })
  .delete('/:id', (req, res, next) => {
    JamSession
      .findByIdAndDelete(req.params.id)
      .then(jamSession => res.send(jamSession))
      .catch(next);
  });
