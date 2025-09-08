const mongoose = require('mongoose');

const ListSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: { type: String },
  user: { // owner of the list
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, {
  timestamps: true
});

// A unique index per user+name could be handy to avoid duplicate list names for same user
ListSchema.index({ user: 1, name: 1 }, { unique: true });

module.exports = mongoose.model('List', ListSchema);
