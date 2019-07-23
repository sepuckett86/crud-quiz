const mongoose = require('mongoose');

const jamSessionSchema = new mongoose.Schema({
  where: {
    type: String,
    required: true
  },
  when: {
    type: Date,
    required: true
  },
  who: [String]
});

const JamSession = mongoose.model('JamSession', jamSessionSchema);

module.exports = JamSession;
