const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
  name: { type: String, required: true },
  gstRate: { type: Number, required: true },
});

module.exports = mongoose.model('Category', categorySchema);
