# API REST – Assistência Técnica

API REST em Node.js (Express + MySQL/MariaDB) com o recurso **equipamento** (`id`, `descricao`, `cliente`, `defeito`).

## Como executar

1. Instale as dependências: `npm install`
2. Crie o banco e a tabela executando o script `database.sql` no MySQL/MariaDB
   (ex.: `mysql -u root -p < database.sql`)
3. Ajuste usuário/senha em `config/db.js` se necessário (padrão: `root`, sem senha)
   — ou use as variáveis de ambiente `DB_HOST`, `DB_USER`, `DB_PASSWORD`, `DB_NAME`
4. Inicie: `npm start` (servidor em http://localhost:3000)

> Se usar MySQL 8 e aparecer o erro `ER_NOT_SUPPORTED_AUTH_MODE`, rode:
> `ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'SUA_SENHA';`

## Rotas

| Método | Rota               | Descrição            |
|--------|--------------------|----------------------|
| GET    | /equipamento       | Lista todos          |
| GET    | /equipamento/:id   | Busca por id         |
| POST   | /equipamento       | Cadastra             |
| PUT    | /equipamento/:id   | Atualiza             |
| DELETE | /equipamento/:id   | Remove               |

Body (POST/PUT, JSON):

```json
{ "descricao": "Notebook Dell", "cliente": "Maria Souza", "defeito": "Não liga" }
```

## Estrutura

```
server.js             # sobe o servidor
app.js                # middlewares (morgan, cors, body-parser) e rotas
config/db.js          # conexão com o banco (pool mysql)
routes/equipamento.js # CRUD
database.sql          # script de criação do banco/tabela
```
