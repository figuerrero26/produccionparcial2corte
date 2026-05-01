import { describe, it, expect, beforeEach } from 'vitest';
import fs from 'fs';
import path from 'path';

// 1. MOCK DE SCROLL (Debe estar arriba, antes de cargar el script)
// JSDOM no tiene motor de renderizado, por lo que scrollIntoView no existe.
if (!window.HTMLElement.prototype.scrollIntoView) {
  window.HTMLElement.prototype.scrollIntoView = function() {};
}

// 2. CARGA DE ARCHIVOS
const html = fs.readFileSync(path.resolve(process.cwd(), 'index.html'), 'utf8');
const scriptCode = fs.readFileSync(path.resolve(process.cwd(), 'script.js'), 'utf8');

describe('Navegación', () => {
  beforeEach(() => {
    // Resetear el DOM
    document.documentElement.innerHTML = html;

    // 3. INYECCIÓN DEL SCRIPT
    const script = document.createElement('script');
    script.textContent = scriptCode;
    document.body.appendChild(script);
  });

  it('debe mostrar la página de inicio por defecto', () => {
    const inicio = document.getElementById('inicio');
    expect(inicio).not.toBeNull();
    expect(inicio.classList.contains('active')).toBe(true);
  });

  it('debe ejecutar scrollToSection sin romper el test', () => {
    // Probamos la función que usa scrollIntoView
    // Si el mock no funcionara, este test lanzaría un error "is not a function"
    expect(() => {
      window.scrollToSection('inicio');
    }).not.toThrow();
  });
});