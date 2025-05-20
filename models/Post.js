const mongoose = require('mongoose');
const {Schema} = mongoose;

const PostSchema = new Schema({
  userId: {type: Number, default: 0},
  id: {type: Number, default: 0},
  title: {type: String, default: ''},
  body: {type: String, default: ''},
}, {timestamps: true});

module.exports = mongoose.model('Post', PostSchema);
