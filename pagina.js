/* Resplandor que acompaña al cursor -------------------------------- */
const luz = document.getElementById('luz');
if (luz) {
  addEventListener('pointermove', e => {
    luz.style.setProperty('--x', e.clientX + 'px');
    luz.style.setProperty('--y', e.clientY + 'px');
  });
}

/* Buscador de las páginas de sección ------------------------------- */
const filtro = document.getElementById('filtro');
if (filtro) {
  const obras   = [...document.querySelectorAll('#lista .obra')];
  const cuantos = document.getElementById('cuantos');
  const vacio   = document.getElementById('vacio');
  const plural   = filtro.dataset.plural   || 'entradas';
  const singular = filtro.dataset.singular || 'entrada';

  const normaliza = t => t.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');

  function filtrar() {
    const q = normaliza(filtro.value.trim());
    let n = 0;
    obras.forEach(o => {
      const visible = !q || normaliza(o.textContent).includes(q);
      o.style.display = visible ? '' : 'none';
      if (visible) n++;
    });
    vacio.style.display = n ? 'none' : 'block';
    const total = obras.length;
    cuantos.textContent = q
      ? n + ' de ' + total
      : total + ' ' + (total === 1 ? singular : plural);
  }
  filtro.addEventListener('input', filtrar);
  filtrar();
}
