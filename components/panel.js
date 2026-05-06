export function renderPanel(screen, annotation, navigate, appId) {
  renderDetail(annotation);
  renderIndex(screen, annotation, navigate, appId);
}

function renderDetail(annotation) {
  const detail = document.getElementById('panel-detail');

  if (!annotation) {
    detail.innerHTML = `
      <div class="panel-empty-state">
        <svg width="40" height="40" viewBox="0 0 40 40" fill="none" aria-hidden="true">
          <circle cx="20" cy="20" r="16" stroke="var(--app-accent)" stroke-width="1.5" stroke-dasharray="5 3" opacity="0.5"/>
          <circle cx="20" cy="20" r="6" fill="var(--app-accent)" opacity="0.2"/>
          <text x="20" y="24" text-anchor="middle" font-size="10" font-weight="700" fill="var(--app-accent)" opacity="0.8" font-family="system-ui,sans-serif">1</text>
        </svg>
        <p>Click a numbered marker on the screenshot to explore the UX decision behind it.</p>
      </div>`;
    return;
  }

  const sourcesHtml = annotation.sources && annotation.sources.length
    ? `<div class="panel-sources">
        <div class="panel-sources-label">Sources</div>
        ${annotation.sources.map(s =>
          `<a class="source-link" href="${escapeAttr(s.url)}" target="_blank" rel="noopener noreferrer">${escape(s.label)}</a>`
        ).join('')}
      </div>`
    : '';

  const principlesHtml = annotation.principles && annotation.principles.length
    ? `<div class="panel-principles">
        ${annotation.principles.map(p => `<span class="principle-tag">${escape(p)}</span>`).join('')}
      </div>`
    : '';

  detail.innerHTML = `
    <div class="panel-annotation-label" aria-hidden="true">${escape(annotation.label)}</div>
    <h2 class="panel-annotation-title">${escape(annotation.title)}</h2>
    <p class="panel-annotation-analysis">${escape(annotation.analysis)}</p>
    ${principlesHtml}
    ${sourcesHtml}`;

  detail.scrollTop = 0;
}

function renderIndex(screen, activeAnnotation, navigate, appId) {
  const index = document.getElementById('panel-index');

  index.innerHTML = `<div class="panel-index-header">All annotations</div>`;

  for (const annotation of screen.annotations) {
    const isActive = activeAnnotation && annotation.id === activeAnnotation.id;
    const btn = document.createElement('button');
    btn.className = 'annotation-item' + (isActive ? ' active' : '');
    btn.setAttribute('aria-current', isActive ? 'true' : 'false');
    btn.dataset.annotationId = annotation.id;
    btn.innerHTML = `
      <span class="annotation-item-num" aria-hidden="true">${escape(annotation.label)}</span>
      <span class="annotation-item-title">${escape(annotation.title)}</span>`;
    index.appendChild(btn);
  }
}

function escape(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function escapeAttr(str) {
  return String(str).replace(/"/g, '&quot;');
}
