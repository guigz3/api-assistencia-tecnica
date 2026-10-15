const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');

const equipamentoRoutes = require('./routes/equipamento');

const app = express();

// Middlewares
app.use(morgan('dev'));
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Rota raiz
app.get('/', (req, res) => {
  res.status(200).json({ sucesso: true, mensagem: 'API de Assistência Técnica no ar' });
});

// Rotas do recurso
app.use('/equipamento', equipamentoRoutes);

// Rota não encontrada
app.use((req, res) => {
  res.status(404).json({ sucesso: false, erro: 'Rota não encontrada' });
});

// Tratamento de erros (ex.: JSON inválido no body)
app.use((err, req, res, next) => {
  if (err.type === 'entity.parse.failed') {
    return res.status(400).json({ sucesso: false, erro: 'JSON inválido no corpo da requisição' });
  }
  console.error(err);
  res.status(500).json({ sucesso: false, erro: 'Erro interno do servidor' });
});

module.exports = app;
