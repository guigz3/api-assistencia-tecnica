-- Script de criação do banco e da tabela
SET NAMES utf8mb4;

CREATE DATABASE IF NOT EXISTS assistencia_tecnica
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_general_ci;

USE assistencia_tecnica;

CREATE TABLE IF NOT EXISTS equipamento (
  id        INT AUTO_INCREMENT PRIMARY KEY,
  descricao VARCHAR(150) NOT NULL,
  cliente   VARCHAR(100) NOT NULL,
  defeito   VARCHAR(255) NOT NULL
);

-- Dados de exemplo (opcional)
INSERT INTO equipamento (descricao, cliente, defeito) VALUES
  ('Notebook Dell Inspiron 15', 'Maria Souza', 'Não liga'),
  ('Smartphone Samsung A54', 'João Pereira', 'Tela quebrada'),
  ('Impressora HP LaserJet', 'Ana Lima', 'Papel enroscando');
