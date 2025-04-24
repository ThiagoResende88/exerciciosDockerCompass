const express = require('express');
const mongoose = require('mongoose');

const app = express();
const PORT = 3000;

// Conectar ao MongoDB
mongoose.connect('mongodb://mongo:27017/mydb', { useNewUrlParser: true });

app.get('/', (req, res) => {
  res.send('Aplicação Node.js conectada ao MongoDB!');
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
