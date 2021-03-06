const mongoose = require('mongoose');

const schema = new mongoose.Schema({    
    title: {
        type: String,
        required: true
      },
    posterImageUrl: {
        type: String,
        required: true
      },
    director: {
        type: String,
        required: true
      },
    release: {
        type: Date,
        required: true
      },
    category: String,
    description: String,
    score: {
        type: Number,
        min: [0, 'Score accepts values between 0 and 10'],
        max: [10, 'Score accepts values between 0 and 10']
      }
}, {
        timestamps: true
    }
);

schema.index({ title: 1, type: 1 });
schema.index({ release: 1, type: -1 });

module.exports = mongoose.model('Movie', schema);
