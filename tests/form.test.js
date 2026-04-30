const { describe, it, expect, beforeEach } = require('vitest');
const { JSDOM } = require('jsdom');
const fs = require('fs');

const html = fs.readFileSync('index.html', 'utf8');

describe('Formulario de registro', () => {
  let dom, document;

  beforeEach(() => {
    dom = new JSDOM(html, { runScripts: 'dangerously' });
    document = dom.window.document;
  });

  it('debe validar campos obligatorios', () => {
    const form = document.querySelector('form');
    const input = document.querySelector('input[name="nombre"]');
    input.value = '';
    const event = new dom.window.Event('submit', { bubbles: true, cancelable: true });
    let prevented = false;
    form.addEventListener('submit', e => { prevented = e.defaultPrevented; });
    form.dispatchEvent(event);
    expect(prevented).toBe(true);
  });
});