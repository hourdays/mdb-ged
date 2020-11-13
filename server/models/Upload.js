const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let uploadSchema = new Schema({
  _id: mongoose.Schema.Types.ObjectId,
  files: {
    type: Array
  },
}, {
  collection: 'uploads'
})

module.exports = mongoose.model('Upload', uploadSchema)