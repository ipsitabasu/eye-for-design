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

// ── Generic fallback ───────────────────────────────────────────────────────
function genericSVG(screen) {
  return svg(
    t(W / 2, H / 2, screen.label, 24, '#444450', 'middle', 600) +
    t(W / 2, H / 2 + 32, 'Run scripts/fetch-screenshots.js for real screenshots', 13, '#35353c', 'middle'),
    '#0f0f10'
  );
}
