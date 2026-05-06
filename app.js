import { apps, appsById } from './data/index.js';
import { renderNav } from './components/nav.js';
import { renderViewer } from './components/viewer.js';
import { renderPanel } from './components/panel.js';

// ─── State ───────────────────────────────────────────────────────────────────

function parseHash() {
  const hash = location.hash.replace(/^#/, '');
  const [appId, screenId, annotationId] = hash.split('/');
  return { appId: appId || null, screenId: screenId || null, annotationId: annotationId || null };
}

function navigate(appId, screenId, annotationId) {
  const parts = [appId, screenId, annotationId].filter(Boolean);
  location.hash = parts.join('/');
}

// ─── Render ───────────────────────────────────────────────────────────────────

function render() {
  const { appId, screenId, annotationId } = parseHash();

  const app = (appId && appsById[appId]) || apps[0];
  const screen = (screenId && app.screens.find(s => s.id === screenId)) || app.screens[0];
  const annotation = annotationId
    ? screen.annotations.find(a => a.id === annotationId) || null
    : null;

  // Apply app accent color as CSS custom property
  document.documentElement.style.setProperty('--app-accent', app.accentColor);

  // Update document title
  document.title = `${app.name} — ${screen.label} | Eye for Design`;

  renderNav(apps, app, screen, navigate);
  renderViewer(screen, annotation?.id ?? null);
  renderPanel(screen, annotation, navigate, app.id);
}

// ─── Events ───────────────────────────────────────────────────────────────────

// Delegated click handling for dynamically rendered elements
document.addEventListener('click', e => {
  const marker = e.target.closest('.callout-marker');
  if (marker) {
    const { appId, screenId } = parseHash();
    const app = (appId && appsById[appId]) || apps[0];
    const screen = (screenId && app.screens.find(s => s.id === screenId)) || app.screens[0];
    const annotationId = marker.dataset.annotationId;
    // Toggle off if already active
    const currentAnnotationId = parseHash().annotationId;
    if (currentAnnotationId === annotationId) {
      navigate(app.id, screen.id);
    } else {
      navigate(app.id, screen.id, annotationId);
    }
    return;
  }

  const annotationItem = e.target.closest('.annotation-item');
  if (annotationItem) {
    const { appId, screenId } = parseHash();
    const app = (appId && appsById[appId]) || apps[0];
    const screen = (screenId && app.screens.find(s => s.id === screenId)) || app.screens[0];
    const annotationId = annotationItem.dataset.annotationId;
    const currentAnnotationId = parseHash().annotationId;
    if (currentAnnotationId === annotationId) {
      navigate(app.id, screen.id);
    } else {
      navigate(app.id, screen.id, annotationId);
    }
    return;
  }
});

// Keyboard navigation
document.addEventListener('keydown', e => {
  const { appId, screenId, annotationId } = parseHash();
  const app = (appId && appsById[appId]) || apps[0];
  const screen = (screenId && app.screens.find(s => s.id === screenId)) || app.screens[0];
  const screenIdx = app.screens.indexOf(screen);

  // [ and ] to navigate between screens
  if (e.key === '[' && !e.metaKey && !e.ctrlKey) {
    e.preventDefault();
    if (screenIdx > 0) navigate(app.id, app.screens[screenIdx - 1].id);
    return;
  }
  if (e.key === ']' && !e.metaKey && !e.ctrlKey) {
    e.preventDefault();
    if (screenIdx < app.screens.length - 1) navigate(app.id, app.screens[screenIdx + 1].id);
    return;
  }

  // Arrow keys to navigate between annotations
  if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
    e.preventDefault();
    const annotations = screen.annotations;
    const idx = annotationId ? annotations.findIndex(a => a.id === annotationId) : -1;
    const next = annotations[(idx + 1) % annotations.length];
    navigate(app.id, screen.id, next.id);
    return;
  }
  if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
    e.preventDefault();
    const annotations = screen.annotations;
    const idx = annotationId ? annotations.findIndex(a => a.id === annotationId) : 0;
    const prev = annotations[(idx - 1 + annotations.length) % annotations.length];
    navigate(app.id, screen.id, prev.id);
    return;
  }

  // Escape to deselect annotation
  if (e.key === 'Escape' && annotationId) {
    e.preventDefault();
    navigate(app.id, screen.id);
    return;
  }
});

// ─── Boot ─────────────────────────────────────────────────────────────────────

window.addEventListener('hashchange', render);
render();
