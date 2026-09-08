export function renderViewer(screen, activeAnnotationId) {
  const frame = document.getElementById('viewer-frame');
  const img = document.getElementById('viewer-img');
  const skeleton = document.getElementById('viewer-skeleton');
  const context = document.getElementById('viewer-context');

  frame.style.paddingBottom = `${(screen.imageHeight / screen.imageWidth) * 100}%`;
  context.textContent = screen.context || '';

  const targetSrc = screen.imageUrl;
  if (img.dataset.src !== targetSrc) {
    img.dataset.src = targetSrc;
    skeleton.classList.remove('hidden');
    img.classList.add('loading');
    img.alt = `${screen.label} screenshot`;

    const probe = new Image();
    probe.onload = () => {
      img.src = probe.src;
      img.classList.remove('loading');
      skeleton.classList.add('hidden');
    };
    probe.onerror = () => {
      img.src = makePlaceholder(screen);
      img.classList.remove('loading');
      skeleton.classList.add('hidden');
    };
    probe.src = targetSrc;
  }

  frame.querySelectorAll('.callout-marker').forEach(m => m.remove());
  for (const annotation of screen.annotations) {
    const marker = document.createElement('button');
    marker.className = 'callout-marker' + (annotation.id === activeAnnotationId ? ' active' : '');
    marker.style.left = `${annotation.x}%`;
    marker.style.top  = `${annotation.y}%`;
    marker.textContent = annotation.label;
    marker.setAttribute('aria-label', `Marker ${annotation.label}: ${annotation.title}`);
    marker.dataset.annotationId = annotation.id;
    frame.appendChild(marker);
  }
}

// ── Placeholder router ────────────────────────────────────────────────────

const PLACEHOLDERS = {
  'linear/inbox':           linearInbox,
  'linear/issues':          linearIssues,
  'linear/cycles':          linearCycles,
  'duolingo/home':          duolingoHome,
  'duolingo/lesson':        duolingoLesson,
  'duolingo/leaderboard':   duolingoLeaderboard,
  'notion/editor':          notionEditor,
  'notion/database':        notionDatabase,
  'notion/sidebar':         notionSidebar,
  'stripe/dashboard':       stripeDashboard,
  'stripe/checkout':        stripeCheckout,
  'stripe/payment-links':   stripePaymentLinks,
  'harvey/queue':           harveyQueue,
  'harvey/audit':           harveyAudit,
  'harvey/command-center':  harveyCommandCenter,
  'harvey/handoff':         harveyHandoff,
};

function makePlaceholder(screen) {
  const key = screen.imageUrl.replace('assets/screenshots/', '').replace('.png', '');
  const fn = PLACEHOLDERS[key] || (() => genericSVG(screen));
  return 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(fn());
}

// ── SVG helpers ────────────────────────────────────────────────────────────

const W = 1440, H = 900;

function svg(content, bg = '#0f0f10') {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif">
<rect width="${W}" height="${H}" fill="${bg}"/>
${content}
</svg>`;
}

function r(x, y, w, h, fill, rx = 0) {
  return `<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="${fill}" rx="${rx}"/>`;
}

function t(x, y, text, size, fill, anchor = 'start', weight = 400) {
  return `<text x="${x}" y="${y}" font-size="${size}" fill="${fill}" text-anchor="${anchor}" font-weight="${weight}">${esc(text)}</text>`;
}

function esc(s) {
  return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
}

function line(x1, y1, x2, y2, stroke, sw = 1) {
  return `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${stroke}" stroke-width="${sw}"/>`;
}

function circle(cx, cy, r2, fill) {
  return `<circle cx="${cx}" cy="${cy}" r="${r2}" fill="${fill}"/>`;
}

function pill(x, y, w, h, fill) {
  return r(x, y, w, h, fill, h / 2);
}

// ── LINEAR INBOX ──────────────────────────────────────────────────────────
function linearInbox() {
  const DARK = '#0f0f10', S1 = '#1a1a1d', S2 = '#222226', S3 = '#2a2a2f', BORDER = '#2e2e34';
  const PURPLE = '#5E6AD2', TEXT = '#e8e8ea', MUTED = '#888890', FAINT = '#444450';

  const sidebarItems = ['⌂','●','◎','⬡','◷','⊞','◈'];
  const rows = [
    { title: 'ENG-412 · Refactor auth middleware', sub: 'Alex commented · 2m ago', dot: PURPLE },
    { title: 'ENG-408 · Fix payment webhook retry', sub: 'Status changed to In Progress · 5m ago', dot: '#4CAF50' },
    { title: 'ENG-415 · Add rate limiting to API', sub: 'Assigned to you · 12m ago', dot: PURPLE },
    { title: 'ENG-401 · Update OpenAPI spec', sub: 'Mia mentioned you · 1h ago', dot: MUTED },
    { title: 'ENG-399 · Migrate to Postgres 15', sub: 'Status changed to Done · 2h ago', dot: '#4CAF50' },
    { title: 'ENG-387 · Dashboard load time regression', sub: 'James commented · 3h ago', dot: '#FF5252' },
    { title: 'ENG-382 · Add dark mode toggle', sub: 'Kai assigned this to you · Yesterday', dot: PURPLE },
    { title: 'ENG-371 · Refactor notification service', sub: 'Status changed to In Review · Yesterday', dot: '#FFB300' },
    { title: 'ENG-365 · Integrate Sentry error tracking', sub: 'Lu commented · 2d ago', dot: MUTED },
    { title: 'ENG-358 · Add CSV export to reports', sub: 'Alex mentioned you · 2d ago', dot: PURPLE },
    { title: 'ENG-344 · Cache invalidation bug', sub: 'Status changed to Cancelled · 3d ago', dot: FAINT },
    { title: 'ENG-337 · Redesign settings page', sub: 'Mia commented · 3d ago', dot: MUTED },
  ];

  let body = '';
  // Sidebar
  body += r(0, 0, 48, H, S1);
  body += r(48, 0, 1, H, BORDER);
  sidebarItems.forEach((ic, i) => {
    const y = 60 + i * 54;
    if (i === 1) body += r(4, y - 10, 40, 36, S3, 6);
    body += t(24, y + 14, ic, 16, i === 1 ? TEXT : FAINT, 'middle', 400);
  });

  // Top bar
  body += r(49, 0, W - 49, 44, S1);
  body += line(49, 44, W, 44, BORDER);
  body += t(68, 26, 'Inbox', 14, TEXT, 'start', 600);
  body += pill(1320, 12, 96, 20, S3);
  body += t(1368, 25, '⌘K', 11, MUTED, 'middle', 500);

  // Section header
  body += r(49, 44, W - 49, 32, S2);
  body += line(49, 76, W, 76, BORDER);
  body += t(68, 63, 'TODAY', 10, FAINT, 'start', 700);
  body += pill(1380, 51, 40, 16, S3);
  body += t(1400, 62, '12', 10, MUTED, 'middle');

  // Inbox rows
  rows.forEach((row, i) => {
    const y = 76 + i * 66;
    const active = i < 3;
    body += r(49, y, W - 49, 66, i % 2 === 0 ? S2 : 'transparent');
    body += line(49, y + 66, W, y + 66, BORDER);
    // Unread dot
    if (active) body += circle(64, y + 33, 4, PURPLE);
    // Avatar
    body += r(80, y + 16, 32, 32, S3, 16);
    body += t(96, y + 36, '●', 12, row.dot, 'middle');
    // Text
    body += t(124, y + 28, row.title, 13, active ? TEXT : MUTED, 'start', active ? 500 : 400);
    body += t(124, y + 47, row.sub, 11, FAINT, 'start');
    // Time
    body += t(W - 20, y + 28, '', 11, FAINT, 'end');
    // Done action on hover (shown faintly)
    if (i === 0) {
      body += pill(W - 120, y + 18, 52, 22, S3);
      body += t(W - 94, y + 33, 'Done', 11, MUTED, 'middle');
      body += pill(W - 62, y + 18, 52, 22, S3);
      body += t(W - 36, y + 33, 'Snooze', 10, MUTED, 'middle');
    }
  });

  // Bottom hint bar
  body += r(49, H - 36, W - 49, 36, S1);
  body += line(49, H - 36, W, H - 36, BORDER);
  body += t(W / 2, H - 14, '⌘K  Open command palette', 11, FAINT, 'middle');

  return svg(body, DARK);
}

// ── LINEAR ISSUES ─────────────────────────────────────────────────────────
function linearIssues() {
  const DARK = '#0f0f10', S1 = '#1a1a1d', S2 = '#222226', S3 = '#2a2a2f', BORDER = '#2e2e34';
  const PURPLE = '#5E6AD2', TEXT = '#e8e8ea', MUTED = '#888890', FAINT = '#444450';

  let body = '';
  body += r(0, 0, 48, H, S1);
  body += r(48, 0, 1, H, BORDER);

  // Left panel — issue list
  body += r(49, 0, 340, H, S2);
  body += r(389, 0, 1, H, BORDER);
  body += r(49, 0, 340, 44, S1);
  body += line(49, 44, 389, 44, BORDER);
  body += t(68, 27, 'ENG Issues', 13, TEXT, 'start', 600);

  const issues = [
    { id: 'ENG-412', title: 'Refactor auth middleware', status: PURPLE, active: true },
    { id: 'ENG-415', title: 'Add rate limiting to API', status: '#FFB300', active: false },
    { id: 'ENG-408', title: 'Fix payment webhook retry', status: '#4CAF50', active: false },
    { id: 'ENG-401', title: 'Update OpenAPI spec', status: MUTED, active: false },
    { id: 'ENG-399', title: 'Migrate to Postgres 15', status: '#4CAF50', active: false },
    { id: 'ENG-387', title: 'Dashboard load time', status: '#FF5252', active: false },
    { id: 'ENG-382', title: 'Add dark mode toggle', status: PURPLE, active: false },
  ];
  issues.forEach((issue, i) => {
    const y = 52 + i * 46;
    body += r(49, y, 340, 46, issue.active ? S3 : 'transparent');
    if (issue.active) body += r(49, y, 3, 46, PURPLE);
    body += circle(74, y + 22, 7, 'none');
    body += r(68, y + 16, 14, 14, 'none', 7);
    body += `<rect x="68" y="16" width="14" height="14" rx="7" fill="none" stroke="${issue.status}" stroke-width="2" transform="translate(0,${y})"/>`;
    body += t(90, y + 27, issue.id, 10, FAINT, 'start');
    body += t(90, y + 40, issue.title, 11, issue.active ? TEXT : MUTED, 'start');
  });

  // Main content area
  body += r(390, 0, 560, H, DARK);
  body += r(390, 0, 560, 44, S1);
  body += line(390, 44, 950, 44, BORDER);
  body += t(410, 27, 'ENG-412', 11, FAINT);
  body += t(470, 27, '/', 11, FAINT);
  body += t(480, 27, 'Refactor auth middleware for token refresh', 12, TEXT);

  // Issue title
  body += t(410, 90, 'Refactor auth middleware for token refresh', 20, TEXT, 'start', 700);

  // Description paragraphs
  const lines = [
    'The current JWT middleware does not gracefully handle token expiry edge cases.',
    'Users are getting logged out mid-session when access tokens expire during',
    'long-running operations. We need to implement automatic token refresh.',
    '',
    'Acceptance criteria:',
    '• Refresh token flow implemented on 401 response',
    '• Existing sessions not interrupted during normal use',
    '• Refresh token rotation enabled',
  ];
  lines.forEach((ln, i) => {
    body += t(410, 124 + i * 20, ln || '', 12, ln ? MUTED : TEXT, 'start');
  });

  // Code block
  body += r(410, 300, 500, 100, S2, 6);
  body += r(410, 300, 500, 1, BORDER);
  body += t(426, 320, 'const refreshToken = async (token) => {', 11, '#7ec8e3', 'start');
  body += t(426, 338, '  const res = await fetch(\'/api/refresh\', {', 11, MUTED, 'start');
  body += t(426, 356, '    headers: { Authorization: `Bearer ${token}` }', 11, MUTED, 'start');
  body += t(426, 374, '  });', 11, MUTED, 'start');
  body += t(426, 392, '  return res.json();', 11, MUTED, 'start');

  // Activity log
  body += line(410, 430, 950, 430, BORDER);
  body += t(410, 452, 'Activity', 11, FAINT, 'start', 600);
  const activity = [
    { avatar: 'A', text: 'Alex changed status to In Progress', time: '2m ago' },
    { avatar: 'M', text: 'Mia commented: "Should we also handle 403 here?"', time: '14m ago' },
    { avatar: 'K', text: 'Kai assigned to Alex', time: '1h ago' },
    { avatar: 'A', text: 'Alex created this issue', time: '2h ago' },
  ];
  activity.forEach((a, i) => {
    const y = 468 + i * 56;
    body += r(410, y, 28, 28, S3, 14);
    body += t(424, y + 18, a.avatar, 11, PURPLE, 'middle', 700);
    body += t(446, y + 13, a.text, 12, MUTED);
    body += t(446, y + 27, a.time, 10, FAINT);
  });

  // Right rail
  body += r(950, 0, 1, H, BORDER);
  body += r(951, 0, W - 951, H, S1);
  const fields = [
    { label: 'Status', value: '◎ In Progress', color: '#FFB300' },
    { label: 'Priority', value: '⬆ High', color: '#FF5252' },
    { label: 'Assignee', value: '● Alex Chen', color: TEXT },
    { label: 'Cycle', value: 'Sprint 24', color: MUTED },
    { label: 'Label', value: 'Engineering', color: PURPLE },
    { label: 'Due date', value: 'Apr 18', color: MUTED },
  ];
  fields.forEach((f, i) => {
    const y = 60 + i * 56;
    body += t(971, y, f.label, 10, FAINT, 'start', 600);
    body += r(971, y + 8, W - 991, 28, S2, 4);
    body += t(983, y + 25, f.value, 12, f.color, 'start');
  });

  return svg(body, DARK);
}

// ── LINEAR CYCLES ─────────────────────────────────────────────────────────
function linearCycles() {
  const DARK = '#0f0f10', S1 = '#1a1a1d', S2 = '#222226', S3 = '#2a2a2f', BORDER = '#2e2e34';
  const PURPLE = '#5E6AD2', TEXT = '#e8e8ea', MUTED = '#888890', FAINT = '#444450';
  const GREEN = '#4CAF50';

  let body = '';
  body += r(0, 0, 48, H, S1);
  body += r(48, 0, 1, H, BORDER);
  body += r(49, 0, W - 49, 44, S1);
  body += line(49, 44, W, 44, BORDER);
  body += t(68, 27, 'Cycles', 14, TEXT, 'start', 600);

  // Tabs
  const tabs = ['Active', 'Upcoming', 'Completed'];
  tabs.forEach((tab, i) => {
    const x = 68 + i * 110;
    if (i === 0) {
      body += r(x - 8, 12, 96, 20, S3, 4);
      body += r(x - 8, 40, 96, 4, PURPLE, 2);
    }
    body += t(x + 40, 26, tab, 12, i === 0 ? TEXT : MUTED, 'middle', i === 0 ? 600 : 400);
  });

  const cycles = [
    { name: 'Sprint 24', range: 'Apr 8 – Apr 21', pct: 64, done: 18, total: 28, active: true },
    { name: 'Sprint 25', range: 'Apr 22 – May 5', pct: 0, done: 0, total: 22, active: false },
  ];

  cycles.forEach((cy, i) => {
    const y = 70 + i * 220;
    body += r(68, y, W - 136, 190, S2, 8);
    body += line(68, y + 44, W - 68, y + 44, BORDER);

    // Header
    body += t(88, y + 28, cy.name, 15, TEXT, 'start', 600);
    body += t(88, y + 42, cy.range, 11, MUTED, 'start');
    if (cy.active) {
      body += pill(W - 200, y + 14, 60, 20, `${PURPLE}33`);
      body += t(W - 170, y + 27, 'Active', 11, PURPLE, 'middle', 500);
    }

    // Stats row
    body += t(88, y + 68, `${cy.done}`, 22, TEXT, 'start', 700);
    body += t(88 + (cy.done > 9 ? 26 : 16), y + 68, `/${cy.total} issues`, 13, MUTED, 'start');

    // Scope creep badge
    if (cy.active) {
      body += pill(250, y + 52, 130, 20, `${FAINT}88`);
      body += t(315, y + 65, '3 added after start', 10, MUTED, 'middle');
    }

    // Progress bar
    body += r(88, y + 90, W - 224, 10, S3, 5);
    if (cy.pct > 0) body += r(88, y + 90, Math.round((W - 224) * cy.pct / 100), 10, PURPLE, 5);
    body += t(W - 120, y + 99, `${cy.pct}%`, 11, MUTED, 'end');

    // Mini issue list
    const issueColors = [GREEN, PURPLE, '#FFB300', MUTED, GREEN, GREEN];
    for (let j = 0; j < 6; j++) {
      const ix = 88 + j * 180, iy = y + 122;
      body += r(ix, iy, 14, 14, 'none', 7);
      body += `<rect x="${ix}" y="${iy}" width="14" height="14" rx="7" fill="none" stroke="${issueColors[j]}" stroke-width="1.5"/>`;
      body += r(ix + 20, iy + 3, 120 + (j % 3) * 20, 8, S3, 4);
    }
  });

  return svg(body, DARK);
}

// ── DUOLINGO HOME ─────────────────────────────────────────────────────────
function duolingoHome() {
  const BG = '#ffffff', NAV = '#ffffff', BORDER = '#e5e7eb';
  const GREEN = '#58CC02', DGREEN = '#46a302', GRAY = '#afafaf';
  const TEXT = '#3c3c3c', MUTED = '#777', LIGHT = '#f7f7f7';

  let body = '';
  // Nav
  body += r(0, 0, W, 56, NAV);
  body += line(0, 56, W, 56, BORDER);
  // Logo
  body += r(32, 14, 34, 28, GREEN, 6);
  body += t(49, 32, 'D', 18, '#fff', 'middle', 800);
  body += t(76, 32, 'duolingo', 16, TEXT, 'start', 700);
  // Nav icons
  body += t(560, 32, '🔥', 16, TEXT, 'middle');
  body += t(600, 32, '47', 14, TEXT, 'middle', 700);
  body += t(680, 32, '💎', 14, TEXT, 'middle');
  body += t(720, 32, '350', 14, TEXT, 'middle', 700);
  body += pill(900, 16, 120, 24, `${GREEN}22`);
  body += t(960, 31, '👑 Gold League', 11, GREEN, 'middle', 600);
  body += pill(1280, 16, 80, 24, GREEN);
  body += t(1320, 31, 'START', 11, '#fff', 'middle', 700);

  // Left sidebar
  body += r(0, 56, 220, H - 56, LIGHT);
  body += line(220, 56, 220, H, BORDER);
  body += t(24, 90, '🇪🇸  SPANISH', 11, GREEN, 'start', 800);
  body += t(24, 108, 'Section 1 · Basics', 10, MUTED, 'start');

  const skills = [
    { label: 'Basics 1', done: true, y: 130 },
    { label: 'Travel', done: true, y: 194 },
    { label: 'Food', done: false, y: 258 },
    { label: 'People', done: false, y: 322, locked: true },
  ];
  skills.forEach(sk => {
    const filled = sk.done;
    body += r(50, sk.y, 120, 44, filled ? GREEN : sk.locked ? '#e0e0e0' : LIGHT, 22);
    body += line(50, sk.y, 170, sk.y, filled ? DGREEN : BORDER);
    body += line(50, sk.y + 44, 170, sk.y + 44, filled ? DGREEN : BORDER);
    body += t(110, sk.y + 26, filled ? '✓' : sk.locked ? '🔒' : sk.label, 13, filled ? '#fff' : MUTED, 'middle', 700);
    if (!filled && !sk.locked) body += t(110, sk.y + 38, sk.label, 10, MUTED, 'middle');
  });

  // Main lesson path
  const lessonX = 380, lessonW = 540;
  // Continue button — hero CTA
  body += r(lessonX + 70, 80, lessonW - 140, 80, GREEN, 12);
  body += r(lessonX + 70, 148, lessonW - 140, 12, DGREEN, 12);
  body += t(lessonX + lessonW / 2, 128, 'CONTINUE', 18, '#fff', 'middle', 800);
  body += t(lessonX + lessonW / 2, 148, 'Section 2 · Lesson 1', 11, `${DGREEN}cc`, 'middle');

  // Lesson nodes
  const nodes = [
    { y: 230, label: 'Greetings', done: true },
    { y: 320, label: 'Numbers', done: false, active: true },
    { y: 410, label: 'Colors', done: false },
    { y: 500, label: 'Family', done: false, locked: true },
  ];
  nodes.forEach((n, i) => {
    const cx = lessonX + lessonW / 2 + (i % 2 === 0 ? 30 : -30);
    body += circle(cx, n.y, 40, n.done ? GREEN : n.active ? '#fff' : LIGHT);
    if (n.active) body += `<circle cx="${cx}" cy="${n.y}" r="40" fill="none" stroke="${GREEN}" stroke-width="3"/>`;
    body += t(cx, n.y + 6, n.done ? '✓' : n.active ? '▶' : '🔒', 18, n.done ? '#fff' : n.active ? GREEN : GRAY, 'middle', 700);
    body += t(cx, n.y + 55, n.label, 11, n.done ? GREEN : MUTED, 'middle');
  });

  // Right sidebar
  body += r(W - 300, 56, 300, H - 56, LIGHT);
  body += line(W - 300, 56, W - 300, H, BORDER);

  // XP ring
  body += t(W - 150, 110, 'Daily Goal', 12, MUTED, 'middle', 600);
  body += `<circle cx="${W - 150}" cy="180" r="50" fill="none" stroke="${BORDER}" stroke-width="10"/>`;
  body += `<circle cx="${W - 150}" cy="180" r="50" fill="none" stroke="${GREEN}" stroke-width="10" stroke-dasharray="${Math.round(314 * 0.65)} 314" stroke-dashoffset="78" stroke-linecap="round"/>`;
  body += t(W - 150, 188, '65 / 100 XP', 12, TEXT, 'middle', 700);

  // Streak freeze ad
  body += r(W - 280, 256, 260, 80, '#fff', 8);
  body += line(W - 280, 256, W - 20, 256, BORDER);
  body += line(W - 280, 336, W - 20, 336, BORDER);
  body += line(W - 280, 256, W - 280, 336, BORDER);
  body += line(W - 20, 256, W - 20, 336, BORDER);
  body += t(W - 150, 284, '🛡️ Streak Freeze', 12, TEXT, 'middle', 600);
  body += t(W - 150, 302, 'Protect your streak', 11, MUTED, 'middle');
  body += pill(W - 200, 314, 100, 18, GREEN);
  body += t(W - 150, 326, 'Equip', 11, '#fff', 'middle', 700);

  // Leaderboard widget
  body += r(W - 280, 356, 260, 200, '#fff', 8);
  body += line(W - 280, 356, W - 20, 356, BORDER);
  body += line(W - 280, 556, W - 20, 556, BORDER);
  body += line(W - 280, 356, W - 280, 556, BORDER);
  body += line(W - 20, 356, W - 20, 556, BORDER);
  body += t(W - 150, 382, '🏆 Gold League', 12, '#f4b942', 'middle', 700);
  body += t(W - 150, 400, '#4 of 30 · Top 15%', 11, MUTED, 'middle');
  const lbUsers = ['Elena M.  2840', 'Arjun K.   2610', 'Sofia R.    2490', '→ You         1820'];
  lbUsers.forEach((u, i) => {
    const isYou = i === 3;
    body += r(W - 274, 414 + i * 34, 254, 30, isYou ? `${GREEN}18` : 'transparent', 4);
    body += t(W - 262, 433 + i * 34, `${i + 1}`, 11, isYou ? GREEN : MUTED, 'start', isYou ? 700 : 400);
    body += t(W - 245, 433 + i * 34, u, 11, isYou ? TEXT : MUTED, 'start', isYou ? 600 : 400);
  });

  return svg(body, BG);
}

// ── DUOLINGO LESSON ───────────────────────────────────────────────────────
function duolingoLesson() {
  const BG = '#ffffff', GREEN = '#58CC02', DGREEN = '#46a302';
  const RED = '#FF4B4B', TEXT = '#3c3c3c', MUTED = '#777', BORDER = '#e5e7eb';
  const CORRECT_BG = '#D7FFB8', CORRECT_BORDER = '#58CC02';

  let body = '';
  // Progress bar
  body += r(0, 0, W, 10, '#e5e7eb');
  body += r(0, 0, Math.round(W * 0.62), 10, GREEN);

  // Close & hearts
  body += t(32, 40, '✕', 18, MUTED, 'start');
  body += t(W - 32, 40, '❤️❤️❤️', 18, TEXT, 'end');

  // Question area
  body += t(W / 2, 100, 'Translate this sentence', 14, MUTED, 'middle', 400);
  body += t(W / 2, 146, '"I eat breakfast every morning."', 22, TEXT, 'middle', 700);

  // Character / audio
  body += circle(W / 2, 240, 70, '#DDF4FF');
  body += t(W / 2, 252, '🔊', 32, '#1CB0F6', 'middle');
  body += pill(W / 2 - 80, 328, 160, 32, '#DDF4FF');
  body += t(W / 2, 349, 'Tap to hear', 12, '#1CB0F6', 'middle');

  // Answer choices
  const choices = [
    { text: 'Como el desayuno todos los días.', correct: true },
    { text: 'Yo tengo hambre por la mañana.', correct: false },
    { text: 'Me gusta el café con leche.', correct: false },
    { text: 'Ellos comen juntos cada semana.', correct: false },
  ];
  choices.forEach((ch, i) => {
    const col = i % 2, row2 = Math.floor(i / 2);
    const x = 320 + col * 420, y = 390 + row2 * 80;
    const bg = ch.correct ? CORRECT_BG : '#fff';
    const border = ch.correct ? CORRECT_BORDER : BORDER;
    body += r(x, y, 380, 60, bg, 12);
    body += `<rect x="${x}" y="${y}" width="380" height="60" rx="12" fill="none" stroke="${border}" stroke-width="2"/>`;
    body += t(x + 190, y + 35, ch.text, 13, ch.correct ? '#2D7A00' : TEXT, 'middle', ch.correct ? 600 : 400);
  });

  // Feedback banner
  body += r(0, H - 140, W, 140, CORRECT_BG);
  body += line(0, H - 140, W, H - 140, CORRECT_BORDER);
  body += t(60, H - 92, '✓  Correct!', 20, '#2D7A00', 'start', 700);
  body += t(60, H - 64, 'Great job! Keep it up.', 14, '#2D7A00', 'start');
  body += r(W - 220, H - 116, 160, 48, GREEN, 12);
  body += r(W - 220, H - 84, 160, 16, DGREEN, 12);
  body += t(W - 140, H - 82, 'CONTINUE', 14, '#fff', 'middle', 800);

  return svg(body, BG);
}

// ── DUOLINGO LEADERBOARD ──────────────────────────────────────────────────
function duolingoLeaderboard() {
  const BG = '#ffffff', GREEN = '#58CC02', RED = '#FF4B4B';
  const TEXT = '#3c3c3c', MUTED = '#777', BORDER = '#e5e7eb', LIGHT = '#f7f7f7';
  const GOLD = '#f4b942', PROMO = '#D7FFB8', DEMOTE = '#FFEBEB';

  let body = '';
  // Nav
  body += r(0, 0, W, 56, '#fff');
  body += line(0, 56, W, 56, BORDER);
  body += t(W / 2, 34, '🏆  Gold League', 20, GOLD, 'middle', 700);
  body += pill(W - 200, 16, 160, 24, '#FFF3E0');
  body += t(W - 120, 31, '⏱  4 days 12 hrs left', 11, '#FF9800', 'middle', 600);

  // Promotion zone label
  body += r(320, 64, 800, 24, `${GREEN}18`);
  body += t(720, 80, '↑  PROMOTION ZONE  —  Top 10 advance to Diamond League', 11, GREEN, 'middle', 700);

  const users = [
    { name: 'Elena M.', xp: 2840, you: false, pos: 1 },
    { name: 'Arjun K.', xp: 2610, you: false, pos: 2 },
    { name: 'Sofia R.', xp: 2490, you: false, pos: 3 },
    { name: 'Marcus T.', xp: 1940, you: false, pos: 4 },
    { name: 'Lena H.', xp: 1820, you: true,  pos: 5 },
    { name: 'James O.', xp: 1670, you: false, pos: 6 },
    { name: 'Priya S.', xp: 1540, you: false, pos: 7 },
    { name: 'Will B.', xp: 980,  you: false, pos: 8, demote: true },
    { name: 'Amy C.', xp: 750,  you: false, pos: 9, demote: true },
    { name: 'Tom N.', xp: 490,  you: false, pos: 10, demote: true },
  ];

  body += r(320, 88, 800, 24, `${RED}15`);
  body += t(720, 814, '↓  DEMOTION ZONE  —  Bottom 5 drop to Gold League', 11, RED, 'middle', 700);

  users.forEach((u, i) => {
    const y = 88 + i * 66;
    const bg = u.you ? '#FFFDE7' : i < 3 ? PROMO : u.demote ? DEMOTE : (i % 2 === 0 ? LIGHT : '#fff');
    body += r(320, y, 800, 66, bg);
    body += line(320, y, 1120, y, BORDER);

    // Rank
    body += t(350, y + 38, `#${u.pos}`, 14, u.you ? GOLD : i < 3 ? GREEN : MUTED, 'start', 700);

    // Avatar
    const avBg = u.you ? GOLD : i < 3 ? GREEN : '#d0d0d0';
    body += circle(420, y + 33, 22, avBg);
    body += t(420, y + 39, u.you ? 'Y' : u.name[0], 14, '#fff', 'middle', 700);

    // Name
    body += t(452, y + 30, u.you ? `${u.name} (You)` : u.name, 14, u.you ? TEXT : TEXT, 'start', u.you ? 700 : 400);

    // XP bar
    const barW = Math.round(400 * u.xp / 2840);
    body += r(640, y + 20, 400, 16, '#e5e7eb', 8);
    body += r(640, y + 20, barW, 16, u.you ? GOLD : i < 3 ? GREEN : u.demote ? RED : '#a0d0ff', 8);
    body += t(1052, y + 33, `${u.xp.toLocaleString()} XP`, 12, MUTED, 'start');
  });

  body += line(320, 88 + users.length * 66, 1120, 88 + users.length * 66, BORDER);

  return svg(body, BG);
}

// ── NOTION EDITOR ─────────────────────────────────────────────────────────
function notionEditor() {
  const BG = '#ffffff', SIDEBAR = '#f7f7f5', BORDER = '#e9e9e7';
  const TEXT = '#37352f', MUTED = '#9b9b9b', FAINT = '#d0d0cc';
  const ORANGE = '#E8572A';

  let body = '';
  // Sidebar
  body += r(0, 0, 240, H, SIDEBAR);
  body += line(240, 0, 240, H, BORDER);

  // Workspace header
  body += r(0, 0, 240, 48, SIDEBAR);
  body += line(0, 48, 240, 48, BORDER);
  body += t(16, 28, '🏢', 16, TEXT, 'start');
  body += t(40, 28, 'Acme Corp', 13, TEXT, 'start', 600);
  body += t(220, 28, '···', 14, MUTED, 'end');

  // Search
  body += r(8, 56, 224, 28, '#ebebea', 4);
  body += t(20, 74, '🔍  Quick Find', 12, MUTED, 'start');

  // Sidebar nav items
  const navItems = ['🏠  Home', '📥  Inbox', '⚙️  Settings'];
  navItems.forEach((item, i) => {
    body += t(16, 110 + i * 28, item, 12, MUTED, 'start');
  });

  body += line(0, 198, 240, 198, BORDER);
  body += t(12, 218, 'TEAMSPACES', 9, MUTED, 'start', 700);

  const pages = [
    { icon: '📋', name: 'Engineering', depth: 0, open: true },
    { icon: '📄', name: 'Roadmap Q2', depth: 1 },
    { icon: '🗄️', name: 'Sprint Tracker', depth: 1, active: true },
    { icon: '📋', name: 'Design', depth: 0 },
    { icon: '📋', name: 'Marketing', depth: 0 },
  ];
  pages.forEach((p, i) => {
    const y = 228 + i * 30;
    const bg = p.active ? '#ebebea' : 'transparent';
    body += r(0, y - 2, 240, 26, bg);
    body += t(12 + p.depth * 14, y + 14, p.open ? '▾' : p.depth === 0 ? '▸' : '', 9, MUTED, 'start');
    body += t(26 + p.depth * 14, y + 14, `${p.icon}  ${p.name}`, 12, p.active ? TEXT : MUTED, 'start', p.active ? 600 : 400);
  });

  // Cover image
  body += r(240, 0, W - 240, 120, '#dde4ff');
  body += t((240 + W) / 2, 68, '🌊', 52, '#aabbff', 'middle');

  // Page icon + title area
  body += t(500, 164, '🎯', 40, TEXT, 'start');
  body += t(500, 220, 'Q2 Goals & OKRs', 32, TEXT, 'start', 700);

  // Slash command hint row
  body += r(500, 234, 220, 24, '#f5f5f3', 4);
  body += t(510, 250, "Type  '/'  for commands", 12, FAINT, 'start');

  // Body content blocks
  const textBlocks = [
    { y: 280, w: 680, h: 12, color: '#d0d0cc' },
    { y: 300, w: 520, h: 10, color: '#d8d8d5' },
    { y: 318, w: 600, h: 10, color: '#d0d0cc' },
  ];
  textBlocks.forEach(b => {
    // Drag handle
    body += t(480, b.y + 10, '⠿', 12, '#ddd', 'start');
    body += r(500, b.y, b.w, b.h, b.color, 4);
  });

  // H2
  body += t(496, 360, '▸', 10, MUTED, 'start');
  body += r(510, 352, 220, 14, '#37352f', 4);

  body += r(500, 380, 640, 10, '#d8d8d5', 4);
  body += r(500, 398, 480, 10, '#d0d0cc', 4);

  // Callout block
  body += r(500, 426, 720, 80, '#FFF9C4', 6);
  body += r(500, 426, 4, 80, '#FFD600');
  body += t(518, 452, '💡', 14);
  body += r(538, 444, 500, 10, '#ccca7a', 4);
  body += r(538, 462, 380, 8, '#d9d780', 4);
  body += r(538, 476, 440, 8, '#ccca7a', 4);

  // Toggle block
  body += r(500, 526, 720, 40, '#f7f7f5', 4);
  body += line(500, 526, 1220, 526, BORDER);
  body += line(500, 566, 1220, 566, BORDER);
  body += t(514, 550, '▶  Objectives breakdown (click to expand)', 13, TEXT, 'start', 500);

  // Database preview
  body += r(500, 586, 720, 100, '#f7f7f5', 6);
  body += line(500, 586, 1220, 586, BORDER);
  body += t(516, 608, '🗄️  Key Results Tracker', 12, TEXT, 'start', 600);
  body += t(516, 626, '12 items · Last edited just now', 10, MUTED, 'start');
  const tags = ['Table', 'Board', 'Calendar'];
  tags.forEach((tag, i) => {
    body += pill(516 + i * 72, 638, 64, 18, i === 0 ? '#ebebea' : 'transparent');
    body += t(548 + i * 72, 650, tag, 10, i === 0 ? TEXT : MUTED, 'middle');
  });

  return svg(body, BG);
}

// ── NOTION DATABASE ───────────────────────────────────────────────────────
function notionDatabase() {
  const BG = '#ffffff', SIDEBAR = '#f7f7f5', BORDER = '#e9e9e7';
  const TEXT = '#37352f', MUTED = '#9b9b9b', FAINT = '#d0d0cc';

  const colDefs = [
    { label: 'Name', w: 320 },
    { label: 'Status', w: 130 },
    { label: 'Owner', w: 130 },
    { label: 'Due Date', w: 120 },
    { label: 'Priority', w: 110 },
    { label: 'Tags', w: 200 },
  ];
  const colX = colDefs.reduce((acc, c, i) => {
    acc.push(i === 0 ? 240 : acc[i - 1] + colDefs[i - 1].w);
    return acc;
  }, []);

  const dbRows = [
    { name: 'Redesign onboarding flow', status: '🟢  Done', statusC: '#2ecc71', owner: 'Mia', due: 'Apr 12', pri: '🔴  High', priC: '#e74c3c', tags: 'Design, UX' },
    { name: 'API rate limiting', status: '🟡  In Progress', statusC: '#f39c12', owner: 'Alex', due: 'Apr 18', pri: '🟠  Med', priC: '#e67e22', tags: 'Engineering' },
    { name: 'Q2 roadmap review', status: '⚪  Not started', statusC: MUTED, owner: 'Sam', due: 'Apr 25', pri: '🟡  Low', priC: '#f1c40f', tags: 'Strategy' },
    { name: 'Fix payment webhook bug', status: '🔵  In Review', statusC: '#3498db', owner: 'Kai', due: 'Apr 15', pri: '🔴  High', priC: '#e74c3c', tags: 'Engineering' },
    { name: 'Write release notes', status: '⚪  Not started', statusC: MUTED, owner: 'Mia', due: 'May 1', pri: '🟡  Low', priC: '#f1c40f', tags: 'Marketing' },
    { name: 'Customer interview synthesis', status: '🟡  In Progress', statusC: '#f39c12', owner: 'Jo', due: 'Apr 20', pri: '🟠  Med', priC: '#e67e22', tags: 'Research' },
  ];

  let body = '';
  // Sidebar
  body += r(0, 0, 240, H, SIDEBAR);
  body += line(240, 0, 240, H, BORDER);
  body += t(16, 28, '🏢  Acme Corp', 13, TEXT, 'start', 600);
  body += line(0, 40, 240, 40, BORDER);
  const sidePages = ['🗄️  Projects DB', '📋  Engineering', '📋  Design', '📋  Marketing'];
  sidePages.forEach((p, i) => {
    body += r(0, 50 + i * 28, 240, 26, i === 0 ? '#ebebea' : 'transparent');
    body += t(16, 67 + i * 28, p, 12, i === 0 ? TEXT : MUTED, 'start', i === 0 ? 600 : 400);
  });

  // Title
  body += t(260, 36, '🗄️  Projects DB', 18, TEXT, 'start', 700);

  // View tabs + toolbar
  const views = ['Table', 'Board', 'Timeline', 'Calendar', 'Gallery'];
  views.forEach((v, i) => {
    body += r(260 + i * 90, 48, 82, 26, i === 0 ? '#ebebea' : 'transparent', 4);
    body += t(301 + i * 90, 65, v, 12, i === 0 ? TEXT : MUTED, 'middle', i === 0 ? 600 : 400);
  });

  // Filter chips
  body += pill(260, 82, 70, 22, '#ebebea');
  body += t(295, 96, '🔍 Filter', 11, TEXT, 'middle');
  body += pill(338, 82, 56, 22, '#ebebea');
  body += t(366, 96, 'Sort', 11, MUTED, 'middle');
  body += pill(402, 82, 110, 22, '#dbeafe');
  body += t(457, 96, '● Status: Active', 10, '#1d4ed8', 'middle');
  body += t(502, 96, '×', 11, '#1d4ed8', 'start');

  // Table header
  body += r(240, 112, W - 240, 32, SIDEBAR);
  body += line(240, 112, W, 112, BORDER);
  body += line(240, 144, W, 144, BORDER);
  colDefs.forEach((col, i) => {
    body += t(colX[i] + 8, 132, col.label, 11, MUTED, 'start', 600);
    if (i < colDefs.length - 1) body += line(colX[i] + col.w, 112, colX[i] + col.w, H, BORDER);
  });

  // Table rows
  dbRows.forEach((row, ri) => {
    const y = 144 + ri * 40;
    body += r(240, y, W - 240, 40, ri % 2 === 0 ? '#fff' : '#fafaf9');
    body += line(240, y + 40, W, y + 40, BORDER);
    body += t(colX[0] + 8, y + 25, row.name, 13, TEXT, 'start', 500);
    body += t(colX[1] + 8, y + 25, row.status, 12, row.statusC, 'start');
    body += t(colX[2] + 8, y + 25, row.owner, 12, MUTED, 'start');
    body += t(colX[3] + 8, y + 25, row.due, 12, MUTED, 'start');
    body += t(colX[4] + 8, y + 25, row.pri, 12, row.priC, 'start');
    // Tags as pill(s)
    row.tags.split(', ').forEach((tag, ti) => {
      body += pill(colX[5] + 8 + ti * 90, y + 12, 84, 18, '#f1f5f9');
      body += t(colX[5] + 50 + ti * 90, y + 24, tag, 10, '#64748b', 'middle');
    });
  });

  // Add row
  const addY = 144 + dbRows.length * 40;
  body += r(240, addY, W - 240, 32, '#fff');
  body += line(240, addY + 32, W, addY + 32, BORDER);
  body += t(260, addY + 21, '+ New', 12, MUTED);

  return svg(body, BG);
}

// ── NOTION SIDEBAR ────────────────────────────────────────────────────────
function notionSidebar() {
  const BG = '#ffffff', SIDEBAR = '#f7f7f5', BORDER = '#e9e9e7';
  const TEXT = '#37352f', MUTED = '#9b9b9b', ORANGE = '#E8572A';

  let body = '';
  // Wide sidebar context
  body += r(0, 0, 320, H, SIDEBAR);
  body += line(320, 0, 320, H, BORDER);

  // Workspace
  body += r(0, 0, 320, 48, SIDEBAR);
  body += line(0, 48, 320, 48, BORDER);
  body += circle(20, 24, 12, '#635BFF');
  body += t(20, 28, 'A', 11, '#fff', 'middle', 700);
  body += t(38, 28, 'Acme Corp', 13, TEXT, 'start', 600);
  body += t(300, 28, '···', 14, MUTED, 'end');

  // Search
  body += r(8, 56, 304, 28, '#ebebea', 4);
  body += t(20, 74, '🔍  Quick Find          ⌘K', 12, MUTED, 'start');

  // Nav
  ['🏠  Home', '📥  Inbox  (3)', '⚙️  Settings & Members'].forEach((n, i) => {
    body += t(16, 106 + i * 28, n, 12, MUTED, 'start');
  });

  body += line(0, 192, 320, 192, BORDER);

  // Teamspaces section
  body += t(12, 210, 'TEAMSPACES', 9, MUTED, 'start', 700);

  const ts = [
    { icon: '📋', name: 'Engineering', depth: 0, open: true },
    { icon: '📄', name: 'Roadmap Q2', depth: 1 },
    { icon: '🗄️', name: 'Sprint Tracker', depth: 1 },
    { icon: '📄', name: 'Architecture', depth: 1 },
    { icon: '📋', name: 'Design', depth: 0, open: true },
    { icon: '📄', name: 'Design System', depth: 1 },
    { icon: '📄', name: 'Brand Guide', depth: 1, active: true },
    { icon: '📋', name: 'Marketing', depth: 0 },
    { icon: '📋', name: 'Finance', depth: 0 },
  ];
  ts.forEach((p, i) => {
    const y = 220 + i * 30;
    if (p.active) body += r(0, y - 2, 320, 26, '#ebebea');
    body += t(10 + p.depth * 14, y + 14, p.open ? '▾' : '▸', 9, MUTED, 'start');
    body += t(24 + p.depth * 14, y + 14, `${p.icon}  ${p.name}`, 12, p.active ? TEXT : MUTED, 'start', p.active ? 600 : 400);
    // Hover actions (shown on active)
    if (p.active) {
      body += t(290, y + 14, '+ ···', 11, MUTED, 'end');
    }
  });

  // Private section
  body += line(0, 506, 320, 506, BORDER);
  body += t(12, 524, 'PRIVATE', 9, MUTED, 'start', 700);

  const priv = [
    { icon: '📝', name: 'My Notes' },
    { icon: '✅', name: 'Personal Tasks' },
    { icon: '📎', name: 'Reading List' },
  ];
  priv.forEach((p, i) => {
    body += t(24, 540 + i * 30, `${p.icon}  ${p.name}`, 12, MUTED, 'start');
  });

  // Add new page
  body += r(8, 638, 304, 28, 'transparent', 4);
  body += t(16, 656, '+ Add a page', 12, MUTED, 'start');

  // Main content preview (right of sidebar)
  body += r(320, 0, W - 320, H, '#ffffff');
  body += r(320, 0, W - 320, 56, SIDEBAR);
  body += line(320, 56, W, 56, BORDER);
  body += t(340, 32, '📄  Brand Guide', 14, TEXT, 'start', 600);

  // Page content
  body += r(400, 100, 600, 20, TEXT, 4);
  body += r(400, 136, 520, 12, '#d0d0cc', 4);
  body += r(400, 156, 480, 10, '#d8d8d5', 4);
  body += r(400, 174, 540, 10, '#d0d0cc', 4);
  body += r(400, 204, 300, 14, TEXT, 4);
  body += r(400, 226, 560, 10, '#d8d8d5', 4);
  body += r(400, 244, 440, 10, '#d0d0cc', 4);

  return svg(body, BG);
}

// ── STRIPE DASHBOARD ──────────────────────────────────────────────────────
function stripeDashboard() {
  const NAV_BG = '#0a2540', BG = '#f6f9fc', CARD = '#ffffff';
  const BORDER = '#e0e6eb', TEXT = '#0a2540', MUTED = '#6b7c93';
  const PURPLE = '#635BFF', GREEN = '#09825d', LIGHT_PURPLE = '#f5f4ff';

  let body = '';
  // Left nav
  body += r(0, 0, 200, H, NAV_BG);
  // Logo
  body += t(24, 38, '⚡', 20, PURPLE, 'start');
  body += t(48, 38, 'stripe', 18, '#fff', 'start', 700);

  const navItems = [
    { label: 'Overview', active: true },
    { label: 'Payments' },
    { label: 'Customers' },
    { label: 'Products' },
    { label: 'Reports' },
    { label: 'Radar' },
    { label: 'Connect' },
    { label: 'Billing' },
    { label: 'Issuing' },
    { label: 'Terminal' },
  ];
  navItems.forEach((n, i) => {
    if (n.active) body += r(0, 58 + i * 42, 200, 36, 'rgba(255,255,255,0.1)');
    body += t(20, 80 + i * 42, n.label, 13, n.active ? '#fff' : '#8898aa', 'start', n.active ? 600 : 400);
  });

  // Top bar
  body += r(200, 0, W - 200, 52, CARD);
  body += line(200, 52, W, 52, BORDER);
  body += t(220, 30, 'Overview', 17, TEXT, 'start', 600);
  // Date range selector
  body += r(W - 260, 14, 140, 24, '#f6f9fc', 4);
  body += line(W - 260, 14, W - 120, 14, BORDER);
  body += t(W - 192, 29, 'Last 30 days  ▾', 12, MUTED, 'middle');
  // New button
  body += pill(W - 110, 14, 90, 24, PURPLE);
  body += t(W - 65, 29, '+ New', 12, '#fff', 'middle', 600);

  // Metric cards
  const metrics = [
    { label: 'Gross volume', val: '€24,831', change: '+18%', cx: 220 },
    { label: 'Net volume',   val: '€22,140', change: '+14%', cx: 530 },
    { label: 'New customers', val: '143',    change: '+32%', cx: 840 },
  ];
  metrics.forEach(m => {
    body += r(m.cx, 68, 290, 100, CARD, 6);
    body += line(m.cx, 68, m.cx + 290, 68, BORDER);
    body += line(m.cx, 168, m.cx + 290, 168, BORDER);
    body += line(m.cx, 68, m.cx, 168, BORDER);
    body += line(m.cx + 290, 68, m.cx + 290, 168, BORDER);
    body += t(m.cx + 14, 92, m.label, 11, MUTED, 'start');
    body += t(m.cx + 14, 128, m.val, 24, TEXT, 'start', 700);
    body += pill(m.cx + 14, 140, 54, 20, '#ecfdf3');
    body += t(m.cx + 41, 153, m.change, 11, '#16a34a', 'middle', 600);
  });

  // Revenue chart
  body += r(220, 178, 880, 300, CARD, 6);
  body += line(220, 178, 1100, 178, BORDER);
  body += line(220, 478, 1100, 478, BORDER);
  body += line(220, 178, 220, 478, BORDER);
  body += line(1100, 178, 1100, 478, BORDER);
  body += t(236, 202, 'Gross volume', 12, MUTED, 'start', 500);
  body += t(236, 228, '€24,831', 22, TEXT, 'start', 700);
  body += pill(236, 238, 54, 18, '#ecfdf3');
  body += t(263, 249, '+18%', 10, '#16a34a', 'middle', 600);

  // Chart
  const chartData = [40, 55, 45, 70, 60, 85, 55, 75, 90, 65, 80, 95, 70, 88, 75, 100, 80, 92, 68, 85, 78, 96, 72, 88, 82, 94, 76, 90, 84, 98];
  const chartH = 160, chartY = 460, chartX0 = 240, barW = 26;
  // Area fill
  let areaPath = `M ${chartX0} ${chartY}`;
  chartData.forEach((d, i) => {
    areaPath += ` L ${chartX0 + i * 28 + 13} ${chartY - Math.round(d * chartH / 100)}`;
  });
  areaPath += ` L ${chartX0 + (chartData.length - 1) * 28 + 13} ${chartY} Z`;
  body += `<path d="${areaPath}" fill="${PURPLE}" opacity="0.15"/>`;
  // Line
  let linePath = '';
  chartData.forEach((d, i) => {
    const cx = chartX0 + i * 28 + 13;
    const cy = chartY - Math.round(d * chartH / 100);
    linePath += (i === 0 ? 'M' : 'L') + ` ${cx} ${cy} `;
  });
  body += `<path d="${linePath}" fill="none" stroke="${PURPLE}" stroke-width="2"/>`;
  // X axis labels
  ['Mar 7','Mar 14','Mar 21','Mar 28','Apr 4'].forEach((lbl, i) => {
    body += t(chartX0 + i * 6 * 28, chartY + 14, lbl, 9, MUTED, 'start');
  });

  // Recent activity
  body += r(1110, 68, 310, 420, CARD, 6);
  body += line(1110, 68, 1420, 68, BORDER);
  body += line(1110, 488, 1420, 488, BORDER);
  body += line(1110, 68, 1110, 488, BORDER);
  body += line(1420, 68, 1420, 488, BORDER);
  body += t(1126, 94, 'Recent activity', 12, MUTED, 'start', 600);
  const txns = [
    { desc: 'Card payment', amount: '€149.00', time: '1m ago', icon: '💳' },
    { desc: 'Subscription',  amount: '€49.00',  time: '3m ago', icon: '🔄' },
    { desc: 'Card payment', amount: '€82.50',  time: '8m ago', icon: '💳' },
    { desc: 'Card payment', amount: '€220.00', time: '12m ago', icon: '💳' },
    { desc: 'Refund',        amount: '-€49.00', time: '18m ago', icon: '↩' },
    { desc: 'Subscription',  amount: '€99.00',  time: '25m ago', icon: '🔄' },
  ];
  txns.forEach((tx, i) => {
    const y = 106 + i * 62;
    body += r(1126, y, 278, 52, '#f6f9fc', 6);
    body += t(1138, y + 22, tx.icon, 14, TEXT, 'start');
    body += t(1158, y + 20, tx.desc, 13, TEXT, 'start', 500);
    body += t(1158, y + 36, tx.time, 11, MUTED, 'start');
    body += t(1390, y + 22, tx.amount, 13, tx.amount.startsWith('-') ? '#cf4500' : TEXT, 'end', 600);
  });

  return svg(body, BG);
}

// ── STRIPE CHECKOUT ───────────────────────────────────────────────────────
function stripeCheckout() {
  const BG = '#f6f9fc', CARD = '#ffffff', BORDER = '#d0d7de';
  const TEXT = '#0a2540', MUTED = '#6b7c93', PURPLE = '#635BFF';
  const GREEN = '#09825d', LIGHT_GREEN = '#ecfdf3';

  let body = '';
  // Two column layout
  body += r(0, 0, W / 2, H, '#f6f9fc');
  body += r(W / 2, 0, W / 2, H, '#fff');
  body += line(W / 2, 0, W / 2, H, BORDER);

  // Left: Order summary
  body += t(180, 60, 'Order summary', 15, TEXT, 'start', 600);

  // Product card
  body += r(180, 78, 480, 120, CARD, 8);
  body += line(180, 78, 660, 78, BORDER); body += line(180, 198, 660, 198, BORDER);
  body += line(180, 78, 180, 198, BORDER); body += line(660, 78, 660, 198, BORDER);
  body += r(196, 94, 80, 80, `${PURPLE}33`, 8);
  body += t(236, 142, '⚡', 28, PURPLE, 'middle');
  body += t(290, 118, 'Pro Plan · Monthly', 14, TEXT, 'start', 600);
  body += t(290, 140, 'Up to 10 users', 12, MUTED, 'start');
  body += t(290, 158, 'Unlimited projects', 12, MUTED, 'start');
  body += t(640, 118, '€49.00', 14, TEXT, 'end', 600);

  // Line items
  body += line(180, 216, 660, 216, BORDER);
  [['Subtotal', '€49.00'], ['Tax (20% VAT)', '€9.80']].forEach(([lbl, val], i) => {
    body += t(180, 240 + i * 24, lbl, 12, MUTED, 'start');
    body += t(660, 240 + i * 24, val, 12, MUTED, 'end');
  });
  body += line(180, 290, 660, 290, BORDER);
  body += t(180, 313, 'Total due today', 15, TEXT, 'start', 600);
  body += t(660, 313, '€58.80', 16, TEXT, 'end', 700);

  // Secure badge
  body += t(420, 360, '🔒  Powered by Stripe · Secure checkout', 11, MUTED, 'middle');

  // Right: Payment form
  const fx = W / 2 + 60, fw = W / 2 - 120;
  body += t(fx, 60, 'Payment details', 15, TEXT, 'start', 600);

  // Email
  body += t(fx, 94, 'Email address', 11, TEXT, 'start', 500);
  body += r(fx, 102, fw, 38, CARD, 4);
  body += `<rect x="${fx}" y="102" width="${fw}" height="38" rx="4" fill="none" stroke="${BORDER}" stroke-width="1.5"/>`;
  body += t(fx + 12, 125, 'alex@acmecorp.io', 13, TEXT, 'start');

  // Card number
  body += t(fx, 158, 'Card information', 11, TEXT, 'start', 500);
  body += r(fx, 166, fw, 40, CARD, 4);
  body += `<rect x="${fx}" y="166" width="${fw}" height="40" rx="4" fill="none" stroke="${PURPLE}" stroke-width="2"/>`;
  body += t(fx + 12, 190, '4242  4242  4242  4242', 14, TEXT, 'start', 500);
  body += t(fx + fw - 12, 190, '💳', 16, MUTED, 'end');

  // Expiry + CVC
  body += r(fx, 210, fw / 2 - 6, 38, CARD, 4);
  body += `<rect x="${fx}" y="210" width="${fw / 2 - 6}" height="38" rx="4" fill="none" stroke="${BORDER}" stroke-width="1.5"/>`;
  body += t(fx + 12, 233, '12 / 27', 13, TEXT, 'start');
  body += r(fx + fw / 2 + 6, 210, fw / 2 - 6, 38, CARD, 4);
  body += `<rect x="${fx + fw / 2 + 6}" y="210" width="${fw / 2 - 6}" height="38" rx="4" fill="none" stroke="${BORDER}" stroke-width="1.5"/>`;
  body += t(fx + fw / 2 + 18, 233, 'CVC', 13, MUTED, 'start');

  // Validation tick
  body += t(fx, 262, '✓  Valid card number', 11, GREEN, 'start');

  // Cardholder name
  body += t(fx, 286, 'Cardholder name', 11, TEXT, 'start', 500);
  body += r(fx, 294, fw, 38, CARD, 4);
  body += `<rect x="${fx}" y="294" width="${fw}" height="38" rx="4" fill="none" stroke="${BORDER}" stroke-width="1.5"/>`;
  body += t(fx + 12, 317, 'Alex Chen', 13, TEXT, 'start');

  // Billing address header
  body += t(fx, 350, 'Billing address', 11, TEXT, 'start', 500);
  body += r(fx, 358, fw, 38, CARD, 4);
  body += `<rect x="${fx}" y="358" width="${fw}" height="38" rx="4" fill="none" stroke="${BORDER}" stroke-width="1.5"/>`;
  body += t(fx + 12, 381, '🇩🇪  Germany', 13, TEXT, 'start');

  // Apple Pay button
  body += r(fx, 420, fw, 44, '#000', 8);
  body += t(fx + fw / 2, 447, ' Pay  €58.80', 15, '#fff', 'middle', 600);

  // Divider
  body += line(fx, 476, fx + fw / 2 - 40, 476, BORDER);
  body += t(fx + fw / 2, 480, 'or pay with card', 11, MUTED, 'middle');
  body += line(fx + fw / 2 + 40, 476, fx + fw, 476, BORDER);

  // Submit button
  body += r(fx, 500, fw, 48, PURPLE, 8);
  body += r(fx, 528, fw, 20, '#4f46e5', 8);
  body += t(fx + fw / 2, 529, `Pay €58.80`, 15, '#fff', 'middle', 700);

  body += t(fx + fw / 2, 572, '🔒  Your payment info is encrypted and secure.', 11, MUTED, 'middle');

  return svg(body, BG);
}

// ── STRIPE PAYMENT LINKS ──────────────────────────────────────────────────
function stripePaymentLinks() {
  const NAV_BG = '#0a2540', BG = '#f6f9fc', CARD = '#ffffff';
  const BORDER = '#e0e6eb', TEXT = '#0a2540', MUTED = '#6b7c93';
  const PURPLE = '#635BFF', LIGHT_PURPLE = '#f5f4ff';

  let body = '';
  // Nav
  body += r(0, 0, 200, H, NAV_BG);
  body += t(24, 38, '⚡  stripe', 16, '#fff', 'start', 700);
  ['Overview','Payments','Payment Links','Customers','Products'].forEach((n, i) => {
    if (i === 2) body += r(0, 62 + i * 42, 200, 36, 'rgba(255,255,255,0.1)');
    body += t(20, 84 + i * 42, n, 13, i === 2 ? '#fff' : '#8898aa', 'start', i === 2 ? 600 : 400);
  });

  // Top bar
  body += r(200, 0, W - 200, 52, CARD);
  body += line(200, 52, W, 52, BORDER);
  body += t(220, 30, 'Create payment link', 16, TEXT, 'start', 600);

  // Form panel (left)
  body += r(220, 68, 520, H - 88, CARD, 8);
  body += line(220, 68, 740, 68, BORDER);
  body += line(220, H - 20, 740, H - 20, BORDER);
  body += line(220, 68, 220, H - 20, BORDER);
  body += line(740, 68, 740, H - 20, BORDER);

  // Form fields
  const formFields = [
    { label: 'Product', val: 'Pro Plan — €49/month', icon: '📦' },
    { label: 'Price', val: '€  49.00' },
    { label: 'Currency', val: '🇪🇺  EUR — Euro' },
    { label: 'Billing period', val: 'Monthly  ▾' },
  ];
  formFields.forEach((f, i) => {
    const y = 92 + i * 64;
    body += t(244, y, f.label, 11, TEXT, 'start', 500);
    body += r(244, y + 8, 472, 36, '#f6f9fc', 4);
    body += `<rect x="244" y="${y + 8}" width="472" height="36" rx="4" fill="none" stroke="${BORDER}" stroke-width="1.5"/>`;
    body += t(258, y + 30, f.val, 13, TEXT, 'start');
  });

  // Advanced options
  body += r(244, 364, 472, 32, LIGHT_PURPLE, 4);
  body += t(480, 384, '▼  Advanced options', 12, PURPLE, 'middle');

  // After payment
  body += t(244, 422, 'After payment', 11, TEXT, 'start', 500);
  const radioOpts = ['Show confirmation page', 'Redirect to URL', 'Don\'t show anything'];
  radioOpts.forEach((opt, i) => {
    body += `<circle cx="256" cy="${440 + i * 30}" r="7" fill="${i === 0 ? PURPLE : '#fff'}" stroke="${i === 0 ? PURPLE : BORDER}" stroke-width="2"/>`;
    if (i === 0) body += circle(256, 440, 3, '#fff');
    body += t(270, 445 + i * 30, opt, 12, TEXT, 'start');
  });

  // CTA
  body += r(244, H - 76, 472, 48, PURPLE, 8);
  body += r(244, H - 48, 472, 20, '#4f46e5', 8);
  body += t(480, H - 44, 'Create link', 15, '#fff', 'middle', 700);

  // Live preview (right panel)
  body += r(760, 68, W - 780, H - 88, CARD, 8);
  body += line(760, 68, W - 20, 68, BORDER);
  body += line(760, H - 20, W - 20, H - 20, BORDER);
  body += line(760, 68, 760, H - 20, BORDER);
  body += line(W - 20, 68, W - 20, H - 20, BORDER);
  body += t(780, 96, 'Preview', 11, MUTED, 'start', 600);

  // Checkout preview mock
  const px = 840, pw = W - 900;
  body += r(px, 112, pw, H - 152, '#f6f9fc', 8);
  body += line(px, 112, px + pw, 112, BORDER);
  body += line(px, H - 40, px + pw, H - 40, BORDER);
  body += line(px, 112, px, H - 40, BORDER);
  body += line(px + pw, 112, px + pw, H - 40, BORDER);

  // Preview content
  body += t(px + pw / 2, 152, '⚡', 24, PURPLE, 'middle');
  body += t(px + pw / 2, 194, 'Pro Plan', 18, TEXT, 'middle', 700);
  body += t(px + pw / 2, 218, '€49.00 / month', 13, MUTED, 'middle');
  body += r(px + 24, 234, pw - 48, 40, '#000', 8);
  body += t(px + pw / 2, 259,  ' Pay  €49.00', 13, '#fff', 'middle', 600);
  body += line(px + 24, 288, px + pw / 2 - 30, 288, BORDER);
  body += t(px + pw / 2, 292, 'or', 10, MUTED, 'middle');
  body += line(px + pw / 2 + 20, 288, px + pw - 24, 288, BORDER);
  // Mini card form
  body += r(px + 24, 304, pw - 48, 30, CARD, 4);
  body += `<rect x="${px + 24}" y="304" width="${pw - 48}" height="30" rx="4" fill="none" stroke="${BORDER}" stroke-width="1.5"/>`;
  body += t(px + 36, 323, 'Card number', 11, MUTED, 'start');
  body += r(px + 24, 342, (pw - 56) / 2, 28, CARD, 4);
  body += `<rect x="${px + 24}" y="342" width="${(pw - 56) / 2}" height="28" rx="4" fill="none" stroke="${BORDER}" stroke-width="1.5"/>`;
  body += r(px + 32 + (pw - 56) / 2, 342, (pw - 56) / 2, 28, CARD, 4);
  body += `<rect x="${px + 32 + (pw - 56) / 2}" y="342" width="${(pw - 56) / 2}" height="28" rx="4" fill="none" stroke="${BORDER}" stroke-width="1.5"/>`;
  body += r(px + 24, 378, pw - 48, 40, PURPLE, 8);
  body += t(px + pw / 2, 403, 'Subscribe', 13, '#fff', 'middle', 700);
  body += t(px + pw / 2, 438, '🔒  Secure checkout by Stripe', 10, MUTED, 'middle');

  return svg(body, BG);
}

// ── HARVEY: shared tokens + helpers ────────────────────────────────────────
const HV = {
  BG: '#F7F6F3', CARD: '#FFFFFF', BORDER: '#E2E0DA', LINE: '#EFEDE8',
  INK: '#16181C', TEXT: '#3C3F45', MUTED: '#83868D', FAINT: '#B4B6BB',
  NAVY: '#1E3A5F', NAVY_SOFT: '#E9EEF4', NAVY_INK: '#16304F',
  AMBER: '#A9600C', AMBER_SOFT: '#FAEEDC',
  GREEN: '#1B7A47', GREEN_SOFT: '#E6F2EA',
  RED: '#A32B23', RED_SOFT: '#F9EAE8',
  SLATE_SOFT: '#EEEDE9',
};

function hvSr(x, y, w, h, stroke, rx = 0, sw = 1) {
  return `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${rx}" fill="none" stroke="${stroke}" stroke-width="${sw}"/>`;
}

function hvCard(x, y, w, h, rx = 10, fill = HV.CARD, stroke = HV.BORDER) {
  return r(x, y, w, h, fill, rx) + hvSr(x, y, w, h, stroke, rx);
}

function hvTagW(label, size = 10) {
  return Math.round(String(label).length * size * 0.58) + 18;
}

function hvTag(x, y, label, fill, textFill, size = 10, h = 19) {
  const w = hvTagW(label, size);
  return pill(x, y, w, h, fill) + t(x + w / 2, y + h / 2 + size * 0.36, label, size, textFill, 'middle', 600);
}

function hvPauseIcon(x, y, fill, h) {
  const hh = h || 10;
  return r(x, y, 3, hh, fill, 1) + r(x + 5, y, 3, hh, fill, 1);
}

function hvPauseBtn(x, y, w, h, label, stroke, textFill, size) {
  const sz = size || 11.5;
  return r(x, y, w, h, HV.CARD, 7) + hvSr(x, y, w, h, stroke, 7)
    + hvPauseIcon(x + 14, y + h / 2 - 5, textFill)
    + t(x + w / 2 + 8, y + h / 2 + sz * 0.36, label, sz, textFill, 'middle', 600);
}

function hvToggle(x, y, on) {
  return pill(x, y, 32, 18, on ? HV.NAVY : '#CFCDC7') + circle(on ? x + 23 : x + 9, y + 9, 7, '#fff');
}

function hvBtn(x, y, w, h, label, fill, stroke, textFill, size) {
  return r(x, y, w, h, fill || HV.CARD, 7)
    + (stroke ? hvSr(x, y, w, h, stroke, 7) : '')
    + t(x + w / 2, y + h / 2 + (size || 11.5) * 0.36, label, size || 11.5, textFill || HV.TEXT, 'middle', 600);
}

function hvShell(active) {
  const SB = 208;
  let b = r(0, 0, SB, H, HV.CARD) + line(SB, 0, SB, H, HV.BORDER);

  b += r(20, 22, 22, 22, HV.NAVY, 6);
  b += t(31, 38, 'H', 12, '#fff', 'middle', 700);
  b += t(52, 34, 'Harvey', 14.5, HV.INK, 'start', 700);
  b += t(52, 50, 'Northwind Legal · 3 lawyers', 9.5, HV.MUTED, 'start');
  b += line(16, 72, SB - 16, 72, HV.LINE);

  const nav = [
    ['◈', 'Command Center', ''],
    ['▤', 'Review Queue', '38'],
    ['§', 'Playbook', 'v12'],
    ['◷', 'Audit Log', ''],
    ['⇄', 'Handoff Rules', ''],
    ['⚙', 'Settings', ''],
  ];
  nav.forEach(([ic, label, badge], i) => {
    const y = 100 + i * 38, on = label === active;
    if (on) b += r(12, y - 19, SB - 24, 32, HV.NAVY_SOFT, 8);
    b += t(30, y + 4, ic, 12, on ? HV.NAVY : HV.FAINT, 'middle');
    b += t(48, y + 5, label, 12, on ? HV.NAVY_INK : HV.TEXT, 'start', on ? 600 : 400);
    if (badge) b += t(SB - 20, y + 5, badge, 9.5, HV.FAINT, 'end');
  });

  // Always-present automation state + global kill switch
  const cy = H - 152;
  b += r(16, cy, SB - 32, 124, HV.NAVY_SOFT, 10) + hvSr(16, cy, SB - 32, 124, '#D6DEE9', 10);
  b += t(32, cy + 26, 'AUTOMATION', 9, HV.NAVY, 'start', 700);
  b += circle(35, cy + 47, 5, HV.GREEN);
  b += t(47, cy + 52, 'On', 15, HV.INK, 'start', 700);
  b += t(70, cy + 52, '· 14 NDAs running', 10.5, HV.MUTED, 'start');
  b += t(32, cy + 70, '3 paused · last pause 4 Mar, A. Wu', 9, HV.MUTED, 'start');
  b += hvPauseBtn(32, cy + 82, SB - 64, 28, 'Pause all automation', '#DCC8A6', HV.AMBER, 10.5);
  return b;
}

// ── HARVEY REVIEW QUEUE ───────────────────────────────────────────────────
function harveyQueue() {
  const SB = 208, X = SB + 24;
  let b = hvShell('Review Queue');

  // Top bar
  b += r(SB + 1, 0, W - SB - 1, 64, HV.CARD) + line(SB + 1, 64, W, 64, HV.BORDER);
  b += t(X, 32, 'Review Queue', 19, HV.INK, 'start', 700);
  b += t(X, 51, '38 NDAs · 9 waiting on Harvey · 12 with counterparties · 4 with a lawyer', 11, HV.MUTED, 'start');
  b += r(966, 17, 254, 30, HV.BG, 7) + hvSr(966, 17, 254, 30, HV.BORDER, 7);
  b += t(982, 37, '⌕   Search counterparty, clause, or citation', 10.5, HV.FAINT, 'start');
  b += hvBtn(1232, 17, 84, 30, 'Import', HV.CARD, HV.BORDER, HV.TEXT, 11);
  b += hvBtn(1328, 17, 88, 30, '+  New NDA', HV.NAVY, null, '#fff', 11);

  // Filter tabs — the reviewed / to-be-reviewed split as a filter, not a calculation
  const tabs = [['All', '38', true], ['Waiting on Harvey', '9', false], ['With counterparty', '12', false],
                ['With a lawyer', '4', false], ['Paused', '3', false], ['Signed this month', '11', false]];
  let tx = X;
  tabs.forEach(([label, count, on]) => {
    const w = Math.round(label.length * 6.5) + 40;
    b += pill(tx, 80, w, 28, on ? HV.NAVY : HV.CARD) + (on ? '' : hvSr(tx, 80, w, 28, HV.BORDER, 14));
    b += t(tx + 16, 98, label, 11, on ? '#fff' : HV.TEXT, 'start', on ? 600 : 400);
    b += t(tx + w - 16, 98, count, 10, on ? '#B9CBE0' : HV.FAINT, 'end', 600);
    tx += w + 8;
  });
  b += t(W - 24, 98, 'Sorted by:  who owes the next move  ▾', 11, HV.NAVY, 'end', 600);

  // Table header
  b += t(X, 133, 'COUNTERPARTY', 9, HV.FAINT, 'start', 700);
  b += t(520, 133, 'STAGE', 9, HV.FAINT, 'start', 700);
  b += t(660, 133, 'TURNS', 9, HV.FAINT, 'start', 700);
  b += t(790, 133, 'LAST DECISION BY HARVEY', 9, HV.FAINT, 'start', 700);
  b += t(1150, 133, 'WAITING ON', 9, HV.FAINT, 'start', 700);
  b += t(1268, 133, 'UPDATED', 9, HV.FAINT, 'start', 700);
  b += t(1400, 133, 'PAUSE', 9, HV.FAINT, 'middle', 700);

  const rows = [
    { n: 'Acme Robotics', s: 'Mutual NDA · counterparty paper', st: ['Redline sent', HV.NAVY_SOFT, HV.NAVY_INK], turn: 4,
      d: 'Countered non-solicit 24 → 12 months', ds: 'Turn 4 · 09:14 · playbook § 4.2 + Cal. B&P § 16600', w: 'Counterparty', u: '2m ago' },
    { n: 'Northwind Health', s: 'Vendor NDA · our paper', st: ['Queued for review', HV.SLATE_SOFT, HV.TEXT], turn: 2,
      d: 'Parsing — 3 clauses flagged for redline', ds: 'Turn 2 · started 09:41 · est. 40s', w: 'Harvey', u: '6m ago' },
    { n: 'Vela Systems', s: 'Mutual NDA · counterparty paper', st: ['Escalated', HV.AMBER_SOFT, HV.AMBER], turn: 6,
      d: 'Turn limit reached — handed to R. Mehta', ds: 'Turn 6 · 08:52 · brief delivered, waiting 41m', w: 'R. Mehta', u: '41m ago' },
    { n: 'Brightline Labs', s: 'One-way inbound · counterparty paper', st: ['Paused', HV.SLATE_SOFT, HV.MUTED], turn: 3,
      d: 'Paused by you — awaiting security review', ds: 'Turn 3 · 08:20 · Harvey will not reply until resumed', w: 'You', u: '1h ago', paused: true },
    { n: 'Corvus Freight', s: 'Mutual NDA · our paper', st: ['Accepted', HV.GREEN_SOFT, HV.GREEN], turn: 3,
      d: 'Counterparty accepted the 12-month term', ds: 'Turn 3 · routed to A. Wu for signature review', w: 'A. Wu', u: '1h ago' },
    { n: 'Halden & Roe', s: 'Vendor NDA · counterparty paper', st: ['Redline sent', HV.NAVY_SOFT, HV.NAVY_INK], turn: 5,
      d: 'Held position on California non-compete', ds: 'Turn 5 · 07:10 · § 16600 + Edwards v. Arthur Andersen', w: 'Counterparty', u: '2h ago' },
    { n: 'Juno Biotech', s: 'Mutual NDA · counterparty paper', st: ['Queued for review', HV.SLATE_SOFT, HV.TEXT], turn: 1,
      d: 'Extracted 14 clauses · 2 deviations found', ds: 'Turn 1 · 06:55 · playbook v12', w: 'Harvey', u: '3h ago' },
    { n: 'Kestrel Analytics', s: 'One-way outbound · our paper', st: ['Escalated', HV.AMBER_SOFT, HV.AMBER], turn: 4,
      d: 'Counterparty asked for a call', ds: 'Turn 4 · 06:02 · intent confidence 0.91 · R. Mehta', w: 'R. Mehta', u: '4h ago' },
    { n: 'Marlow Capital', s: 'Mutual NDA · our paper', st: ['Signed', HV.GREEN_SOFT, HV.GREEN], turn: 2,
      d: 'Executed — zero lawyer turns', ds: 'Turn 2 · yesterday 17:40 · 5h 12m end to end', w: '—', u: 'Yesterday' },
    { n: 'Silverbrook Retail', s: 'Vendor NDA · counterparty paper', st: ['Paused', HV.SLATE_SOFT, HV.MUTED], turn: 2,
      d: 'Paused by A. Wu — playbook v13 pending', ds: 'Turn 2 · yesterday 16:10 · resumes on approval', w: 'You', u: 'Yesterday', paused: true },
  ];

  b += r(SB + 1, 144, W - SB - 1, 620, HV.CARD);
  b += line(SB + 1, 144, W, 144, HV.BORDER);
  rows.forEach((row, i) => {
    const y = 144 + i * 62;
    if (row.paused) b += r(SB + 1, y, W - SB - 1, 62, '#FBFAF8');
    if (i) b += line(X, y, W - 24, y, HV.LINE);
    if (row.paused) b += r(SB + 1, y, 3, 62, '#CFCDC7');

    b += t(X, y + 26, row.n, 13, row.paused ? HV.MUTED : HV.INK, 'start', 600);
    b += t(X, y + 44, row.s, 10, HV.MUTED, 'start');

    b += hvTag(520, y + 20, row.st[0], row.st[1], row.st[2], 10);

    // Turn budget: filled pips, amber outline on the escalation turn
    b += t(660, y + 25, row.turn + ' of 6', 11, row.paused ? HV.MUTED : HV.TEXT, 'start', 600);
    for (let p = 0; p < 6; p++) {
      const px = 660 + p * 13;
      b += r(px, y + 34, 9, 5, p < row.turn ? (row.paused ? HV.FAINT : HV.NAVY) : '#E0DED8', 2.5);
      if (p === 5) b += hvSr(px - 1.5, y + 32, 12, 9, HV.AMBER, 3);
    }

    b += t(790, y + 25, row.d, 11.5, row.paused ? HV.MUTED : HV.TEXT, 'start', 500);
    b += t(790, y + 43, row.ds, 9.5, HV.FAINT, 'start');

    const wFill = row.w === 'Harvey' ? HV.NAVY_SOFT : row.w === 'You' ? HV.AMBER_SOFT : HV.SLATE_SOFT;
    const wText = row.w === 'Harvey' ? HV.NAVY_INK : row.w === 'You' ? HV.AMBER : HV.TEXT;
    if (row.w !== '—') b += hvTag(1150, y + 20, row.w, wFill, wText, 10);
    else b += t(1150, y + 35, '—', 11, HV.FAINT, 'start');

    b += t(1268, y + 35, row.u, 10.5, HV.MUTED, 'start');

    b += r(1386, y + 19, 28, 24, HV.BG, 6) + hvSr(1386, y + 19, 28, 24, HV.BORDER, 6);
    if (row.paused) b += t(1400, y + 36, '▶', 10, HV.GREEN, 'middle');
    else b += hvPauseIcon(1396, y + 26, HV.MUTED);
  });
  b += line(X, 764, W - 24, 764, HV.BORDER);

  // Footer summary
  b += t(X, 792, 'Harvey handled 26 turns across 18 NDAs today · 4 escalated · your queue took 11 minutes', 11, HV.MUTED, 'start');

  // Undo toast — pause states its consequence and stays reversible
  b += r(X, 816, 620, 48, HV.INK, 9);
  b += hvPauseIcon(X + 20, 834, '#fff', 12);
  b += t(X + 44, 840, 'Brightline Labs paused.', 12, '#fff', 'start', 600);
  b += t(X + 190, 840, 'Harvey will not reply on this NDA until you resume. Nothing is sent.', 11, '#B9BCC2', 'start');
  b += t(X + 596, 846, 'Undo', 11.5, '#9FC3E8', 'end', 600);

  return svg(b, HV.BG);
}

// ── HARVEY NDA AUDIT LOG ──────────────────────────────────────────────────
function harveyAudit() {
  const SB = 208, X = SB + 24;
  let b = hvShell('Audit Log');

  // Header
  b += r(SB + 1, 0, W - SB - 1, 96, HV.CARD) + line(SB + 1, 96, W, 96, HV.BORDER);
  b += t(X, 30, 'Review Queue   ›   Acme Robotics', 10.5, HV.MUTED, 'start');
  b += t(X, 58, 'Acme Robotics × Northwind — Mutual NDA', 19, HV.INK, 'start', 700);
  b += t(X, 78, 'Turn 4 of 6 · waiting on counterparty · playbook v12 · opened 10 Mar · 3 deviations', 11, HV.MUTED, 'start');
  b += hvPauseBtn(986, 32, 152, 32, 'Pause this NDA', '#DCC8A6', HV.AMBER, 11.5);
  b += hvBtn(1150, 32, 142, 32, 'Hand to lawyer  →', HV.CARD, HV.BORDER, HV.TEXT, 11.5);
  b += hvBtn(1304, 32, 112, 32, 'Open document', HV.NAVY, null, '#fff', 11.5);

  // The autonomy contract, generated from the rules
  b += r(X, 110, W - X - 24, 44, HV.NAVY_SOFT, 8) + hvSr(X, 110, W - X - 24, 44, '#D6DEE9', 8);
  b += t(X + 18, 137, 'Harvey is negotiating autonomously. It hands to R. Mehta at turn 6, or sooner if Acme asks for a call or accepts.', 12, HV.NAVY_INK, 'start', 500);
  b += t(W - 42, 137, 'Change rules →', 11.5, HV.NAVY, 'end', 600);

  // ── Turn 4, expanded: the four-field schema ──
  const cx = X, cw = 752;
  b += hvCard(cx, 172, cw, 376);
  b += t(cx + 20, 198, 'Turn 4', 13, HV.INK, 'start', 700);
  b += t(cx + 74, 198, 'Harvey · 12 Mar, 09:14 · 38s', 11, HV.MUTED, 'start');
  b += hvTag(cx + 566, 184, 'autonomous', HV.NAVY_SOFT, HV.NAVY_INK, 10);
  b += hvTag(cx + 652, 184, 'confidence 0.92', HV.SLATE_SOFT, HV.TEXT, 10);
  b += line(cx, 212, cx + cw, 212, HV.LINE);

  const fx = cx + 168;
  // 1 · Clause detected
  b += t(cx + 20, 240, 'CLAUSE', 9, HV.FAINT, 'start', 700);
  b += t(cx + 20, 256, 'detected', 9, HV.FAINT, 'start');
  b += t(fx, 238, 'Non-solicitation · § 7', 12.5, HV.INK, 'start', 600);
  b += t(fx, 258, '24 months, unilateral, no carve-out for general advertising', 11, HV.MUTED, 'start');
  b += hvTag(cx + 578, 226, 'deviates from playbook', HV.AMBER_SOFT, HV.AMBER, 10);
  b += line(cx, 274, cx + cw, 274, HV.LINE);

  // 2 · Playbook citation
  b += t(cx + 20, 302, 'PLAYBOOK', 9, HV.FAINT, 'start', 700);
  b += t(cx + 20, 318, 'citation', 9, HV.FAINT, 'start');
  b += t(fx, 300, '§ 4.2  Non-solicitation', 12.5, HV.NAVY_INK, 'start', 600);
  b += t(fx, 320, 'Accept ≤ 12 months and only if mutual. Never accept employee non-compete.', 11, HV.MUTED, 'start');
  b += hvTag(cx + 596, 288, 'v12 · R. Mehta', HV.SLATE_SOFT, HV.TEXT, 10);
  b += line(cx, 336, cx + cw, 336, HV.LINE);

  // 3 · Law citation
  b += t(cx + 20, 364, 'LAW', 9, HV.FAINT, 'start', 700);
  b += t(cx + 20, 380, 'citation', 9, HV.FAINT, 'start');
  b += t(fx, 362, 'Cal. Bus. & Prof. Code § 16600', 12.5, HV.NAVY_INK, 'start', 600);
  b += t(fx, 382, 'Employee non-solicits unenforceable in CA · Edwards v. Arthur Andersen (2008)', 11, HV.MUTED, 'start');
  b += hvTag(cx + 622, 350, '✓ verified', HV.GREEN_SOFT, HV.GREEN, 10);
  b += line(cx, 398, cx + cw, 398, HV.LINE);

  // 4 · Redline sent — the artifact itself
  b += t(cx + 20, 426, 'REDLINE', 9, HV.FAINT, 'start', 700);
  b += t(cx + 20, 442, 'sent', 9, HV.FAINT, 'start');
  b += r(fx, 412, 556, 62, HV.BG, 6) + hvSr(fx, 412, 556, 62, HV.LINE, 6);
  b += `<text x="${fx + 14}" y="${434}" font-size="11.5" fill="${HV.TEXT}">During the Term and for <tspan fill="${HV.RED}" text-decoration="line-through">twenty-four (24) months</tspan> <tspan fill="${HV.GREEN}" font-weight="600">twelve (12) months</tspan></text>`;
  b += `<text x="${fx + 14}" y="${456}" font-size="11.5" fill="${HV.TEXT}">thereafter, <tspan fill="${HV.RED}" text-decoration="line-through">Recipient</tspan> <tspan fill="${HV.GREEN}" font-weight="600">neither party</tspan> shall solicit any employee of <tspan fill="${HV.RED}" text-decoration="line-through">Discloser</tspan> <tspan fill="${HV.GREEN}" font-weight="600">the other</tspan>…</text>`;
  b += t(fx, 494, 'Sent to jordan.reyes@acme.example · 09:14 · email thread ↗', 10, HV.FAINT, 'start');
  b += line(cx, 508, cx + cw, 508, HV.LINE);

  // Outcome
  b += hvTag(cx + 20, 518, '✓ Acme accepted 12 months at turn 5', HV.GREEN_SOFT, HV.GREEN, 10.5);
  b += t(cx + cw - 20, 533, 'View full turn ↗', 10.5, HV.NAVY, 'end', 600);

  // ── Collapsed turns ──
  const past = [
    ['Turn 3', 'Harvey · 11 Mar, 16:40', 'Accepted their definition of Confidential Information (§ 1.1). No redline.', 'no deviation', HV.SLATE_SOFT, HV.TEXT],
    ['Turn 2', 'Harvey · 11 Mar, 09:02', 'Countered term 5 years → 3 years (§ 2.1); cited market-norm memo, 2 clauses.', '1 deviation', HV.AMBER_SOFT, HV.AMBER],
    ['Turn 1', 'Harvey · 10 Mar, 14:22', 'Parsed 14 clauses, flagged 3 deviations, drafted the opening redline.', '3 deviations', HV.AMBER_SOFT, HV.AMBER],
    ['Turn 0', 'A. Wu · 10 Mar, 14:20', 'Uploaded Acme paper, selected playbook v12, set turn limit 6.', 'human', HV.NAVY_SOFT, HV.NAVY_INK],
  ];
  past.forEach((p, i) => {
    const y = 564 + i * 56;
    b += hvCard(cx, y, cw, 48);
    b += r(cx, y, 3, 48, i === 3 ? HV.NAVY : HV.BORDER, 1.5);
    b += t(cx + 20, y + 29, p[0], 11.5, HV.INK, 'start', 700);
    b += t(cx + 70, y + 29, p[1], 10.5, HV.MUTED, 'start');
    b += t(cx + 216, y + 29, p[2], 11, HV.TEXT, 'start');
    b += hvTag(cx + cw - hvTagW(p[3], 10) - 16, y + 15, p[3], p[4], p[5], 10);
  });
  b += t(cx, 810, '⤓  Export the full trail (PDF) · every turn immutable, timestamped, and attributable', 10.5, HV.MUTED, 'start');

  // ── Memory rail ──
  const mx = 1008, mw = 408;
  b += hvCard(mx, 172, mw, 410);
  b += t(mx + 20, 200, 'Memory formed', 13, HV.INK, 'start', 700);
  b += t(mx + 20, 219, 'What Harvey carries into the next turn', 10.5, HV.MUTED, 'start');
  b += line(mx, 236, mx + mw, 236, HV.LINE);

  const mem = [
    ['“Acme accepts a 12-month non-solicit', 'if it is mutual.”', 'Acme Robotics', HV.NAVY_SOFT, HV.NAVY_INK, 'from turn 5 · applied'],
    ['“Acme counsel rejects arbitration', 'venues outside Delaware.”', 'Acme Robotics', HV.NAVY_SOFT, HV.NAVY_INK, 'from turn 3 · applied'],
    ['“California counterparties: lead with', '§ 16600 — accepted 4 of 4 times.”', 'All NDAs', HV.AMBER_SOFT, HV.AMBER, 'from turn 4 · needs approval'],
  ];
  mem.forEach((m, i) => {
    const y = 236 + i * 112;
    if (i) b += line(mx + 20, y, mx + mw - 20, y, HV.LINE);
    b += t(mx + 20, y + 30, m[0], 11.5, HV.TEXT, 'start', 500);
    b += t(mx + 20, y + 48, m[1], 11.5, HV.TEXT, 'start', 500);
    b += hvTag(mx + 20, y + 62, m[2], m[3], m[4], 9.5, 18);
    b += t(mx + 20 + hvTagW(m[2], 9.5) + 10, y + 75, m[5], 9.5, HV.FAINT, 'start');
    b += t(mx + mw - 20, y + 96, 'Edit  ·  Forget', 10, HV.NAVY, 'end', 600);
  });

  b += hvCard(mx, 598, mw, 120, 10, HV.AMBER_SOFT, '#E8D3AE');
  b += t(mx + 20, 626, '1 memory would apply to all NDAs', 12, HV.AMBER, 'start', 700);
  b += t(mx + 20, 648, 'Counterparty-scoped memory applies immediately.', 10.5, HV.TEXT, 'start');
  b += t(mx + 20, 665, 'Anything that generalises waits for a lawyer and is', 10.5, HV.TEXT, 'start');
  b += t(mx + 20, 682, 'drafted into the playbook as § 4.2a, never silently.', 10.5, HV.TEXT, 'start');
  b += hvBtn(mx + 20, 692, 132, 26, 'Review 1 memory', HV.CARD, '#E8D3AE', HV.AMBER, 10.5);

  b += hvCard(mx, 734, mw, 106);
  b += t(mx + 20, 760, 'GUARDRAILS ON THIS NDA', 9, HV.FAINT, 'start', 700);
  b += t(mx + 20, 782, '✓  Never autonomous: IP assignment, non-compete', 10.5, HV.TEXT, 'start');
  b += t(mx + 20, 802, '✓  Auto-pause if the playbook version changes', 10.5, HV.TEXT, 'start');
  b += t(mx + 20, 822, '✓  Hard stop at turn 6 — R. Mehta takes over', 10.5, HV.TEXT, 'start');

  return svg(b, HV.BG);
}

// ── HARVEY COMMAND CENTER ─────────────────────────────────────────────────
function harveyCommandCenter() {
  const SB = 208, X = SB + 24;
  let b = hvShell('Command Center');

  // Header + global kill switch
  b += r(SB + 1, 0, W - SB - 1, 80, HV.CARD) + line(SB + 1, 80, W, 80, HV.BORDER);
  b += t(X, 36, 'Command Center', 19, HV.INK, 'start', 700);
  b += t(X, 58, 'Tuesday, 12 March · 186 NDAs in the last 30 days · 3 lawyers, 1 agent', 11, HV.MUTED, 'start');
  b += r(946, 24, 132, 32, HV.CARD, 7) + hvSr(946, 24, 132, 32, HV.BORDER, 7);
  b += t(962, 44, 'Last 30 days  ▾', 11, HV.TEXT, 'start');
  b += hvCard(1096, 16, 320, 48, 9);
  b += circle(1116, 40, 5, HV.GREEN);
  b += t(1128, 36, 'Automation on', 12.5, HV.INK, 'start', 700);
  b += t(1128, 53, '14 NDAs running · 3 paused · 26 turns today', 9.5, HV.MUTED, 'start');
  b += hvPauseBtn(1310, 26, 96, 28, 'Pause all', '#DCC8A6', HV.AMBER, 10.5);

  // Metric tiles — every number carries the pre-Harvey baseline
  const tiles = [
    ['AUTONOMY RATE', '78%', '▲ 6 pts vs Feb', HV.GREEN_SOFT, HV.GREEN, 'NDAs closed with zero lawyer turns', true],
    ['MEDIAN TURNS TO SIGNATURE', '3.1', '▼ from 5.2 baseline', HV.GREEN_SOFT, HV.GREEN, 'Counted per NDA, human turns included', false],
    ['MEDIAN CYCLE TIME', '6h 40m', '▼ from 4.2 days', HV.GREEN_SOFT, HV.GREEN, 'Upload to signature, business hours', false],
    ['LAWYER HOURS RETURNED', '61h', 'this month', HV.SLATE_SOFT, HV.TEXT, '892 clauses reviewed, 41 escalations', false],
  ];
  tiles.forEach((tile, i) => {
    const x = 232 + i * 301;
    b += hvCard(x, 100, 281, 116);
    if (tile[6]) b += r(x, 100, 281, 3, HV.NAVY, 1.5);
    b += t(x + 18, 128, tile[0], 9, HV.FAINT, 'start', 700);
    b += t(x + 18, 166, tile[1], tile[1].length > 4 ? 26 : 30, HV.INK, 'start', 700);
    b += hvTag(x + 18, 176, tile[2], tile[3], tile[4], 9.5, 18);
    b += t(x + 18, 204, tile[5], 9.5, HV.MUTED, 'start');
  });

  // Trend chart — the question is "is this getting better", not "how much"
  b += hvCard(232, 236, 700, 288);
  b += t(252, 266, 'Turns handled per week', 13, HV.INK, 'start', 700);
  b += circle(700, 262, 5, HV.NAVY); b += t(712, 266, 'Harvey', 10.5, HV.MUTED, 'start');
  b += circle(780, 262, 5, '#E4CDA4'); b += t(792, 266, 'Lawyer', 10.5, HV.MUTED, 'start');
  b += t(252, 286, 'Autonomous share is rising while total volume grows — capacity, not deflection.', 10.5, HV.MUTED, 'start');
  const weeks = ['15 Jan', '22 Jan', '29 Jan', '5 Feb', '12 Feb', '19 Feb', '26 Feb', '4 Mar'];
  const hv = [40, 62, 78, 96, 110, 128, 142, 150], lw = [86, 80, 72, 60, 52, 44, 40, 34];
  b += line(268, 470, 908, 470, HV.BORDER);
  weeks.forEach((wk, i) => {
    const x = 280 + i * 78, hH = hv[i] * 0.9, lH = lw[i] * 0.9;
    b += r(x, 470 - hH, 42, hH, HV.NAVY, 2);
    b += r(x, 470 - hH - lH, 42, lH, '#E4CDA4', 2);
    b += t(x + 21, 490, wk, 9, HV.FAINT, 'middle');
    b += t(x + 21, 470 - hH + 16, String(hv[i]), 9.5, '#fff', 'middle', 600);
    b += t(x + 21, 470 - hH - lH + 14, String(lw[i]), 9.5, HV.AMBER, 'middle', 600);
  });
  b += t(252, 508, 'Week of 4 Mar: 150 of 184 turns handled without a lawyer', 10.5, HV.TEXT, 'start', 500);

  // Escalation reasons — each row links to the rule that fired
  b += hvCard(952, 236, 464, 288);
  b += t(972, 266, 'Why Harvey handed off', 13, HV.INK, 'start', 700);
  b += t(972, 286, '41 handoffs · last 30 days', 10.5, HV.MUTED, 'start');
  const reasons = [
    ['Turn limit reached (6 turns)', 41, 17, HV.NAVY],
    ['Counterparty accepted → signature', 26, 11, HV.GREEN],
    ['Counterparty asked for a call', 22, 9, HV.AMBER],
    ['No matching playbook clause', 11, 4, HV.RED],
  ];
  reasons.forEach((rr, i) => {
    const y = 320 + i * 46;
    b += t(972, y, rr[0], 11, HV.TEXT, 'start', 500);
    b += t(1396, y, rr[1] + '%  ·  ' + rr[2], 11, HV.INK, 'end', 700);
    b += r(972, y + 8, 424, 8, '#EDEBE6', 4);
    b += r(972, y + 8, Math.round(424 * rr[1] / 45), 8, rr[3], 4);
  });
  b += line(972, 486, 1396, 486, HV.LINE);
  b += t(972, 508, 'Rising "no playbook match" → a content gap, not a model problem', 10, HV.MUTED, 'start');
  b += t(1396, 508, 'Tune handoff rules →', 10.5, HV.NAVY, 'end', 600);

  // The dashboard ends in a queue
  b += hvCard(232, 544, 700, 300);
  b += t(252, 574, 'Needs a human now', 13, HV.INK, 'start', 700);
  b += t(400, 574, '3 waiting · oldest 41m', 10.5, HV.MUTED, 'start');
  b += t(912, 574, 'Open all →', 10.5, HV.NAVY, 'end', 600);
  b += line(232, 592, 932, 592, HV.LINE);
  const needs = [
    ['Vela Systems', 'Turn limit reached', HV.AMBER_SOFT, HV.AMBER, 'waiting 41m', 'R. Mehta', 'Harvey holds at 12-month non-solicit; Vela wants 24.'],
    ['Kestrel Analytics', 'Call requested', HV.AMBER_SOFT, HV.AMBER, 'waiting 18m', 'R. Mehta', '“Can we hop on a quick call Thursday?” · confidence 0.91'],
    ['Corvus Freight', 'Counterparty accepted', HV.GREEN_SOFT, HV.GREEN, 'waiting 9m', 'A. Wu', 'Clean accept, 1 deviation — signature review only.'],
  ];
  needs.forEach((nd, i) => {
    const y = 592 + i * 74;
    if (i) b += line(252, y, 912, y, HV.LINE);
    b += t(252, y + 28, nd[0], 12.5, HV.INK, 'start', 600);
    b += hvTag(252, y + 38, nd[1], nd[2], nd[3], 10);
    b += t(252 + hvTagW(nd[1], 10) + 10, y + 52, nd[4] + ' · ' + nd[5], 10, HV.MUTED, 'start');
    b += t(560, y + 30, nd[6], 10.5, HV.MUTED, 'start');
    b += hvBtn(842, y + 22, 70, 28, 'Open', HV.CARD, HV.BORDER, HV.NAVY, 11);
  });

  // Published guardrails — the screenshot that goes into a security review
  b += hvCard(952, 544, 464, 300);
  b += t(972, 574, 'What Harvey will never do alone', 13, HV.INK, 'start', 700);
  b += line(952, 592, 1416, 592, HV.LINE);
  [
    'Never autonomous on IP assignment, non-compete,',
    '     or data-processing clauses — always a lawyer',
    'Never sends a document for signature',
    'Auto-pauses every NDA when the playbook version changes',
    'No memory generalises across NDAs without approval',
    'Hard stop at 6 turns per negotiation',
  ].forEach((g, i) => {
    const y = 620 + i * 26;
    if (i !== 1) b += t(972, y, '✓', 11, HV.GREEN, 'start', 700);
    b += t(990, y, g, 10.5, HV.TEXT, 'start');
  });
  b += line(972, 792, 1396, 792, HV.LINE);
  b += t(972, 814, 'Last global pause: 4 Mar, 09:02–09:40 by A. Wu', 10.5, HV.MUTED, 'start');
  b += t(972, 830, 'Reason: playbook v12 rollout · 14 NDAs held, 0 sent', 10, HV.FAINT, 'start');

  return svg(b, HV.BG);
}

// ── HARVEY HANDOFF RULES ──────────────────────────────────────────────────
function harveyHandoff() {
  const SB = 208, X = SB + 24;
  let b = hvShell('Handoff Rules');

  b += r(SB + 1, 0, W - SB - 1, 80, HV.CARD) + line(SB + 1, 80, W, 80, HV.BORDER);
  b += t(X, 36, 'Handoff rules', 19, HV.INK, 'start', 700);
  b += t(X, 58, 'When Harvey stops negotiating and a person takes over · applies to 38 open NDAs', 11, HV.MUTED, 'start');
  b += r(912, 24, 190, 32, HV.CARD, 7) + hvSr(912, 24, 190, 32, HV.BORDER, 7);
  b += t(928, 44, 'Applies to:  All NDAs  ▾', 11, HV.TEXT, 'start');
  b += hvBtn(1120, 24, 88, 32, 'Discard', HV.CARD, HV.BORDER, HV.MUTED, 11.5);
  b += hvBtn(1224, 24, 192, 32, 'Save rules  ·  simulate first', HV.NAVY, null, '#fff', 11.5);

  const L = 232, LW = 690, fx = 300;

  // Rule 1 — turn limit, with its reasoning attached
  b += hvCard(L, 100, LW, 172);
  b += hvToggle(L + 20, 116, true);
  b += t(fx, 130, 'Hand to a lawyer after a set number of turns', 13.5, HV.INK, 'start', 600);
  b += t(fx, 150, 'A turn = one redline exchanged with the counterparty.', 11, HV.MUTED, 'start');
  b += hvTag(L + LW - 132, 116, 'active on 38 NDAs', HV.NAVY_SOFT, HV.NAVY_INK, 10);
  b += r(fx, 164, 124, 34, HV.BG, 8) + hvSr(fx, 164, 124, 34, HV.BORDER, 8);
  b += line(fx + 40, 164, fx + 40, 198, HV.BORDER);
  b += line(fx + 84, 164, fx + 84, 198, HV.BORDER);
  b += t(fx + 20, 187, '−', 16, HV.MUTED, 'middle');
  b += t(fx + 62, 187, '6', 15, HV.INK, 'middle', 700);
  b += t(fx + 104, 186, '+', 15, HV.MUTED, 'middle');
  b += t(fx + 136, 187, 'turns', 11.5, HV.TEXT, 'start');
  b += t(fx + 186, 187, 'median NDA closes in 3.1 — six leaves room to counter twice', 10.5, HV.MUTED, 'start');
  b += t(fx, 222, '☑  Only count turns where Harvey changed the document', 11, HV.TEXT, 'start');
  b += t(fx, 244, '☐  Warn the assigned lawyer one turn early', 11, HV.MUTED, 'start');

  // Rule 2 — probabilistic trigger, threshold exposed
  b += hvCard(L, 288, LW, 160);
  b += hvToggle(L + 20, 304, true);
  b += t(fx, 318, 'When the counterparty asks for a call', 13.5, HV.INK, 'start', 600);
  b += t(fx, 338, 'Detected from the thread — “hop on a call”, “quick sync”, a calendar link, a phone number.', 11, HV.MUTED, 'start');
  b += hvTag(L + LW - 120, 304, '9 fired this month', HV.SLATE_SOFT, HV.TEXT, 10);
  b += t(fx, 372, 'Hand off above', 11, HV.TEXT, 'start', 500);
  b += r(fx + 92, 366, 240, 6, '#E4E2DC', 3);
  b += r(fx + 92, 366, 168, 6, HV.NAVY, 3);
  b += circle(fx + 260, 369, 9, HV.CARD) + hvSr(fx + 251, 360, 18, 18, HV.NAVY, 9, 2);
  b += t(fx + 344, 372, '0.80  ·  high confidence', 11, HV.NAVY_INK, 'start', 600);
  b += t(fx, 400, 'Below 0.80 Harvey flags the thread in the queue instead of handing off — it never ignores the signal.', 10.5, HV.MUTED, 'start');
  b += t(fx, 424, '☑  Also notify #legal-escalations in Slack', 11, HV.TEXT, 'start');

  // Rule 3 — acceptance is a handoff too
  b += hvCard(L, 464, LW, 176);
  b += hvToggle(L + 20, 480, true);
  b += t(fx, 494, 'When the counterparty accepts', 13.5, HV.INK, 'start', 600);
  b += t(fx, 514, 'Acceptance ends the negotiation — a person signs off before anything is executed.', 11, HV.MUTED, 'start');
  b += hvTag(L + LW - 116, 480, '11 fired this month', HV.GREEN_SOFT, HV.GREEN, 10);
  [
    ['Always route to a lawyer', false, 'safest · adds ~11 min per clean NDA'],
    ['Only if any clause deviated from the playbook', true, 'default · 26% of accepts last month'],
    ['Never — route straight to signature', false, 'not recommended · execution cannot be undone'],
  ].forEach((opt, i) => {
    const y = 542 + i * 26;
    b += circle(fx + 7, y - 4, 7, HV.CARD) + hvSr(fx, y - 11, 14, 14, opt[1] ? HV.NAVY : '#CFCDC7', 7, 1.5);
    if (opt[1]) b += circle(fx + 7, y - 4, 4, HV.NAVY);
    b += t(fx + 24, y, opt[0], 11.5, opt[1] ? HV.INK : HV.TEXT, 'start', opt[1] ? 600 : 400);
    b += t(fx + 316, y, opt[2], 10.5, HV.FAINT, 'start');
  });
  b += t(fx, 622, 'Harvey never sends a document for signature on its own, whatever these toggles say.', 10.5, HV.NAVY_INK, 'start', 600);

  // Clause-level guardrails — no turn count overrides these
  b += hvCard(L, 656, LW, 152);
  b += t(L + 20, 686, 'Always escalate these clauses — at any turn, at any confidence', 13, HV.INK, 'start', 700);
  let cx2 = L + 20;
  ['IP assignment', 'Non-compete', 'Data processing (GDPR)', 'Indemnity > $1M', 'Governing law ≠ DE / CA'].forEach(c => {
    const w = hvTagW(c, 11);
    b += pill(cx2, 702, w, 26, HV.SLATE_SOFT) + hvSr(cx2, 702, w, 26, HV.BORDER, 13);
    b += t(cx2 + w / 2, 719, c, 11, HV.TEXT, 'middle', 500);
    cx2 += w + 8;
  });
  b += t(L + 20, 752, '+  Add clause type', 11, HV.NAVY, 'start', 600);
  b += t(L + 20, 780, 'Harvey still drafts a recommendation for each one — it simply does not send it.', 10.5, HV.MUTED, 'start');

  // Who takes over
  const R = 946, RW = 470;
  b += hvCard(R, 100, RW, 168);
  b += t(R + 20, 130, 'Who takes over', 13, HV.INK, 'start', 700);
  b += line(R, 148, R + RW, 148, HV.LINE);
  [['RM', 'R. Mehta', '12 open · avg first touch 14m'], ['AW', 'A. Wu', '7 open · avg first touch 22m']].forEach((p, i) => {
    const y = 148 + i * 44;
    b += circle(R + 34, y + 24, 14, HV.NAVY_SOFT);
    b += t(R + 34, y + 28, p[0], 10, HV.NAVY_INK, 'middle', 700);
    b += t(R + 58, y + 22, p[1], 12, HV.INK, 'start', 600);
    b += t(R + 58, y + 38, p[2], 10, HV.MUTED, 'start');
  });
  b += t(R + 20, 254, '◉ Round robin by open load     ○ Always R. Mehta', 11, HV.TEXT, 'start');

  // Simulation before save
  b += hvCard(R, 284, RW, 236);
  b += t(R + 20, 314, 'If these rules were live', 13, HV.INK, 'start', 700);
  b += t(R + 20, 333, 'Replayed against the last 30 days · 186 NDAs', 10.5, HV.MUTED, 'start');
  b += line(R, 350, R + RW, 350, HV.LINE);
  [
    ['Escalation rate', '22%', '27%', '+9 NDAs', 22, 27, HV.AMBER],
    ['Autonomy rate', '78%', '73%', '−5 pts', 78, 73, HV.NAVY],
    ['Lawyer time per NDA', '—', '11 min', 'median first touch', 0, 0, HV.MUTED],
  ].forEach((s, i) => {
    const y = 378 + i * 44;
    b += t(R + 20, y, s[0], 11, HV.TEXT, 'start', 500);
    b += t(R + RW - 20, y, s[1] + '  →  ' + s[2], 11.5, HV.INK, 'end', 700);
    if (s[4]) {
      b += r(R + 20, y + 8, 300, 8, '#EDEBE6', 4);
      b += r(R + 20, y + 8, 3 * s[4], 8, '#D8D5CE', 4);
      b += r(R + 20, y + 8, 3 * s[5], 4, s[6], 2);
    }
    b += t(R + RW - 20, y + 16, s[3], 10, HV.MUTED, 'end');
  });
  b += t(R + 20, 502, 'Replay uses recorded turns and assumes counterparty behaviour is unchanged.', 9.5, HV.FAINT, 'start');

  // What the lawyer receives
  b += hvCard(R, 536, RW, 300);
  b += t(R + 20, 566, 'What the lawyer receives', 13, HV.INK, 'start', 700);
  b += t(R + RW - 20, 566, 'preview', 10.5, HV.FAINT, 'end');
  b += r(R + 20, 582, RW - 40, 178, HV.BG, 8) + hvSr(R + 20, 582, RW - 40, 178, HV.BORDER, 8);
  b += t(R + 38, 608, 'Acme Robotics — handed to you at turn 6', 12, HV.INK, 'start', 700);
  b += t(R + 38, 626, 'Mutual NDA · counterparty paper · opened 10 Mar', 10, HV.MUTED, 'start');
  b += line(R + 38, 638, R + RW - 38, 638, HV.LINE);
  [
    ['OPEN ISSUE', 'Acme wants a 24-month non-solicit; we hold at 12.'],
    ['POSITION HELD', 'Playbook § 4.2 + Cal. B&P § 16600 — cited in turns 4 and 6.'],
    ['RECOMMENDED', 'Offer 18 months with a mutual general-advertising carve-out.'],
  ].forEach((s, i) => {
    const y = 656 + i * 32;
    b += t(R + 38, y, s[0], 8.5, HV.FAINT, 'start', 700);
    b += t(R + 38, y + 14, s[1], 10.5, HV.TEXT, 'start');
  });
  b += t(R + 38, 752, 'All 6 turns, every citation, one click away ↗', 10, HV.NAVY, 'start', 600);
  b += hvBtn(R + 20, 776, 132, 34, 'Take over', HV.NAVY, null, '#fff', 12);
  b += hvBtn(R + 162, 776, 268, 34, '↩  Send back to Harvey with a note', HV.CARD, HV.BORDER, HV.TEXT, 12);

  return svg(b, HV.BG);
}

// ── Generic fallback ───────────────────────────────────────────────────────
function genericSVG(screen) {
  return svg(
    t(W / 2, H / 2, screen.label, 24, '#444450', 'middle', 600) +
    t(W / 2, H / 2 + 32, 'Run scripts/fetch-screenshots.js for real screenshots', 13, '#35353c', 'middle'),
    '#0f0f10'
  );
}
