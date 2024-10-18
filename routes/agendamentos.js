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

// Rota para obter um agendamento específico pelo ID
router.get('/:id', async (req, res) => {
  try {
    const agendamento = await Agendamento.findById(req.params.id);
    if (!agendamento) {
      return res.status(404).json({ message: 'Agendamento não encontrado' });
    }
    res.json(agendamento);
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

// Rota para atualizar um agendamento pelo ID
router.put('/:id', async (req, res) => {
  try {
    const agendamentoId = req.params.id;
    const agendamentoAtualizado = await Agendamento.findByIdAndUpdate(agendamentoId, req.body, {
      new: true, // Retorna o documento atualizado
      runValidators: true // Garante que os dados sejam validados antes de salvar
    });

    if (!agendamentoAtualizado) {
      return res.status(404).json({ message: 'Agendamento não encontrado' });
    }

    res.status(200).json(agendamentoAtualizado);
  } catch (error) {
    res.status(400).json({ message: 'Erro ao atualizar agendamento', error });
  }
});

// Rota para deletar um agendamento pelo ID
router.delete('/:id', async (req, res) => {
  try {
    const agendamentoId = req.params.id;
    const agendamentoDeletado = await Agendamento.findByIdAndDelete(agendamentoId);

    if (!agendamentoDeletado) {
      return res.status(404).json({ message: 'Agendamento não encontrado' });
    }

    res.status(200).json({ message: 'Agendamento deletado com sucesso' });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao deletar agendamento', error });
  }
});

module.exports = router;
