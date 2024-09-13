const express = require('express');
const router = express.Router();
const Agendamento = require('../models/Agendamentos');

// Rota para obter todos os agendamentos
router.get('/', async (req, res) => {
  try {
    const agendamentos = await Agendamento.find();
    res.json(agendamentos);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Rota para criar um novo agendamento
router.post('/', async (req, res) => {
  console.log("Dados recebidos para agendamento:", req.body);

  const agendamento = new Agendamento({
    nome: req.body.nome,
    raca: req.body.raca,
    peso: req.body.peso,
    idade: req.body.idade,
    servico: req.body.servico,
    dataAgendamento: new Date(req.body.dataAgendamento),
    horaAgendamento: req.body.horaAgendamento,
    nomeDono: req.body.nomeDono,
    contatoDono: req.body.contatoDono
  });

  try {
    const novoAgendamento = await agendamento.save();
    res.status(201).json(novoAgendamento);
  } catch (err) {
    console.error('Erro ao salvar agendamento:', err.message);
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
