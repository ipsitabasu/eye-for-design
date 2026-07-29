// Recreation of the Vault landing page from a real Harvey screenshot.
// Ownership ("yours" vs "shared") isn't visible in the source screenshot for
// every card, so the "Your Projects" filter below is a reasonable demo
// assumption (non-Shared projects), not a captured fact.

const ICONS = {
  docs: '<svg width="28" height="28" viewBox="0 0 28 28" fill="none"><path d="M8 5h9l4 4v14H8V5Z" stroke="currentColor" stroke-width="1.4" stroke-linejoin="round"/><path d="M11 12h6M11 16h6M11 20h4" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/></svg>',
  people: '<svg width="28" height="28" viewBox="0 0 28 28" fill="none"><path d="M6 8a2 2 0 0 1 2-2h5.5l2 2H20a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2V8Z" stroke="currentColor" stroke-width="1.4" stroke-linejoin="round"/><circle cx="12.5" cy="13.5" r="1.8" stroke="currentColor" stroke-width="1.3"/><path d="M9.3 18.2c.5-1.7 1.7-2.7 3.2-2.7s2.7 1 3.2 2.7" stroke="currentColor" stroke-width="1.3" stroke-linecap="round"/></svg>',
  folder: '<svg width="28" height="28" viewBox="0 0 28 28" fill="none"><path d="M5 9a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v7.5a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V9Z" stroke="currentColor" stroke-width="1.4" stroke-linejoin="round"/></svg>',
};

const PROJECTS = [
  { name: 'M&A (US)', files: 26593, type: 'Knowledge base', icon: 'docs', dot: true, shared: false },
  { name: 'Cross-Border Tax Strategies', files: 14977, type: 'Knowledge base', icon: 'docs', dot: true, shared: false },
  { name: 'Avenor AI - Series B Financing', files: 8201, type: 'Shared', icon: 'people', dot: true, shared: true },
  { name: 'Amend v Delta IP Litigation', files: 36897, type: 'Shared', icon: 'people', dot: true, shared: true },
  { name: 'Northbridge Holdings', files: 4065, type: null, icon: 'folder', dot: false, shared: false },
  { name: 'Commercial Contracts', files: 92841, type: 'Vault', icon: 'folder', dot: false, shared: false },
];

const grid = document.getElementById('projectGrid');
const tabs = document.getElementById('pageTabs');
const searchBox = document.getElementById('searchBox');

let activeFilter = 'all';
let query = '';

function fmt(n) {
  return n.toLocaleString('en-US');
}

function render() {
  const q = query.trim().toLowerCase();
  const list = PROJECTS.filter((p) => {
    if (activeFilter === 'shared' && !p.shared) return false;
    if (activeFilter === 'yours' && p.shared) return false;
    if (q && !p.name.toLowerCase().includes(q)) return false;
    return true;
  });

  grid.innerHTML = list.map((p) => `
    <div class="project-card">
      <div class="project-thumb">${ICONS[p.icon]}</div>
      <div class="project-body">
        <div class="project-name-row">
          <span class="project-name">${p.name}</span>
          ${p.dot ? '<span class="status-dot"></span>' : ''}
        </div>
        <span class="project-meta">${fmt(p.files)} files${p.type ? ' · ' + p.type : ''}</span>
        <span class="project-menu">···</span>
      </div>
    </div>
  `).join('');
}

tabs.addEventListener('click', (e) => {
  const btn = e.target.closest('.tab');
  if (!btn) return;
  tabs.querySelectorAll('.tab').forEach((t) => t.classList.remove('tab--active'));
  btn.classList.add('tab--active');
  activeFilter = btn.dataset.filter;
  render();
});

searchBox.addEventListener('input', (e) => {
  query = e.target.value;
  render();
});

render();
