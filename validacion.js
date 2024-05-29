document.getElementById('registroForm').addEventListener('submit', function(event) {
  event.preventDefault(); // Evita el envío del formulario
  
  // Limpiar mensajes de error previos
  document.getElementById('errorMessages').innerHTML = '';
  
  // Limpiar mensajes de error en los campos individuales
  document.getElementById('fnameError').textContent = '';
  document.getElementById('lnameError').textContent = '';
  document.getElementById('emailError').textContent = '';
  document.getElementById('birthdayError').textContent = '';
  document.getElementById('telefonoError').textContent = '';
  document.getElementById('interesError').textContent = '';
  
  // Variables de validación
  let valid = true;
  
  // Validación del nombre
  const fname = document.getElementById('fname').value.trim();
  if (fname === '') {
      valid = false;
      document.getElementById('fnameError').textContent = 'El nombre es obligatorio.';
  }
  
  // Validación del apellido
  const lname = document.getElementById('lname').value.trim();
  if (lname === '') {
      valid = false;
      document.getElementById('lnameError').textContent = 'El apellido es obligatorio.';
  }

  // Validación del email
  const email = document.getElementById('email').value.trim();
  if (email === '') {
      valid = false;
      document.getElementById('emailError').textContent = 'El email es obligatorio.';
  } else if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
      valid = false;
      document.getElementById('emailError').textContent = 'El email no tiene un formato válido.';
  }
  
  // Validación de la fecha de nacimiento
  const birthday = document.getElementById('birthday').value.trim();
  const currentDate = new Date();
  const selectedDate = new Date(birthday);
  if (selectedDate > currentDate) {
      valid = false;
      document.getElementById('birthdayError').textContent = 'La fecha de nacimiento no puede ser en el futuro.';
  }
  
  // Validación del teléfono
  const telefono = document.getElementById('telefono').value.trim();
  if (telefono !== '' && !/^\d+$/.test(telefono)) {
      valid = false;
      document.getElementById('telefonoError').textContent = 'El teléfono debe contener solo números.';
  }
  
  // Validación del interés en cursos
  const interes = document.getElementById('interes').value;
  if (interes === 'none') {
      valid = false;
      document.getElementById('interesError').textContent = 'Debe seleccionar un curso de interés.';
  }

  // Mostrar errores si los hay
  if (!valid) {
      // Aquí no necesitas añadir los errores al 'errorMessages'
  } else {
      // Si es válido, enviar el formulario (por ahora, solo mostrar un mensaje)
      alert('Formulario enviado con éxito.');
      
      // Limpiar el formulario
      document.getElementById('registroForm').reset();
  }
});



