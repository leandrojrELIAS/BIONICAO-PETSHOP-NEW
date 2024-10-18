const mongoose = require('mongoose');

const usuarioSchema = new mongoose.Schema({
  nome: { type: String, required: true },
  cpf: { type: String, required: true, unique: true },
  id: { type: String, required: true, unique: true }
});

const Usuario = mongoose.model('Usuario', usuarioSchema);

module.exports = Usuario;