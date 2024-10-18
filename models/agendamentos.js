const mongoose = require('mongoose');

const agendamentoSchema = new mongoose.Schema({
  nome: { type: String, required: true },
  raca: { type: String, required: true },
  peso: { type: Number, required: true },
  idade: { type: Number, required: true },
  servico: { type: String, enum: ['Banho e Tosa','Banho','Atendimento Veterinário'], required: true },
  dataAgendamento: { type: Date, required: true },
  horaAgendamento: { type: String, required: true }, // Pode considerar usar Date se necessário
  nomeDono: { type: String, required: true },
  contatoDono: { type: String, required: true }
});

const Agendamento = mongoose.model('Agendamento', agendamentoSchema);

module.exports = Agendamento;
