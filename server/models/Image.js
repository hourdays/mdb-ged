const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let imageSchema = new Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: String, 
  desc: String, 
  body: {
    data: Buffer, 
    contentType: String 
  } 
}, {
  collection: 'images'
})

module.exports = mongoose.model('Image', imageSchema)