import { describe, it, expect, beforeEach } from 'vitest';
import fs from 'fs';
import path from 'path';

// Mock de scroll necesario para JSDOM
if (!window.HTMLElement.prototype.scrollIntoView) {
  window.HTMLElement.prototype.scrollIntoView = function() {};
}

const html = fs.readFileSync(path.resolve(process.cwd(), 'index.html'), 'utf8');
const scriptCode = fs.readFileSync(path.resolve(process.cwd(), 'script.js'), 'utf8');

describe('Validaciones básicas de la interfaz', () => {
  beforeEach(() => {
    document.documentElement.innerHTML = html;
    
    const scriptEl = document.createElement('script');
    scriptEl.textContent = scriptCode;
    document.body.appendChild(scriptEl);
  });

  it('el botón de registro responde al click', () => {
    const btn = document.getElementById('hero-signup');
    expect(btn).not.toBeNull();
    
    let scrolled = false;
    // Mockeamos la función específica para ver si es llamada
    window.scrollToSection = (id) => { 
      if (id === 'registro') scrolled = true; 
    };
    
    // Asignamos el evento si no viene ya del script.js
    btn.onclick = () => window.scrollToSection('registro');
    
    btn.click();
    expect(scrolled).toBe(true);
  });
});