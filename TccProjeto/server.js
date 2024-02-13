const express = require('express');
const mysql = require('mysql2');

const app = express();
const port = 3000;

// Conexão com o banco de dados
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'gabriel',
  password: 'TccD@ta',
  database: 'tcc_banco',
  port:3306,
});

connection.connect();

// Rota para obter dados do MySQL
app.get('/dados', (req, res) => {
  const query = 'SELECT * FROM consumo_energia';

  connection.query(query, (error, results) => {
    if (error) throw error;
    res.json(results);
  });
});

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
