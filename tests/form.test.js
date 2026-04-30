
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { JSDOM } from 'jsdom';
import fs from 'fs';
import path from 'path';

const html = fs.readFileSync(path.resolve(__dirname, '../index.html'), 'utf8');
const scriptCode = fs.readFileSync(path.resolve(__dirname, '../script.js'), 'utf8');

describe('Formulario de registro', () => {
  let dom, document, window;

  beforeEach(() => {
    dom = new JSDOM(html, { runScripts: 'dangerously', resources: 'usable' });
    document = dom.window.document;
    window = dom.window;
    // Inyectar script.js en el contexto del DOM
    const scriptEl = document.createElement('script');
    scriptEl.textContent = scriptCode;
    document.body.appendChild(scriptEl);
    // Ejecutar manualmente initForm si existe
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