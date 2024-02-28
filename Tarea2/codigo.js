document.addEventListener("DOMContentLoaded", function() {
    const trabajadoresPorDepartamento = {
      IT: 0,
      Marketing: 0,
      Ventas: 0,
      Administración: 0
    };

    const formulario = document.querySelector('form');
    const listaTrabajadores = document.getElementById('lista-trabajadores');
    const resumenDepartamentos = document.getElementById('resumen-departamentos');

    function agregarTrabajador(nombre, apellido, departamento) {
      const nuevoTrabajador = document.createElement('li');
      nuevoTrabajador.classList.add('list-group-item');
      nuevoTrabajador.textContent = `${nombre} ${apellido} (${departamento})`;
      listaTrabajadores.appendChild(nuevoTrabajador);
    }
  
    function actualizarResumenDepartamentos() {
      resumenDepartamentos.innerHTML = '';
      for (const departamento in trabajadoresPorDepartamento) {
        const cantidad = trabajadoresPorDepartamento[departamento];
        const elementoResumen = document.createElement('p');
        elementoResumen.textContent = `${departamento}: ${cantidad}`;
        resumenDepartamentos.appendChild(elementoResumen);
      }
    }
  
    formulario.addEventListener('submit', function(event) {
      event.preventDefault();
      const nombre = formulario.querySelector('#nombre').value.trim();
      const apellido = formulario.querySelector('#apellido').value.trim();
      const departamento = formulario.querySelector('#departamento').value;
      
      if (nombre && apellido) {
        agregarTrabajador(nombre, apellido, departamento);
        trabajadoresPorDepartamento[departamento]++;
        actualizarResumenDepartamentos();
        formulario.reset();
      } else {
        alert('Por favor completa todos los campos del formulario.');
      }
    });
});