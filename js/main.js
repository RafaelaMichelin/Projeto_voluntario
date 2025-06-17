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