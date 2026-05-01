import { describe, it, expect, beforeEach } from 'vitest';
import fs from 'fs';
import path from 'path';

// 1. MOCK DE SCROLL (Vital para que no explote)
if (!window.HTMLElement.prototype.scrollIntoView) {
  window.HTMLElement.prototype.scrollIntoView = function() {};
}

const html = fs.readFileSync(path.resolve(process.cwd(), 'index.html'), 'utf8');
const scriptCode = fs.readFileSync(path.resolve(process.cwd(), 'script.js'), 'utf8');

describe('Navegación', () => {
  beforeEach(() => {
    // Resetear el DOM
    document.documentElement.innerHTML = html;

    // 2. INYECCIÓN DOBLE: Creamos el tag y también evaluamos el código
    const script = document.createElement('script');
    script.textContent = scriptCode;
    document.body.appendChild(script);

    // Esto fuerza a Vitest a registrar las funciones en el objeto global del test
    try {
      const runScript = new Function('window', 'document', scriptCode);
      runScript(window, document);
    } catch (e) {
      console.error("Error cargando script.js:", e);
    }
  });

  it('debe mostrar la página de inicio por defecto', () => {
    const inicio = document.getElementById('inicio');
    expect(inicio).not.toBeNull();
    expect(inicio.classList.contains('active')).toBe(true);
  });

  it('debe ejecutar scrollToSection sin romper el test', () => {
    // Verificamos que la función exista antes de llamarla
    expect(typeof window.scrollToSection).toBe('function');
    
    expect(() => {
      window.scrollToSection('inicio');
    }).not.toThrow();
  });
});