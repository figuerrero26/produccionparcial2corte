describe('Navegación', () => {
import { describe, it, expect, beforeEach } from 'vitest';
import fs from 'fs';
import path from 'path';

const html = fs.readFileSync(path.resolve(process.cwd(), 'index.html'), 'utf8');
const scriptCode = fs.readFileSync(path.resolve(process.cwd(), 'script.js'), 'utf8');

describe('Navegación', () => {
  beforeEach(() => {
    document.body.innerHTML = html;
    const scriptEl = document.createElement('script');
    scriptEl.textContent = scriptCode;
    document.body.appendChild(scriptEl);
  });

  it('debe mostrar la página de inicio por defecto', () => {
    const inicio = document.getElementById('inicio');
    expect(inicio.classList.contains('active')).toBe(true);
  });
});
