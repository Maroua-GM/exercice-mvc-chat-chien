const mongoose = require("mongoose");
// ********* SCHEMA et MODEL*********

const chienSchema = new mongoose.Schema({
	nom: { type: String, required: true },
	couleur: { type: String, required: true },
	race: { type: String, required: true },
});

const Chien = mongoose.model("Chien", chienSchema);

// export par défaut
module.exports = Chien;
