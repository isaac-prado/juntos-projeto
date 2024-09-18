const express = require('express');
const PouchDB = require('pouchdb');

const app = express();
const db = new PouchDB('local-db');

app.use(express.json());

app.get('/', (req, res) => {
  res.send('API funcionando!');
});

// Exemplo de rota para adicionar dados
app.post('/add', async (req, res) => {
  try {
    const result = await db.put(req.body);
    res.send(result);
  } catch (error) {
    res.status(500).send(error);
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
