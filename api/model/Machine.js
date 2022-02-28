const mongoose = require ("mongoose");

module.exports = mongoose.model('Machine', 
    mongoose.Schema ({
        id: String,
        nom: String,
        modeEmploi: String,
        logo: String,
        historique: [String]
    }), "machine");