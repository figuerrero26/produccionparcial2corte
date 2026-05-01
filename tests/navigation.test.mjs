describe('Navegación', () => {
import { describe, it, expect, beforeEach } from 'vitest';
import fs from 'fs';

const scriptCode = fs.readFileSync('script.js', 'utf8');

describe('Navegación', () => {
  beforeEach(() => {
    const scriptEl = document.createElement('script');
    scriptEl.textContent = scriptCode;
    document.body.appendChild(scriptEl);
  });

  it('debe mostrar la página de inicio por defecto', () => {
    const inicio = document.getElementById('inicio');
    expect(inicio.classList.contains('active')).toBe(true);
  });
});
