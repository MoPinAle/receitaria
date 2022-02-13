const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator/check');

const MesureUnity = require('../models/MesureUnity');

// @route       GET api/mesureUnity
// @desc        Get all mesureUnities
// @access      Public
router.get('/', async (req, res) => {
   try {
    const mesUn = await MesureUnity.find({});
    res.json(mesUn);
   } catch(err) {
    console.error(err.message);
    res.status(500).send('Server Error')
   }
});

// @route       POST api/mesureUnity
// @desc        Post a mesure unity
// @access      Public
router.post('/', [
    check('name', 'Please, add a mesure unity')
        .not()
        .isEmpty()
], async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    
    const { name } = req.body;

    try {
        let mesureUnity = await MesureUnity.findOne({ name });

        if(mesureUnity) {
            return res.status(400).json({ msg: 'Mesure Unity already exists' })
        }

        mesureUnity = new MesureUnity({
            name
        });

        await mesureUnity.save();

        res.send('Mesure Unity saved');

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route       PUT api/mesureUnity/:id
// @desc        Update mesure unity
// @access      Public
router.put('/:id', async(req, res) => {
    const { name } = req.body;

    // Build mesure unity object
    const mesUnFields = {};
    if(name) mesUnFields.name = name;

    try {
        let mesUn = await MesureUnity.findById(req.params.id);

        if(!mesUn) return res.status(404).json({ msg: 'Mesure Unity not found' });

        mesUn = await MesureUnity.findByIdAndUpdate(req.params.id,
          { $set: mesUnFields },
          { new: true });

          res.json(mesUn);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route       DELETE api/mesureUnity/:id
// @desc        Delete mesure unity
// @access      Public
router.delete('/:id', async (req, res) => {
    try {
        let mesureUnity = await MesureUnity.findById(req.params.id);

        if(!mesureUnity) return res.status(404).json({ msg: 'Mesure unity not found' });

        await MesureUnity.findByIdAndRemove(req.params.id);

        res.json({ msg: 'Mesure unity removed '});
    } catch(err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
})

module.exports = router;