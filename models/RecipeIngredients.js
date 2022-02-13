const mongoose = require('mongoose');

const RecipeIngredientsSchema = mongoose.Schema({
    recipe: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'recipe'
    }
});

module.exports = mongoose.model('recipeIngredients', RecipeIngredientsSchema);