document.getElementById('formBusca').addEventListener('submit', async (e) => {
    e.preventDefault();
  
    const form = e.target;
    const nome = form.nome.value;
  
    const response = await fetch('/buscar', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ nome })
    });
  
    const resultados = await response.json();
  
    const lista = document.getElementById('listaResultados');
    lista.innerHTML = '';
  
    if (resultados.length === 0) {
      lista.innerHTML = '<li>Nenhum resultado encontrado.</li>';
    } else {
      resultados.forEach(item => {
        const li = document.createElement('li');
        li.textContent = `${item.nome} (${item.uf})`;
        lista.appendChild(li);
      });
    }
  });
  