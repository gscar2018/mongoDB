const mongoose = require('mongoose');

const dataSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  budget: {
    type: Number,
    required: true
  },
  color: {
    type: String,
    required: true,
    match: /^#[0-9A-Fa-f]{6}$/
  }
}, { collection: 'budget' });


module.exports = mongoose.model('Budget', dataSchema);