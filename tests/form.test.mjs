import { describe, it, expect, beforeEach } from 'vitest';
import fs from 'fs';

const scriptCode = fs.readFileSync('script.js', 'utf8');

describe('Formulario de registro', () => {
  beforeEach(() => {
    // Inyectar script.js en el DOM
    const scriptEl = document.createElement('script');
    scriptEl.textContent = scriptCode;
    document.body.appendChild(scriptEl);
    if (typeof window.initForm === 'function') {
      window.initForm();
    }
  });

  it('debe validar campos obligatorios', () => {
    const form = document.getElementById('registro-form');
    const input = document.getElementById('nombre');
    input.value = '';
    const event = new window.Event('submit', { bubbles: true, cancelable: true });
    let prevented = false;
    form.addEventListener('submit', e => { prevented = e.defaultPrevented; });
    form.dispatchEvent(event);
    expect(prevented).toBe(true);
  });
});
