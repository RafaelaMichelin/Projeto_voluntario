'use strict';
 
//Conferir se todos os campos obrigatórios estão preenchidos
document.addEventListener('DOMContentLoaded', function () {
  const form = document.getElementById('form');
  const btnEnviar = document.getElementById('btnEnviar');
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
  
});



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

