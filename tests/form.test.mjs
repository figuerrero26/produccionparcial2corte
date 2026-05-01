import { describe, it, expect, beforeEach } from 'vitest';
import fs from 'fs';
import path from 'path';

// Mock de scroll necesario para JSDOM
if (!window.HTMLElement.prototype.scrollIntoView) {
  window.HTMLElement.prototype.scrollIntoView = function() {};
}

const html = fs.readFileSync(path.resolve(process.cwd(), 'index.html'), 'utf8');
const scriptCode = fs.readFileSync(path.resolve(process.cwd(), 'script.js'), 'utf8');

describe('Formulario de registro', () => {
  beforeEach(() => {
    document.documentElement.innerHTML = html;
    
    const scriptEl = document.createElement('script');
    scriptEl.textContent = scriptCode;
    document.body.appendChild(scriptEl);

    // Inicializar el formulario si existe la función
    if (typeof window.initForm === 'function') {
      window.initForm();
    }
  });

  it('debe validar campos obligatorios', () => {
    const form = document.getElementById('registro-form');
    const input = document.getElementById('nombre');
    
    // Simulamos campo vacío
    if (input) input.value = '';
    
    const event = new window.Event('submit', { bubbles: true, cancelable: true });
    
    let prevented = false;
    form.addEventListener('submit', (e) => { 
      // Si tu lógica de JS llama a e.preventDefault(), esto será true
      prevented = e.defaultPrevented; 
    });
    
    form.dispatchEvent(event);
    
    // Verificamos si se detuvo el envío por falta de datos
    expect(prevented).toBe(true);
  });
});