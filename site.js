(() => {
  'use strict';
  const tools = document.querySelector('.research-tools');
  if (!tools) return;
  const input = document.querySelector('#research-search');
  const year = document.querySelector('#research-year');
  const buttons = [...document.querySelectorAll('[data-filter]')];
  const groups = [...document.querySelectorAll('.research-block')].filter(g => g.querySelector('.pub-list'));
  const normalize = value => value.normalize('NFKD').replace(/[\u0300-\u036f]/g, '').toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim();
  const records = groups.flatMap(group => [...group.querySelectorAll('.pub-list > li')].map(el => {
    const type = group.querySelector('.group-title').textContent.trim();
    const date = el.querySelector('.pub-year').textContent.trim();
    return { el, group, type, year: /^\d{4}$/.test(date) ? date : '', text: normalize(el.textContent) };
  }));
  [...new Set(records.map(r => r.year).filter(Boolean))].sort().reverse().forEach(value => {
    const option = document.createElement('option'); option.value = value; option.textContent = value; year.append(option);
  });
  let type = 'all';
  function filter() {
    const tokens = normalize(input.value).split(' ').filter(Boolean);
    let count = 0;
    records.forEach(r => {
      const show = (type === 'all' || type === r.type) && (year.value === 'all' || year.value === r.year) && tokens.every(t => r.text.includes(t));
      r.el.hidden = !show; if (show) count++;
    });
    groups.forEach(g => { g.hidden = !records.some(r => r.group === g && !r.el.hidden); });
    document.querySelector('#result-count').textContent = `${count} of ${records.length} works`;
    document.querySelector('#no-results').hidden = count !== 0;
    buttons.forEach(b => b.setAttribute('aria-pressed', String(b.dataset.filter === type)));
  }
  buttons.forEach(b => b.addEventListener('click', () => { type = b.dataset.filter; filter(); }));
  input.addEventListener('input', filter); year.addEventListener('change', filter);
  document.querySelector('#reset-filters').addEventListener('click', () => { input.value = ''; year.value = 'all'; type = 'all'; filter(); input.focus(); });
  tools.hidden = false; filter();
})();
