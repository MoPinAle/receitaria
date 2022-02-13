const mongoose = require('mongoose');

const RecipeSchema = mongoose.Schema({
  type: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'recipeType',
  },
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  photo: {
    type: String,
    required: true,
  },
  ingredients: {
    type: String,
    required: true,
  },
  prepareTime: {
    type: String,
    required: true,
  },
  prepareMode: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  serves: {
    type: String,
    required: true,
  },
  favorite: {
    type: Boolean,
    required: false,
  },
});

module.exports = mongoose.model('recipe', RecipeSchema);
