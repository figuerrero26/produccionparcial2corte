const { describe, it, expect, beforeEach } = require('vitest');
const { JSDOM } = require('jsdom');
const fs = require('fs');

const html = fs.readFileSync('index.html', 'utf8');

describe('Validaciones básicas de la interfaz', () => {
  let dom, document;

  beforeEach(() => {
    dom = new JSDOM(html, { runScripts: 'dangerously' });
    document = dom.window.document;
  });

  it('el botón de registro responde al click', () => {
    const button = document.querySelector('button[type="submit"]');
    expect(button).not.toBeNull();
    let clicked = false;
    button.addEventListener('click', () => { clicked = true; });
    button.click();
    expect(clicked).toBe(true);
  });
});