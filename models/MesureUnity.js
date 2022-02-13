const mongoose = require('mongoose');

const MesureUnitySchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('mesureUnity', MesureUnitySchema);