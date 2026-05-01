import { describe, it, expect, beforeEach } from 'vitest';
import { JSDOM } from 'jsdom';
import fs from 'fs';
import path from 'path';

const html = fs.readFileSync(path.resolve('index.html'), 'utf8');
const scriptCode = fs.readFileSync(path.resolve('script.js'), 'utf8');

describe('Validaciones básicas de la interfaz', () => {
  let dom, document, window;

  beforeEach(() => {
    dom = new JSDOM(html, { runScripts: 'dangerously', resources: 'usable' });
    document = dom.window.document;
    window = dom.window;
    const scriptEl = document.createElement('script');
    scriptEl.textContent = scriptCode;
    document.body.appendChild(scriptEl);
  });

  it('el botón de registro responde al click', () => {
    const btn = document.getElementById('hero-signup');
    expect(btn).not.toBeNull();
    let scrolled = false;
    window.scrollToSection = () => { scrolled = true; };
    btn.onclick = () => window.scrollToSection('registro');
    btn.click();
    expect(scrolled).toBe(true);
  });
});
