'use strict';

window.onload = function () {
  const container = document.getElementById('cards');
  const searchInput = document.getElementById('searchInput');
  const cardContainer = document.querySelector('.card-container');

  const cadastros = JSON.parse(localStorage.getItem('dadosCadastro')) || [];

  if (container) {
    if (cadastros.length === 0) {
      container.innerHTML = '<p class="text-center">Nenhuma necessidade cadastrada.</p>';
    } else {
      cadastros.forEach(dados => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.innerHTML = `
          <div class="card-header">${dados.titulo}</div>
          <div class="card-body">
            <p><strong>Nome:</strong> ${dados.nome}</p>
            <p><strong>Tipo de Ajuda:</strong> ${dados.opcaoAjuda}</p>
            <p><strong>CEP:</strong> ${dados.cep}</p>
            <p><strong>Rua:</strong> ${dados.rua}</p>
            <p><strong>Bairro:</strong> ${dados.bairro}</p>
            <p><strong>Cidade:</strong> ${dados.cidade}</p>
            <p><strong>Estado:</strong> ${dados.estado}</p>
            <p><strong>E-mail:</strong> ${dados.email}</p>
            <p><strong>Telefone:</strong> ${dados.tel}</p>
          </div>
        `;
        container.appendChild(card);
      });
    }
  }

  // MÉTODO DE PESQUISA 
 
    if (searchInput && filterAjuda && cardContainer) {
  function filtrar() {
    const searchTerm = searchInput.value.toLowerCase();
    const tipoSelecionado = filterAjuda.value;

    const filteredData = cadastros.filter(dados => {
      const tituloMatch = dados.titulo.toLowerCase().includes(searchTerm);
      const tipoMatch = tipoSelecionado === '' || dados.opcaoAjuda === tipoSelecionado;
      return tituloMatch && tipoMatch;
    });

    cardContainer.innerHTML = '';

    if (filteredData.length === 0) {
      cardContainer.innerHTML = '<p>Nenhuma necessidade encontrada.</p>';
    } else {
      filteredData.forEach(dados => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.innerHTML = `
          <div class="card-header">${dados.titulo}</div>
          <div class="card-body">
            <p><strong>Nome:</strong> ${dados.nome}</p>
            <p><strong>Tipo de Ajuda:</strong> ${dados.opcaoAjuda}</p>
            <p><strong>Descrição:</strong> ${dados.mensagem || ''}</p>
            <p><strong>Cidade:</strong> ${dados.cidade}</p>
            <p><strong>Estado:</strong> ${dados.estado}</p>
            <p><strong>E-mail:</strong> ${dados.email}</p>
            <p><strong>Telefone:</strong> ${dados.tel}</p>
          </div>
        `;
        cardContainer.appendChild(card);
      });
    }
  }

  // Escuta a digitação na busca
  searchInput.addEventListener('input', filtrar);

  // Escuta a mudança no select de tipo
  filterAjuda.addEventListener('change', filtrar);


  }
  
};