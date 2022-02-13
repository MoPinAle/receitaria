const mongoose = require('mongoose');

const IngredientsSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('ingredients', IngredientsSchema);