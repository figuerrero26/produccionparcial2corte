/**
 * script.js - Lógica de la Plataforma de Cursos
 */

// 1. Navegación entre páginas (Inicio, Cursos, Contacto)
window.showPage = function(pageId) {
  const pages = document.querySelectorAll('.page');
  pages.forEach(page => {
    page.classList.remove('active');
    page.style.display = 'none';
  });

  const target = document.getElementById(pageId);
  if (target) {
    target.classList.add('active');
    target.style.display = 'block';
    if (typeof target.scrollIntoView === 'function') {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }
};

// 2. Desplazamiento suave a secciones (como el formulario de registro)
window.scrollToSection = function(sectionId) {
  const section = document.getElementById(sectionId);
  if (section && typeof section.scrollIntoView === 'function') {
    section.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
};

// 3. Validación de formato de correo
window.validateEmail = function(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(String(email).toLowerCase());
};

// 4. Lógica del Formulario de Registro
window.initForm = function() {
  const form = document.getElementById('registro-form');
  if (!form) return;

  // Obtenemos los elementos
  const nombre = document.getElementById('nombre');
  const correo = document.getElementById('correo');
  const errorNombre = document.getElementById('error-nombre');
  const errorCorreo = document.getElementById('error-correo');
  const successMsg = document.getElementById('success-msg');

  form.addEventListener('submit', function(e) {
    let valid = true;

    // Resetear mensajes de error
    if (errorNombre) errorNombre.textContent = '';
    if (errorCorreo) errorCorreo.textContent = '';
    if (successMsg) successMsg.textContent = '';

    // Validar nombre (mínimo 3 caracteres según el HTML)
    if (!nombre.value.trim() || nombre.value.trim().length < 3) {
      if (errorNombre) errorNombre.textContent = 'El nombre debe tener al menos 3 caracteres.';
      valid = false;
    }

    // Validar correo
    if (!correo.value.trim() || !window.validateEmail(correo.value)) {
      if (errorCorreo) errorCorreo.textContent = 'Ingresa un correo válido.';
      valid = false;
    }

    // SI NO ES VÁLIDO: Detenemos el envío para que el test lo detecte
    if (!valid) {
      e.preventDefault();
    } else {
      // SI ES VÁLIDO: También prevenimos el envío real para mostrar el éxito (SPA style)
      e.preventDefault();
      if (successMsg) successMsg.textContent = 'Registro completado con éxito. ¡Bienvenido!';
      form.reset();
    }
  });
};

// 5. Inicialización automática
if (typeof document !== 'undefined') {
  // Si el DOM ya está cargado (como en los tests), inicializamos de una vez
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      window.initForm();
    });
  } else {
    window.initForm();
  }
}