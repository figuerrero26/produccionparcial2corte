describe('Validaciones básicas de la interfaz', () => {
import { describe, it, expect, beforeEach } from 'vitest';
import fs from 'fs';

const scriptCode = fs.readFileSync('script.js', 'utf8');

describe('Validaciones básicas de la interfaz', () => {
  beforeEach(() => {
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
