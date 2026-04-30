const { describe, it, expect, beforeEach } = require('vitest');
const { JSDOM } = require('jsdom');
const fs = require('fs');

const html = fs.readFileSync('index.html', 'utf8');

describe('Navegación del sitio', () => {
  let dom, document;

  beforeEach(() => {
    dom = new JSDOM(html, { runScripts: 'dangerously' });
    document = dom.window.document;
  });

  it('los enlaces principales existen', () => {
    const navLinks = document.querySelectorAll('nav a');
    expect(navLinks.length).toBeGreaterThan(0);
  });
});