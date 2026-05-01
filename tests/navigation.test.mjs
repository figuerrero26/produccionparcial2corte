import { describe, it, expect, beforeEach } from 'vitest';
import { JSDOM } from 'jsdom';
import fs from 'fs';
import path from 'path';

const html = fs.readFileSync(path.resolve('index.html'), 'utf8');
const scriptCode = fs.readFileSync(path.resolve('script.js'), 'utf8');

describe('Navegación', () => {
  let dom, document, window;

  beforeEach(() => {
    dom = new JSDOM(html, { runScripts: 'dangerously', resources: 'usable' });
    document = dom.window.document;
    window = dom.window;
    const scriptEl = document.createElement('script');
    scriptEl.textContent = scriptCode;
    document.body.appendChild(scriptEl);
  });

  it('debe mostrar la página de inicio por defecto', () => {
    const inicio = document.getElementById('inicio');
    expect(inicio.classList.contains('active')).toBe(true);
  });
});
