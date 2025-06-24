'use strict';

document.addEventListener('DOMContentLoaded', function () {
  const form = document.getElementById('formcad');
  const btnEnviar = document.getElementById('btnEnviar');

  if (form) {
    const camposObrigatorios = form.querySelectorAll('[required]');


    // Função para validar os campos obrigatórios
  function validarCampos() {
    let todosPreenchidos = true;

    camposObrigatorios.forEach(campo => {
      if (!campo.value.trim()) {
        todosPreenchidos = false;
        campo.classList.add('campo-invalido');
      } else {
        campo.classList.remove('campo-invalido');
      }
    });

    btnEnviar.disabled = !todosPreenchidos;
  }

  // Adiciona evento de input para cada campo obrigatório
  camposObrigatorios.forEach(campo => {
    campo.addEventListener('input', validarCampos);
  });
  form.addEventListener('submit', function (event) {
      let mensagemErro = '';

//pegando o valor de cada campo inserido
      const nome = document.getElementById('nome').value;
      const opcaoAjuda = document.getElementById('opcaoAjuda').value;
      const titulo = document.getElementById('titulo').value;
      const email = document.getElementById('email').value;
      const telefone = document.getElementById('tel').value;

      if (!nome) mensagemErro += 'O campo Nome é obrigatório.\n';
      if (!opcaoAjuda) mensagemErro += 'O campo Tipo de Ajuda é obrigatório.\n';
      if (!titulo) mensagemErro += 'O campo Título é obrigatório.\n';

      if (!email) {
        mensagemErro += 'O campo E-mail é obrigatório.\n';
      } 
      else if (!validarEmail(email)) {
        mensagemErro += 'Por favor, insira um e-mail válido.\n';
      }

      if (!telefone) {
        mensagemErro += 'O campo Telefone é obrigatório.\n';
      }
      else if (!validarTelefone(telefone)) {
        mensagemErro += 'Por favor, insira um telefone válido no formato (XX) XXXXX-XXXX.\n';
      }

      if (mensagemErro) {
        alert(mensagemErro);
        event.preventDefault();
      }
    });

     function validarEmail(email) {
      const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return regex.test(email);
    }

    function validarTelefone(telefone) {
      const regex = /^\(\d{2}\) \d{5}-\d{4}$/;
      return regex.test(telefone);
    }
  
  };

    

  //Implementando VIACEP para preencher os campos rua, bairro, cidade e estado

  const eNumero = (numero) => /^[0-9]+$/.test(numero);
const cepValido = (cep) => cep.length === 8 && eNumero(cep);

const pesquisarCep = async () => {
  limparFormulario();

  const cepValue = document.getElementById('cep').value.trim();
  if (!cepValido(cepValue)) {
    alert('CEP incorreto, tente novamente!');
    return;
  }

  const url = `https://viacep.com.br/ws/${encodeURIComponent(cepValue)}/json/`;

  try {
    const dados = await fetch(url);
    const endereco = await dados.json();

    if (endereco.erro) {
      alert('CEP não encontrado');
    } else {
      preencherFormulario(endereco);
    }
  } catch (error) {
    alert('Erro ao consultar o CEP');
    console.error(error);
  }
};

const preencherFormulario = (endereco) => {
  document.getElementById('rua').value = endereco.logradouro;
  document.getElementById('bairro').value = endereco.bairro;
  document.getElementById('cidade').value = endereco.localidade;
  document.getElementById('estado').value = endereco.uf;
};

const limparFormulario = () => {
  document.getElementById('rua').value = '';
  document.getElementById('bairro').value = '';
  document.getElementById('cidade').value = '';
  document.getElementById('estado').value = '';
};



document.getElementById('cep').addEventListener('focusout', pesquisarCep);


  // SALVAR DADOS DO FORMULARIO NO LOCALSTORAGE 
  const formcad = document.getElementById('formcad');

  if (formcad) {
    formcad.addEventListener('submit', function (e) {
      e.preventDefault();

      const formData = new FormData(this);
      const dados = Object.fromEntries(formData.entries());

      const cadastros = JSON.parse(localStorage.getItem('dadosCadastro')) || [];
      cadastros.push(dados);
      localStorage.setItem('dadosCadastro', JSON.stringify(cadastros));

      window.location.href = 'view.html';
    });
  }
});
