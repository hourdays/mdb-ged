const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let pdfSchema = new Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: String, 
  desc: String, 
  body: {
    data: Buffer, 
    contentType: String 
  } 
}, {
  collection: 'PDFs'
})

module.exports = mongoose.model('PDF', pdfSchema)