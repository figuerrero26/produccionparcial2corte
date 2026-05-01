import fs from 'fs';

// Cargar el HTML antes de cada test
global.beforeEach(() => {
  document.body.innerHTML = fs.readFileSync('index.html', 'utf8');
});
