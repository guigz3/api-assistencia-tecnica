const express = require('express');
const db = require('../config/db');

const router = express.Router();

// ---------- Funções auxiliares ----------
function idValido(valor) {
  const id = Number(valor);
  return Number.isInteger(id) && id > 0 ? id : null;
}

function textoValido(valor) {
  return typeof valor === 'string' && valor.trim().length > 0;
}

// Retorna a lista de campos obrigatórios que estão ausentes ou vazios
function validarCorpo(body) {
  const dados = body || {};
  return ['descricao', 'cliente', 'defeito'].filter((campo) => !textoValido(dados[campo]));
}

function erroBanco(res, err, mensagem) {
  console.error(mensagem, '->', err.code, err.message);
  return res.status(500).json({ sucesso: false, erro: mensagem });
}

// ---------- GET /equipamento (listar todos) ----------
router.get('/', (req, res) => {
  const sql = 'SELECT id, descricao, cliente, defeito FROM equipamento ORDER BY id';

  db.query(sql, (err, resultados) => {
    if (err) return erroBanco(res, err, 'Erro ao listar equipamentos');
    res.status(200).json({ sucesso: true, total: resultados.length, dados: resultados });
  });
});

// ---------- GET /equipamento/:id (buscar um) ----------
router.get('/:id', (req, res) => {
  const id = idValido(req.params.id);
  if (!id) return res.status(400).json({ sucesso: false, erro: 'ID inválido' });

  const sql = 'SELECT id, descricao, cliente, defeito FROM equipamento WHERE id = ?';

  db.query(sql, [id], (err, resultados) => {
    if (err) return erroBanco(res, err, 'Erro ao buscar equipamento');
    if (resultados.length === 0) {
      return res.status(404).json({ sucesso: false, erro: 'Equipamento não encontrado' });
    }
    res.status(200).json({ sucesso: true, dados: resultados[0] });
  });
});

// ---------- POST /equipamento (criar) ----------
router.post('/', (req, res) => {
  const faltando = validarCorpo(req.body);
  if (faltando.length > 0) {
    return res.status(400).json({
      sucesso: false,
      erro: 'Campos obrigatórios ausentes ou vazios: ' + faltando.join(', ')
    });
  }

  const { descricao, cliente, defeito } = req.body;
  const sql = 'INSERT INTO equipamento (descricao, cliente, defeito) VALUES (?, ?, ?)';

  db.query(sql, [descricao.trim(), cliente.trim(), defeito.trim()], (err, resultado) => {
    if (err) return erroBanco(res, err, 'Erro ao cadastrar equipamento');
    res.status(201).json({
      sucesso: true,
      mensagem: 'Equipamento cadastrado com sucesso',
      dados: {
        id: resultado.insertId,
        descricao: descricao.trim(),
        cliente: cliente.trim(),
        defeito: defeito.trim()
      }
    });
  });
});

// ---------- PUT /equipamento/:id (atualizar) ----------
router.put('/:id', (req, res) => {
  const id = idValido(req.params.id);
  if (!id) return res.status(400).json({ sucesso: false, erro: 'ID inválido' });

  const faltando = validarCorpo(req.body);
  if (faltando.length > 0) {
    return res.status(400).json({
      sucesso: false,
      erro: 'Campos obrigatórios ausentes ou vazios: ' + faltando.join(', ')
    });
  }

  const { descricao, cliente, defeito } = req.body;
  const sql = 'UPDATE equipamento SET descricao = ?, cliente = ?, defeito = ? WHERE id = ?';

  db.query(sql, [descricao.trim(), cliente.trim(), defeito.trim(), id], (err, resultado) => {
    if (err) return erroBanco(res, err, 'Erro ao atualizar equipamento');
    if (resultado.affectedRows === 0) {
      return res.status(404).json({ sucesso: false, erro: 'Equipamento não encontrado' });
    }
    res.status(200).json({
      sucesso: true,
      mensagem: 'Equipamento atualizado com sucesso',
      dados: { id, descricao: descricao.trim(), cliente: cliente.trim(), defeito: defeito.trim() }
    });
  });
});

// ---------- DELETE /equipamento/:id (remover) ----------
router.delete('/:id', (req, res) => {
  const id = idValido(req.params.id);
  if (!id) return res.status(400).json({ sucesso: false, erro: 'ID inválido' });

  const sql = 'DELETE FROM equipamento WHERE id = ?';

  db.query(sql, [id], (err, resultado) => {
    if (err) return erroBanco(res, err, 'Erro ao excluir equipamento');
    if (resultado.affectedRows === 0) {
      return res.status(404).json({ sucesso: false, erro: 'Equipamento não encontrado' });
    }
    res.status(200).json({ sucesso: true, mensagem: 'Equipamento excluído com sucesso' });
  });
});

module.exports = router;
