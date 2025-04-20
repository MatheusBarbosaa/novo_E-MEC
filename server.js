const express = require('express');
const path = require('path');
const axios = require('axios');
const cheerio = require('cheerio');

const app = express();
const PORT = 3000;

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/index.html'));
});

// Rota para buscar dados reais do e-MEC
app.post('/buscar', async (req, res) => {
  const nomeInstituicao = req.body.nome;

  try {
    const response = await axios.get(`https://emec.mec.gov.br/`);
    const $ = cheerio.load(response.data);

    // aqui você pode simular uma extração simples, por exemplo da lista de instituições (apenas exemplo ilustrativo)
    const resultados = [];

    $('table tr').each((i, el) => {
      const nome = $(el).find('td').eq(1).text().trim();
      const uf = $(el).find('td').eq(2).text().trim();
      if (nome && uf && nome.toLowerCase().includes(nomeInstituicao.toLowerCase())) {
        resultados.push({ nome, uf });
      }
    });

    res.json(resultados);
  } catch (error) {
    console.error('Erro ao buscar no e-MEC:', error.message);
    res.status(500).json({ erro: 'Erro ao buscar dados reais do e-MEC.' });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
