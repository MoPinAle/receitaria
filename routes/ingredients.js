const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator/check');

const Ingredients = require('../models/Ingredients');

// @route       GET api/ingredients
// @desc        Get all ingredients
// @access      Public
router.get('/', async (req, res) => {
    try {
         const ing = await Ingredients.find({});
         res.json(ing);
    } catch(err) {
         console.error(err.message);
         res.status(500).send('Server Error');
    }
});

// @route      POST api/ingredients
// @desc       Post an ingredient
// @access     Public
router.post('/', [
     check('name', 'Please add an ingredient name')
          .not()
          .isEmpty()
], async (req, res) => {
     const errors = validationResult(req);
     if(!errors.isEmpty()) {
          return res.status(400).json({ errors: errors.array() });
     }
     
     const { name } = req.body;

     try {
          let ingredient = await Ingredients.findOne({ name });

          if(ingredient) {
               return res.status(400).json({ msg: 'Ingredient already exists'});
          }

          ingredient = new Ingredients({
               name
          })

          await ingredient.save();

          res.send('Ingredient saved');

     } catch (err) {
          console.error(err.message);
          res.status(500).send('Server Error');
     }

});

// @route      PUT api/ingredients/:id
// @desc       Update ingredient
// @access     Public
router.put('/:id', async(req, res) => {
     const { name } = req.body;

     // Build ingredient object
     const ingredientFields = {};
     if(name) ingredientFields.name = name;

     try {
          let ingredient = await Ingredients.findById(req.params.id);

          if(!ingredient) return res.status(404).json({ msg: 'Ingredient not found' });

          ingredient = await Ingredients.findByIdAndUpdate(req.params.id,
               { $set: ingredientFields },
               { new: true });

               res.json(ingredient);
     } catch(err) {
          console.error(err.message);
          res.status(500).send('Server Error');
     }
});

// @route      DELETE api/ingredients/:id
// @desc       Delete ingredient
// @access     Public
router.delete('/:id', async (req, res) => {
     try {
          let ingredient = await Ingredients.findById(req.params.id);

          if(!ingredient) return res.status(404).json({ msg: 'Ingredient not found' });

          await Ingredients.findByIdAndRemove(req.params.id);

          res.json({ msg: 'Ingredient removed' });
     } catch(err) {
          console.error(err.message);
          res.status(500).send('Server Error');
     }
});

module.exports = router;