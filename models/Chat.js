const mongoose = require('mongoose');
// ********* SCHEMA et MODEL*********

const chatSchema = new mongoose.Schema({
    nom: { type: String, required: true },
    couleur: { type: String, required: true },
    age: { type: Number, required: true },
});

const Chat = mongoose.model('Chat', chatSchema);

// export par défaut
module.exports = Chat;