require('dotenv').config();  // Carrega as variáveis de ambiente do .env
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const nodemailer = require('nodemailer');
const Agendamento = require('./models/Agendamentos'); // Corrigido o caminho

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Conexão com o MongoDB usando variáveis de ambiente
mongoose.connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log('Conectado ao MongoDB com sucesso!'))
.catch((error) => console.error('Erro ao conectar ao MongoDB:', error));

// Rota para enviar o formulário de contato por e-mail
app.post('/api/send-email', (req, res) => {
    const { nomeContato, emailContato, mensagemContato } = req.body;

    // Configuração do transporte de e-mail usando variáveis de ambiente
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        },
    });

    const mailOptions = {
        from: emailContato,
        to: process.env.EMAIL_DESTINO,
        subject: `Nova mensagem de contato de ${nomeContato}`,
        text: mensagemContato,
    };

    // Enviando o e-mail
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error('Erro ao enviar o e-mail:', error);
            res.status(500).send('Erro ao enviar a mensagem.');
        } else {
            console.log('E-mail enviado:', info.response);
            res.status(200).send('Mensagem enviada com sucesso!');
        }
    });
});

// Importando e usando as rotas de agendamentos
const agendamentoRoutes = require('./routes/agendamentos');
app.use('/api/agendamentos', agendamentoRoutes);

// Rota para a página inicial
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
