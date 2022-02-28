const mongoose = require ("mongoose");

module.exports = mongoose.model('User', 
    mongoose.Schema ({
        id: String,
        nom: String,
        prenom: String,
        isAdmin: Boolean
    }), "user");