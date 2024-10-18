const express = require('express');
const serverless = require('serverless-http');
const app = express();

// Importe suas rotas aqui
const agendamentoRoutes = require('../routes/agendamentos');
const authRoutes = require('../routes/auth');

app.use(express.json());

app.use('/.netlify/functions/api/agendamentos', agendamentoRoutes);
app.use('/.netlify/functions/api/auth', authRoutes);

module.exports.handler = serverless(app);