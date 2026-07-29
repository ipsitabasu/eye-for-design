// Shared app-shell sidebar, reused across the four phase concept pages.
// Items marked `new: true` don't exist in Harvey today — they're this
// roadmap's proposed additions, tagged visually with the accent "NEW" pill
// per harvey-design.md's rule that the accent color is reserved for
// agent/new-thing indicators.

const NAV_ITEMS = [
  { key: 'assistant', label: 'Assistant', href: '../harvey-vault-webapp/index.html', icon: 'M3 3h10v7H6l-3 3V3Z' },
  { key: 'workspace', label: 'Workspace', href: 'phase1-workspace.html', icon: 'M2.5 4h11v8h-11z M2.5 6.5h11', new: true },
  { key: 'vault', label: 'Vault', href: '../harvey-vault-webapp/index.html', icon: 'M2 5a2 2 0 0 1 2-2h2.5l1.5 1.5H12a2 2 0 0 1 2 2v5.5a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5Z' },
  { key: 'search', label: 'Cross-Matter Search', href: 'phase2-search.html', icon: 'M7 3a4 4 0 1 1 0 8 4 4 0 0 1 0-8Z M10.2 10.2L13 13', new: true },
  { key: 'workflows', label: 'Workflows', href: '#', icon: '' , dotIcon: true },
  { key: 'history', label: 'History', href: '#', icon: 'M8 8a5.8 5.8 0 1 1 0-11.6A5.8 5.8 0 0 1 8 8Z', clockIcon: true },
  { key: 'library', label: 'Library', href: '#', icon: '', bookIcon: true },
  { key: 'client-spaces', label: 'Client Spaces', href: 'phase3-client-space.html', icon: '', peopleIcon: true, new: true },
  { key: 'agents', label: 'Agents & Training', href: 'phase4-agents.html', icon: '', sparkIcon: true, new: true },
  { key: 'guidance', label: 'Guidance', href: '#', icon: '', checkIcon: true },
];

function iconFor(item) {
  if (item.dotIcon) return '<svg class="nav-icon" width="16" height="16" viewBox="0 0 16 16" fill="none"><circle cx="4" cy="4" r="1.6" stroke="currentColor" stroke-width="1.3"/><circle cx="12" cy="8" r="1.6" stroke="currentColor" stroke-width="1.3"/><circle cx="4" cy="12" r="1.6" stroke="currentColor" stroke-width="1.3"/><path d="M5.4 4.7L10.6 7.4M10.6 8.6L5.4 11.3" stroke="currentColor" stroke-width="1.2"/></svg>';
  if (item.clockIcon) return '<svg class="nav-icon" width="16" height="16" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="5.8" stroke="currentColor" stroke-width="1.3"/><path d="M8 5v3.2l2.2 1.3" stroke="currentColor" stroke-width="1.3" stroke-linecap="round"/></svg>';
  if (item.bookIcon) return '<svg class="nav-icon" width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M3 3.5c1.6-1 3.4-1 5 0v9c-1.6-1-3.4-1-5 0v-9Z" stroke="currentColor" stroke-width="1.3" stroke-linejoin="round"/><path d="M13 3.5c-1.6-1-3.4-1-5 0v9c1.6-1 3.4-1 5 0v-9Z" stroke="currentColor" stroke-width="1.3" stroke-linejoin="round"/></svg>';
  if (item.checkIcon) return '<svg class="nav-icon" width="16" height="16" viewBox="0 0 16 16" fill="none"><rect x="3" y="2.5" width="10" height="11" rx="1.3" stroke="currentColor" stroke-width="1.3"/><path d="M5.5 6.5l1.7 1.7L10.5 5" stroke="currentColor" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"/></svg>';
  if (item.peopleIcon) return '<svg class="nav-icon" width="16" height="16" viewBox="0 0 16 16" fill="none"><circle cx="5.5" cy="6" r="2" stroke="currentColor" stroke-width="1.3"/><circle cx="11" cy="7" r="1.6" stroke="currentColor" stroke-width="1.3"/><path d="M2.3 13c.5-2.4 1.9-3.6 3.2-3.6s2.7 1.2 3.2 3.6M9.6 13c.4-1.8 1.4-2.8 2.5-2.8" stroke="currentColor" stroke-width="1.2" stroke-linecap="round"/></svg>';
  if (item.sparkIcon) return '<svg class="nav-icon" width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M8 2c.4 2.4 1.6 3.6 4 4-2.4.4-3.6 1.6-4 4-.4-2.4-1.6-3.6-4-4 2.4-.4 3.6-1.6 4-4Z" stroke="currentColor" stroke-width="1.1" stroke-linejoin="round"/></svg>';
  if (item.key === 'workspace') return '<svg class="nav-icon" width="16" height="16" viewBox="0 0 16 16" fill="none"><rect x="2.5" y="3" width="11" height="10" rx="1.3" stroke="currentColor" stroke-width="1.3"/><path d="M2.5 6.5h11" stroke="currentColor" stroke-width="1.3"/></svg>';
  if (item.key === 'search') return '<svg class="nav-icon" width="16" height="16" viewBox="0 0 16 16" fill="none"><circle cx="7" cy="7" r="4" stroke="currentColor" stroke-width="1.3"/><path d="M10.2 10.2L13.3 13.3" stroke="currentColor" stroke-width="1.3" stroke-linecap="round"/></svg>';
  return '<svg class="nav-icon" width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M3 3h10v7H6l-3 3V3Z" stroke="currentColor" stroke-width="1.3" stroke-linejoin="round"/></svg>';
}

function renderShell(activeKey) {
  const root = document.getElementById('sidebar-root');
  if (!root) return;

  const navHtml = NAV_ITEMS.map((item) => {
    const active = item.key === activeKey;
    return `
      <a class="nav-item${active ? ' nav-item--active' : ''}" href="${item.href}">
        ${iconFor(item)}
        ${item.label}
        ${item.new ? '<span class="nav-new-badge">NEW</span>' : ''}
      </a>`;
  }).join('');

  root.innerHTML = `
    <aside class="sidebar">
      <button class="org-switcher">
        <span class="org-mark">W</span>
        <span class="org-name">Whitford Lane</span>
        <svg class="chev" width="10" height="10" viewBox="0 0 10 10" fill="none"><path d="M2 3.5L5 6.5L8 3.5" stroke="currentColor" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"/></svg>
      </button>
      <button class="btn-create">
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M7 2V12M2 7H12" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>
        Create
      </button>
      <nav class="nav-list">${navHtml}</nav>
      <a class="nav-help" href="#">
        <svg width="15" height="15" viewBox="0 0 15 15" fill="none"><circle cx="7.5" cy="7.5" r="6" stroke="currentColor" stroke-width="1.2"/><path d="M5.8 5.8a1.7 1.7 0 0 1 3.3.5c0 1.1-1.6 1.2-1.6 2.3" stroke="currentColor" stroke-width="1.1" stroke-linecap="round"/><circle cx="7.5" cy="10.6" r="0.5" fill="currentColor"/></svg>
        Help
      </a>
    </aside>`;
}
