const express = require('express');
const path = require('path');
const app = express();
const PORT = 3000;

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/index.html'));
});

/*app.post('/buscar', (req, res) => {
  // Aqui simularíamos uma resposta vinda de um banco
  const resultado = [
    { nome: "CENTRO UNIVERSITÁRIO MAURÍCIO DE NASSAU", sigla: "UNINASSAU", uf: "PE", tipo: "Privada com fins lucrativos" }
  ];
  res.json(resultado);
});*/

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
