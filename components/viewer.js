export function renderViewer(screen, activeAnnotationId) {
  const frame = document.getElementById('viewer-frame');
  const img = document.getElementById('viewer-img');
  const skeleton = document.getElementById('viewer-skeleton');
  const context = document.getElementById('viewer-context');

  // Lock aspect ratio via padding-bottom trick
  frame.style.paddingBottom = `${(screen.imageHeight / screen.imageWidth) * 100}%`;

  // Update context text
  context.textContent = screen.context || '';

  // Load image — fall back to SVG wireframe if it fails
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

  // Remove existing markers
  frame.querySelectorAll('.callout-marker').forEach(m => m.remove());

  // Render markers
  for (const annotation of screen.annotations) {
    const marker = document.createElement('button');
    marker.className = 'callout-marker' + (annotation.id === activeAnnotationId ? ' active' : '');
    marker.style.left = `${annotation.x}%`;
    marker.style.top = `${annotation.y}%`;
    marker.textContent = annotation.label;
    marker.setAttribute('aria-label', `Marker ${annotation.label}: ${annotation.title}`);
    marker.dataset.annotationId = annotation.id;
    frame.appendChild(marker);
  }
}

// ─── Placeholder SVG wireframes ────────────────────────────────────────────
// Generated when the actual screenshot PNG hasn't been captured yet.
// Each template loosely matches the layout of the real screen so annotation
// coordinates still make spatial sense.

const PLACEHOLDERS = {
  'linear/inbox': linearInboxSVG,
  'linear/issues': linearIssuesSVG,
  'linear/cycles': linearCyclesSVG,
  'duolingo/home': duolingoHomeSVG,
  'duolingo/lesson': duolingoLessonSVG,
  'duolingo/leaderboard': duolingoLeaderboardSVG,
  'notion/editor': notionEditorSVG,
  'notion/database': notionDatabaseSVG,
  'notion/sidebar': notionSidebarSVG,
  'stripe/dashboard': stripeDashboardSVG,
  'stripe/checkout': stripeCheckoutSVG,
  'stripe/payment-links': stripePaymentLinksSVG,
};

function makePlaceholder(screen) {
  const key = screen.imageUrl
    .replace('assets/screenshots/', '')
    .replace('.png', '');
  const fn = PLACEHOLDERS[key];
  const svg = fn ? fn() : genericSVG(screen);
  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
}

// ─── Shared SVG helpers ────────────────────────────────────────────────────

const BG = '#0f0f10';
const SURFACE = '#1a1a1d';
const S2 = '#242428';
const S3 = '#2e2e33';
const BORDER = '#2a2a2e';
const TEXT = '#e8e8ea';
const MUTED = '#55555c';
const FAINT = '#35353c';

function rect(x, y, w, h, fill, rx = 4) {
  return `<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="${fill}" rx="${rx}"/>`;
}

function text(x, y, content, size = 11, fill = MUTED, anchor = 'start', weight = 400) {
  return `<text x="${x}" y="${y}" font-size="${size}" fill="${fill}" text-anchor="${anchor}" font-weight="${weight}" font-family="system-ui,sans-serif">${content}</text>`;
}

function pill(x, y, w, h, fill) {
  return `<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="${fill}" rx="${h / 2}"/>`;
}

function row(y, h = 28, indent = 0) {
  return rect(indent, y, 1440 - indent, h, S2, 0);
}

// ─── Linear: Inbox ────────────────────────────────────────────────────────

function linearInboxSVG() {
  const rows = [130, 175, 220, 265, 310, 355, 400, 445, 490, 535, 580, 625, 670, 715, 760, 805, 850];
  return `<svg xmlns="http://www.w3.org/2000/svg" width="1440" height="900" style="font-family:system-ui,sans-serif">
  ${rect(0, 0, 1440, 900, BG)}
  <!-- Sidebar -->
  ${rect(0, 0, 48, 900, SURFACE)}
  ${[90, 150, 210, 270, 330, 390, 450].map(y => rect(12, y, 24, 24, S3, 6)).join('')}
  <!-- Top bar -->
  ${rect(48, 0, 1392, 44, SURFACE)}
  ${text(70, 26, 'Inbox', 13, TEXT, 'start', 600)}
  ${rect(1360, 12, 60, 20, S3, 4)}
  <!-- Section divider -->
  ${rect(48, 44, 1392, 1, BORDER)}
  <!-- Inbox rows -->
  ${rows.map((y, i) => `
    ${rect(48, y, 1392, 40, i % 3 === 0 ? S2 : 'transparent', 0)}
    ${rect(60, y + 10, 20, 20, S3, 10)}
    ${rect(88, y + 12, 180 + (i % 4) * 40, 8, S3, 4)}
    ${rect(88, y + 25, 120 + (i % 3) * 30, 6, FAINT, 3)}
    ${pill(1340, y + 14, 50, 14, S3)}
  `).join('')}
  <!-- Watermark -->
  ${text(744, 455, 'Linear · Inbox', 14, FAINT, 'middle', 400)}
</svg>`;
}

// ─── Linear: Issues ────────────────────────────────────────────────────────

function linearIssuesSVG() {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="1440" height="900" style="font-family:system-ui,sans-serif">
  ${rect(0, 0, 1440, 900, BG)}
  ${rect(0, 0, 48, 900, SURFACE)}
  ${[90, 150, 210, 270, 330, 390].map(y => rect(12, y, 24, 24, S3, 6)).join('')}
  <!-- Top bar -->
  ${rect(48, 0, 900, 44, SURFACE)}
  ${rect(48, 44, 900, 1, BORDER)}
  <!-- Issue title -->
  ${text(68, 78, 'Refactor auth middleware for token refresh', 17, TEXT, 'start', 600)}
  <!-- Body -->
  ${[110, 128, 146].map(y => rect(68, y, 600 - (y % 40) * 3, 10, S3, 4)).join('')}
  ${[170, 188, 206].map(y => rect(68, y, 500 - (y % 30) * 2, 10, S3, 4)).join('')}
  <!-- Code block -->
  ${rect(68, 230, 660, 120, SURFACE, 6)}
  ${[250, 265, 280, 310].map(y => rect(84, y, 400 + (y % 50) * 2, 8, S3, 3)).join('')}
  <!-- Activity -->
  ${[400, 450, 500, 550, 600, 650, 700, 750, 800].map(y => `
    ${rect(60, y, 28, 28, S3, 14)}
    ${rect(96, y + 6, 350 + (y % 50) * 2, 8, S3, 4)}
    ${rect(96, y + 19, 200, 6, FAINT, 3)}
  `).join('')}
  <!-- Right rail -->
  ${rect(948, 0, 492, 900, SURFACE)}
  ${rect(948, 0, 1, 900, BORDER)}
  ${['Status', 'Priority', 'Assignee', 'Cycle', 'Label', 'Due date'].map((label, i) => `
    ${text(968, 60 + i * 50, label, 11, MUTED)}
    ${rect(1060, 44 + i * 50, 360, 24, S3, 4)}
  `).join('')}
  ${text(720, 455, 'Linear · Issue Detail', 14, FAINT, 'middle')}
</svg>`;
}

// ─── Linear: Cycles ────────────────────────────────────────────────────────

function linearCyclesSVG() {
  const cycles = [
    { label: 'Sprint 24 · Active', pct: 62, y: 80 },
    { label: 'Sprint 25 · Upcoming', pct: 0, y: 240 },
    { label: 'Sprint 23 · Completed', pct: 100, y: 400 },
  ];
  return `<svg xmlns="http://www.w3.org/2000/svg" width="1440" height="900" style="font-family:system-ui,sans-serif">
  ${rect(0, 0, 1440, 900, BG)}
  ${rect(0, 0, 48, 900, SURFACE)}
  ${rect(48, 0, 1392, 44, SURFACE)}
  ${text(68, 26, 'Cycles', 13, TEXT, 'start', 600)}
  <!-- Tabs -->
  ${['Active', 'Upcoming', 'Completed'].map((t, i) => `
    ${rect(68 + i * 100, 50, 88, 28, i === 0 ? S2 : 'transparent', 4)}
    ${text(112 + i * 100, 69, t, 12, i === 0 ? TEXT : MUTED, 'middle')}
  `).join('')}
  ${cycles.map(({ label, pct, y }) => `
    ${rect(68, y, 1300, 130, SURFACE, 8)}
    ${text(88, y + 26, label, 13, TEXT, 'start', 600)}
    ${text(88, y + 44, `${Math.round(pct * 0.28)}/28 issues`, 11, MUTED)}
    <!-- Progress bar -->
    ${rect(88, y + 64, 1220, 12, S3, 6)}
    ${pct > 0 ? rect(88, y + 64, Math.round(1220 * pct / 100), 12, '#5E6AD2', 6) : ''}
    ${text(1320, y + 74, `${pct}%`, 11, MUTED, 'end')}
  `).join('')}
  ${text(720, 600, 'Linear · Cycles', 14, FAINT, 'middle')}
</svg>`;
}

// ─── Duolingo: Home ────────────────────────────────────────────────────────

function duolingoHomeSVG() {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="1440" height="900" style="font-family:system-ui,sans-serif">
  ${rect(0, 0, 1440, 900, '#ffffff')}
  <!-- Nav -->
  ${rect(0, 0, 1440, 56, '#ffffff')}
  ${rect(0, 56, 1440, 1, '#e5e5e5')}
  <!-- Logo area -->
  ${rect(32, 14, 120, 28, '#58CC02', 6)}
  ${text(92, 32, 'duolingo', 14, '#ffffff', 'middle', 700)}
  <!-- Streak display -->
  ${rect(540, 14, 80, 28, '#FFF3E0', 14)}
  ${text(580, 32, '🔥 47', 13, '#FF9800', 'middle', 700)}
  <!-- Gems -->
  ${rect(640, 14, 70, 28, '#E8F5E9', 14)}
  ${text(675, 32, '💎 350', 12, '#58CC02', 'middle', 600)}
  <!-- Main layout: left rail + center + right rail -->
  ${rect(0, 56, 220, 844, '#fafafa')}
  ${rect(220, 56, 1, 844, '#e5e5e5')}
  ${rect(1100, 56, 1, 844, '#e5e5e5')}
  ${rect(1100, 56, 340, 844, '#fafafa')}
  <!-- Left rail: course tree -->
  ${text(30, 100, 'SPANISH', 10, '#58CC02', 'start', 800)}
  ${[130, 200, 270, 340, 410, 480, 550, 620].map((y, i) => `
    ${rect(60, y, 100, 44, i % 4 === 0 ? '#58CC02' : i % 4 === 1 ? '#e5e5e5' : '#f0f0f0', 22)}
    ${text(110, y + 26, i === 0 ? '✓' : '🔒', 14, i === 0 ? '#fff' : '#bbb', 'middle')}
  `).join('')}
  <!-- Center: lesson path -->
  ${[140, 260, 380, 500, 620, 740].map((y, i) => `
    ${rect(520 - (i % 2) * 60, y, 400 + (i % 2) * 120, 80, i === 0 ? '#58CC02' : '#f0f0f0', 12)}
    ${rect(660 - (i % 2) * 30, y + 25, 120, 30, i === 0 ? '#46a302' : '#e0e0e0', 8)}
    ${text(720, y + 47, i === 0 ? 'Continue' : `Unit ${i + 1}`, 13, i === 0 ? '#fff' : '#999', 'middle', i === 0 ? 700 : 400)}
  `).join('')}
  <!-- Right rail: XP progress ring -->
  ${text(1250, 100, 'Daily Goal', 12, '#aaa', 'middle', 600)}
  <circle cx="1250" cy="170" r="44" fill="none" stroke="#e5e5e5" stroke-width="8"/>
  <circle cx="1250" cy="170" r="44" fill="none" stroke="#58CC02" stroke-width="8" stroke-dasharray="176 100" stroke-dashoffset="44" stroke-linecap="round"/>
  ${text(1250, 178, '65%', 16, '#333', 'middle', 700)}
  <!-- Leaderboard widget -->
  ${rect(1120, 230, 260, 200, '#fff', 8)}
  ${rect(1120, 230, 260, 1, '#e5e5e5')}
  ${text(1250, 256, 'GOLD LEAGUE', 10, '#FFD700', 'middle', 800)}
  ${[280, 308, 336].map((y, i) => `
    ${text(1135, y, `#${i + 3}`, 12, '#aaa', 'start')}
    ${rect(1160, y - 12, 180, 14, '#f0f0f0', 3)}
  `).join('')}
  ${text(720, 855, 'Duolingo · Home', 13, '#ccc', 'middle')}
</svg>`;
}

// ─── Duolingo: Lesson ─────────────────────────────────────────────────────

function duolingoLessonSVG() {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="1440" height="900" style="font-family:system-ui,sans-serif">
  ${rect(0, 0, 1440, 900, '#ffffff')}
  <!-- Progress bar -->
  ${rect(0, 0, 1440, 8, '#e5e5e5')}
  ${rect(0, 0, 900, 8, '#58CC02')}
  <!-- Close button -->
  ${rect(24, 20, 28, 28, 'transparent')}
  <!-- Lesson frame -->
  ${rect(370, 60, 700, 700, '#fafafa', 16)}
  <!-- Question prompt -->
  ${rect(420, 100, 600, 20, '#e5e5e5', 4)}
  ${rect(420, 130, 460, 20, '#e5e5e5', 4)}
  <!-- Character illustration -->
  <circle cx="720" cy="260" r="70" fill="#DDF4FF"/>
  ${rect(680, 340, 80, 10, '#e0e0e0', 4)}
  <!-- Answer choices -->
  ${['Hola', 'Buenos días', 'Adiós', 'Por favor'].map((opt, i) => `
    ${rect(420, 400 + i * 64, 600, 52, i === 0 ? '#D7FFB8' : '#ffffff', 12)}
    ${rect(420, 400 + i * 64, 600, 52, i === 0 ? '#58CC02' : '#e5e5e5', 12, 'none')}
    ${text(720, 432 + i * 64, opt, 14, i === 0 ? '#58A700' : '#4B4B4B', 'middle', 600)}
  `).join('')}
  <!-- Feedback banner -->
  ${rect(0, 760, 1440, 140, '#D7FFB8')}
  ${text(200, 820, '✓ Great job!', 20, '#58A700', 'start', 700)}
  ${text(200, 848, 'You got it right.', 13, '#58A700')}
  ${rect(1060, 780, 200, 48, '#58CC02', 12)}
  ${text(1160, 812, 'Continue', 14, '#fff', 'middle', 700)}
  ${text(720, 455, 'Duolingo · Lesson', 13, '#ccc', 'middle')}
</svg>`;
}

// ─── Duolingo: Leaderboard ─────────────────────────────────────────────────

function duolingoLeaderboardSVG() {
  const users = [
    { name: 'Elena M.', xp: 2840, promoted: true },
    { name: 'Arjun K.', xp: 2610, promoted: true },
    { name: 'Sofia R.', xp: 2490, promoted: true },
    { name: 'You', xp: 1820, promoted: false, you: true },
    { name: 'Marcus T.', xp: 1670, promoted: false },
    { name: 'Lena H.', xp: 1540, promoted: false },
    { name: 'Paul O.', xp: 980, demoted: true },
    { name: 'Amy C.', xp: 750, demoted: true },
  ];
  return `<svg xmlns="http://www.w3.org/2000/svg" width="1440" height="900" style="font-family:system-ui,sans-serif">
  ${rect(0, 0, 1440, 900, '#ffffff')}
  ${rect(0, 0, 1440, 56, '#ffffff')}
  ${rect(0, 56, 1440, 1, '#e5e5e5')}
  ${text(720, 34, '🏆 Gold League', 16, '#FFD700', 'middle', 700)}
  <!-- Timer -->
  ${rect(1300, 16, 120, 24, '#FFF3E0', 12)}
  ${text(1360, 32, '⏱ 4d 12h', 11, '#FF9800', 'middle', 600)}
  <!-- Promotion zone header -->
  ${rect(370, 70, 700, 22, '#E8F5E9', 0)}
  ${text(720, 85, '↑ Promotion Zone — top 10 advance', 11, '#58CC02', 'middle', 600)}
  <!-- Rows -->
  ${users.map(({ name, xp, promoted, demoted, you }, i) => `
    ${rect(370, 92 + i * 68, 700, 62, you ? '#FFF9C4' : promoted ? '#F1FFF0' : demoted ? '#FFF0F0' : '#fff', 0)}
    ${rect(370, 92 + i * 68, 700, 1, '#e5e5e5', 0)}
    ${text(390, 128 + i * 68, `#${i + 1}`, 13, '#aaa', 'start', 400)}
    <circle cx="440" cy="122" r="18" fill="${you ? '#FFD700' : promoted ? '#a8d8a8' : '#e0e0e0'}" cy="${115 + i * 68}"/>
    ${text(465, 118 + i * 68, you ? 'You' : name.charAt(0), 13, '#fff', 'start', 700)}
    ${text(490, 118 + i * 68, name, 13, you ? '#333' : '#555', 'start', you ? 700 : 400)}
    ${rect(900, 107 + i * 68, Math.round(xp / 12), 18, promoted ? '#58CC02' : demoted ? '#FF6B6B' : '#e0e0e0', 4)}
    ${text(1060, 120 + i * 68, `${xp} XP`, 12, '#aaa', 'start')}
  `).join('')}
  <!-- Demotion zone -->
  ${rect(370, 92 + users.length * 68 - 136, 700, 22, '#FFF0F0', 0)}
  ${text(720, 108 + users.length * 68 - 136, '↓ Demotion Zone — bottom 5 drop down', 11, '#FF6B6B', 'middle', 600)}
  ${text(720, 855, 'Duolingo · Leaderboard', 13, '#ccc', 'middle')}
</svg>`;
}

// ─── Notion: Editor ────────────────────────────────────────────────────────

function notionEditorSVG() {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="1440" height="900" style="font-family:system-ui,sans-serif">
  ${rect(0, 0, 1440, 900, '#ffffff')}
  <!-- Sidebar -->
  ${rect(0, 0, 240, 900, '#f7f7f5')}
  ${rect(240, 0, 1, 900, '#e9e9e7')}
  ${text(16, 30, '🏠 Workspace', 12, '#444', 'start', 600)}
  ${['📋 Getting Started', '📄 Meeting Notes', '🎯 Q2 Goals', '🗄️ Projects DB', '📊 Analytics', '✅ Tasks'].map((p, i) =>
    text(24, 64 + i * 28, p, 12, i === 2 ? '#000' : '#666', 'start', i === 2 ? 600 : 400)
  ).join('')}
  <!-- Cover image -->
  ${rect(240, 0, 1200, 160, '#DDE4FF')}
  ${text(840, 88, '🌊', 48, '#aabbff', 'middle')}
  <!-- Page title -->
  ${text(440, 208, 'Q2 Goals & OKRs', 32, '#111', 'start', 700)}
  <!-- Slash command hint -->
  ${pill(440, 225, 160, 22, '#f0f0ee')}
  ${text(520, 240, "Type '/' for commands", 11, '#999', 'middle')}
  <!-- Body text blocks -->
  ${[270, 295, 320].map(y => rect(440, y, 680 - (y % 50) * 2, 10, '#e0e0e0', 3)).join('')}
  <!-- H2 -->
  ${rect(440, 360, 200, 14, '#111', 3)}
  ${[390, 410, 430].map(y => rect(440, y, 560 - (y % 40), 8, '#d5d5d5', 3)).join('')}
  <!-- Callout block -->
  ${rect(440, 460, 720, 80, '#FFF9C4', 6)}
  ${rect(440, 460, 4, 80, '#FFD600', 0)}
  ${[480, 500, 520].map(y => rect(460, y, 480 - (y % 30) * 2, 8, '#ccc', 3)).join('')}
  <!-- Toggle block -->
  ${rect(440, 560, 720, 40, '#f7f7f5', 4)}
  ${text(456, 584, '▶ Objectives breakdown', 13, '#555', 'start', 500)}
  <!-- Drag handle hint -->
  ${text(424, 292, '⠿', 12, '#ccc', 'start')}
  ${text(720, 855, 'Notion · Editor', 13, '#ccc', 'middle')}
</svg>`;
}

// ─── Notion: Database ─────────────────────────────────────────────────────

function notionDatabaseSVG() {
  const cols = ['Name', 'Status', 'Owner', 'Due Date', 'Priority', 'Tags'];
  const colW = [280, 120, 140, 130, 110, 200];
  const colX = colW.reduce((acc, w, i) => { acc.push(i === 0 ? 240 : acc[i-1] + colW[i-1]); return acc; }, []);
  const rows = [
    ['Redesign onboarding flow', '🟢 Done', 'Mia', 'Apr 12', '🔴 High', 'Design, UX'],
    ['API rate limiting', '🟡 In Progress', 'Alex', 'Apr 18', '🟠 Med', 'Engineering'],
    ['Q2 roadmap review', '⚪ Not started', 'Sam', 'Apr 25', '🟡 Low', 'Strategy'],
    ['Fix payment bug', '🔵 In Review', 'Kai', 'Apr 15', '🔴 High', 'Engineering'],
    ['Write release notes', '⚪ Not started', 'Mia', 'May 1', '🟡 Low', 'Marketing'],
  ];
  return `<svg xmlns="http://www.w3.org/2000/svg" width="1440" height="900" style="font-family:system-ui,sans-serif">
  ${rect(0, 0, 1440, 900, '#ffffff')}
  ${rect(0, 0, 240, 900, '#f7f7f5')}
  ${rect(240, 0, 1, 900, '#e9e9e7')}
  <!-- View switcher tabs -->
  ${['Table', 'Board', 'Timeline', 'Calendar'].map((t, i) => `
    ${rect(248 + i * 90, 8, 82, 28, i === 0 ? '#ebebea' : 'transparent', 4)}
    ${text(289 + i * 90, 26, t, 12, i === 0 ? '#111' : '#888', 'middle', i === 0 ? 600 : 400)}
  `).join('')}
  <!-- Filter bar -->
  ${rect(248, 44, 900, 28, 'transparent', 0)}
  ${pill(252, 48, 70, 20, '#ebebea')}
  ${text(287, 62, 'Filter', 11, '#888', 'middle')}
  ${pill(330, 48, 60, 20, '#ebebea')}
  ${text(360, 62, 'Sort', 11, '#888', 'middle')}
  <!-- Table header -->
  ${rect(240, 76, 1200, 32, '#f7f7f5')}
  ${colX.map((x, i) => `
    ${rect(x, 76, colW[i], 32, '#f7f7f5', 0)}
    ${text(x + 8, 96, cols[i], 11, '#888', 'start', 600)}
    ${i < cols.length - 1 ? rect(x + colW[i] - 1, 76, 1, 32, '#e9e9e7', 0) : ''}
  `).join('')}
  ${rect(240, 108, 1200, 1, '#e9e9e7')}
  <!-- Rows -->
  ${rows.map((row, ri) => `
    ${rect(240, 109 + ri * 38, 1200, 38, ri % 2 === 0 ? '#fff' : '#fafaf9', 0)}
    ${rect(240, 147 + ri * 38, 1200, 1, '#e9e9e7', 0)}
    ${row.map((cell, ci) => text(colX[ci] + 8, 132 + ri * 38, cell, 12, ci === 0 ? '#111' : '#666', 'start', ci === 0 ? 500 : 400)).join('')}
  `).join('')}
  <!-- Add row -->
  ${rect(240, 109 + rows.length * 38, 1200, 32, '#fff', 0)}
  ${text(260, 129 + rows.length * 38, '+ New', 12, '#aaa')}
  ${text(720, 855, 'Notion · Database', 13, '#ccc', 'middle')}
</svg>`;
}

// ─── Notion: Sidebar ──────────────────────────────────────────────────────

function notionSidebarSVG() {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="1440" height="900" style="font-family:system-ui,sans-serif">
  ${rect(0, 0, 1440, 900, '#ffffff')}
  <!-- Wide sidebar for focus -->
  ${rect(0, 0, 320, 900, '#f7f7f5')}
  ${rect(320, 0, 1, 900, '#e9e9e7')}
  <!-- Workspace header -->
  ${rect(0, 0, 320, 44, '#f7f7f5')}
  ${text(16, 26, '🏢 Acme Corp', 13, '#333', 'start', 600)}
  <!-- Search -->
  ${rect(8, 52, 304, 28, '#ebebea', 4)}
  ${text(20, 70, '🔍  Search', 12, '#aaa')}
  <!-- Teamspace section -->
  ${rect(0, 90, 320, 1, '#e9e9e7')}
  ${text(12, 112, '◀ TEAMSPACES', 9, '#aaa', 'start', 700)}
  ${[
    { icon: '📋', name: 'Engineering', depth: 0, open: true },
    { icon: '📄', name: 'Roadmap Q2', depth: 1 },
    { icon: '📄', name: 'Architecture Docs', depth: 1 },
    { icon: '🗄️', name: 'Sprint Tracker', depth: 1 },
    { icon: '📋', name: 'Design', depth: 0, open: true },
    { icon: '📄', name: 'Design System', depth: 1 },
    { icon: '📄', name: 'Brand Guidelines', depth: 1 },
    { icon: '📋', name: 'Marketing', depth: 0 },
  ].map(({ icon, name, depth, open }, i) => `
    ${rect(0, 126 + i * 30, 320, 30, i === 1 ? '#ebebea' : 'transparent', 0)}
    ${text(12 + depth * 16, 145 + i * 30, open !== undefined ? (open ? '▼' : '▶') : '', 9, '#aaa')}
    ${text(28 + depth * 16, 145 + i * 30, `${icon} ${name}`, 12, depth === 0 ? '#333' : '#666', 'start', depth === 0 ? 600 : 400)}
  `).join('')}
  <!-- Private section -->
  ${rect(0, 380, 320, 1, '#e9e9e7')}
  ${text(12, 402, '▲ PRIVATE', 9, '#aaa', 'start', 700)}
  ${[
    { icon: '📝', name: 'My Notes', depth: 0 },
    { icon: '✅', name: 'Personal Tasks', depth: 0 },
    { icon: '📎', name: 'Reading List', depth: 0 },
  ].map(({ icon, name }, i) => `
    ${text(28, 426 + i * 30, `${icon} ${name}`, 12, '#666', 'start')}
  `).join('')}
  <!-- Add new -->
  ${rect(8, 530, 304, 28, 'transparent', 4)}
  ${text(20, 548, '+ New page', 12, '#aaa')}
  <!-- Main area preview -->
  ${rect(340, 60, 800, 24, '#e0e0e0', 4)}
  ${rect(340, 100, 600, 14, '#e0e0e0', 4)}
  ${[130, 150, 170].map(y => rect(340, y, 500 - y + 130, 10, '#ececec', 3)).join('')}
  ${text(720, 855, 'Notion · Sidebar', 13, '#ccc', 'middle')}
</svg>`;
}

// ─── Stripe: Dashboard ────────────────────────────────────────────────────

function stripeDashboardSVG() {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="1440" height="900" style="font-family:system-ui,sans-serif">
  ${rect(0, 0, 1440, 900, '#f6f9fc')}
  <!-- Left nav -->
  ${rect(0, 0, 200, 900, '#0a2540')}
  ${text(16, 36, '⚡ stripe', 18, '#635BFF', 'start', 800)}
  ${['Overview', 'Payments', 'Customers', 'Products', 'Reports', 'Radar', 'Connect', 'Billing', 'Issuing', 'Terminal'].map((item, i) => `
    ${rect(0, 60 + i * 40, 200, 36, i === 0 ? 'rgba(255,255,255,0.1)' : 'transparent', 0)}
    ${text(16, 82 + i * 40, item, 12, i === 0 ? '#fff' : '#94a3b8', 'start', i === 0 ? 600 : 400)}
  `).join('')}
  <!-- Top header -->
  ${rect(200, 0, 1240, 52, '#fff')}
  ${rect(200, 52, 1240, 1, '#e0e0e0')}
  ${text(220, 30, 'Overview', 16, '#0a2540', 'start', 600)}
  ${pill(1200, 14, 120, 24, '#635BFF')}
  ${text(1260, 30, '+ New', 12, '#fff', 'middle', 600)}
  <!-- Metric cards -->
  ${[
    { label: 'Gross volume', val: '€24,831', change: '+18%', x: 220 },
    { label: 'Net volume', val: '€22,140', change: '+14%', x: 530 },
    { label: 'New customers', val: '143', change: '+32%', x: 840 },
  ].map(({ label, val, change, x }) => `
    ${rect(x, 72, 290, 100, '#fff', 8)}
    ${text(x + 16, 98, label, 11, '#6b7280', 'start')}
    ${text(x + 16, 128, val, 22, '#0a2540', 'start', 700)}
    ${pill(x + 16, 140, 56, 18, '#dcfce7')}
    ${text(x + 44, 152, change, 11, '#16a34a', 'middle', 600)}
  `).join('')}
  <!-- Revenue chart -->
  ${rect(220, 190, 880, 280, '#fff', 8)}
  ${text(236, 216, 'Gross volume', 12, '#6b7280', 'start', 600)}
  ${text(236, 232, '€24,831', 20, '#0a2540', 'start', 700)}
  <!-- Chart bars -->
  ${Array.from({length: 28}, (_, i) => {
    const h = 40 + Math.abs(Math.sin(i * 0.7) * 160);
    return rect(248 + i * 30, 430 - h, 22, h, '#635BFF', 3) +
           rect(248 + i * 30, 430 - h, 22, h, 'rgba(99,91,255,0.2)', 3);
  }).join('')}
  ${rect(220, 440, 880, 1, '#e0e0e0')}
  <!-- Recent activity -->
  ${rect(1120, 72, 300, 400, '#fff', 8)}
  ${text(1136, 98, 'Recent activity', 12, '#6b7280', 'start', 600)}
  ${Array.from({length: 6}, (_, i) => `
    ${rect(1136, 112 + i * 56, 268, 48, '#f8fafc', 4)}
    ${text(1152, 134 + i * 56, `Card payment`, 12, '#0a2540', 'start')}
    ${text(1152, 150 + i * 56, `€${(120 + i * 37).toFixed(2)}`, 11, '#6b7280', 'start')}
    ${text(1380, 134 + i * 56, `${i + 1}m ago`, 11, '#6b7280', 'end')}
  `).join('')}
  ${text(720, 855, 'Stripe · Dashboard', 13, '#bbb', 'middle')}
</svg>`;
}

// ─── Stripe: Checkout ─────────────────────────────────────────────────────

function stripeCheckoutSVG() {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="1440" height="900" style="font-family:system-ui,sans-serif">
  ${rect(0, 0, 1440, 900, '#f6f9fc')}
  <!-- Two-column checkout -->
  ${rect(160, 60, 520, 780, '#fff', 12)}
  ${rect(720, 60, 560, 780, '#fff', 12)}
  <!-- Left: Order summary -->
  ${text(196, 104, 'Order summary', 14, '#0a2540', 'start', 600)}
  ${rect(196, 120, 448, 120, '#f8fafc', 8)}
  ${rect(196, 120, 80, 80, '#635BFF', 8)}
  ${text(292, 160, 'Pro Plan · Monthly', 13, '#0a2540', 'start', 600)}
  ${text(292, 178, 'Up to 10 users · Unlimited projects', 11, '#6b7280', 'start')}
  ${text(196, 268, 'Subtotal', 12, '#6b7280', 'start')}
  ${text(624, 268, '€49.00', 12, '#0a2540', 'end')}
  ${text(196, 290, 'Tax (20%)', 12, '#6b7280', 'start')}
  ${text(624, 290, '€9.80', 12, '#0a2540', 'end')}
  ${rect(196, 304, 448, 1, '#e0e0e0', 0)}
  ${text(196, 325, 'Total', 14, '#0a2540', 'start', 700)}
  ${text(624, 325, '€58.80', 16, '#0a2540', 'end', 700)}
  <!-- Right: Payment form -->
  ${text(756, 104, 'Payment details', 14, '#0a2540', 'start', 600)}
  ${text(756, 135, 'Email', 11, '#374151', 'start', 500)}
  ${rect(756, 148, 488, 36, '#fff', 4)}
  ${rect(756, 148, 488, 36, '#e0e0e0', 4, 'stroke')}
  ${text(756, 208, 'Card information', 11, '#374151', 'start', 500)}
  ${rect(756, 220, 488, 36, '#fff', 4)}
  ${rect(756, 220, 488, 36, '#635BFF', 4, 'stroke')}
  ${text(772, 242, '4242 4242 4242 4242', 13, '#0a2540', 'start')}
  ${rect(756, 258, 236, 36, '#fff', 4)}
  ${rect(756, 258, 236, 36, '#e0e0e0', 4, 'stroke')}
  ${text(772, 280, '12/27', 13, '#0a2540', 'start')}
  ${rect(1004, 258, 240, 36, '#fff', 4)}
  ${rect(1004, 258, 240, 36, '#e0e0e0', 4, 'stroke')}
  ${text(1020, 280, 'CVC', 13, '#aaa', 'start')}
  <!-- Inline error -->
  ${text(756, 308, '✓ Valid card number', 11, '#16a34a', 'start')}
  <!-- Submit button -->
  ${rect(756, 700, 488, 48, '#635BFF', 8)}
  ${text(1000, 730, 'Pay €58.80', 14, '#fff', 'middle', 700)}
  ${text(720, 855, 'Stripe · Checkout', 13, '#bbb', 'middle')}
</svg>`;
}

// ─── Stripe: Payment Links ────────────────────────────────────────────────

function stripePaymentLinksSVG() {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="1440" height="900" style="font-family:system-ui,sans-serif">
  ${rect(0, 0, 1440, 900, '#f6f9fc')}
  ${rect(0, 0, 200, 900, '#0a2540')}
  ${text(16, 36, '⚡ stripe', 18, '#635BFF', 'start', 800)}
  ${rect(200, 0, 1240, 52, '#fff')}
  ${rect(200, 52, 1240, 1, '#e0e0e0')}
  ${text(220, 30, 'Create payment link', 16, '#0a2540', 'start', 600)}
  <!-- Form left column -->
  ${rect(220, 72, 520, 780, '#fff', 8)}
  ${text(240, 112, 'Product', 11, '#374151', 'start', 600)}
  ${rect(240, 124, 480, 48, '#f8fafc', 6)}
  ${text(256, 152, '+ Add product', 13, '#635BFF', 'start')}
  ${text(240, 192, 'Price', 11, '#374151', 'start', 600)}
  ${rect(240, 204, 480, 36, '#fff', 4)}
  ${rect(240, 204, 480, 36, '#e0e0e0', 4)}
  ${text(256, 226, '€ 49.00', 13, '#0a2540', 'start')}
  ${text(240, 262, 'Currency', 11, '#374151', 'start', 600)}
  ${rect(240, 274, 480, 36, '#fff', 4)}
  ${rect(240, 274, 480, 36, '#e0e0e0', 4)}
  ${text(256, 296, '🇪🇺  EUR — Euro', 13, '#0a2540', 'start')}
  ${rect(240, 330, 480, 28, '#f3f4f6', 4)}
  ${text(256, 348, '▼ Advanced options', 12, '#635BFF', 'start')}
  ${text(240, 390, 'After payment', 11, '#374151', 'start', 600)}
  ${['Show confirmation page', 'Redirect to URL', 'Don\'t show anything'].map((opt, i) => `
    <circle cx="252" cy="${415 + i * 32}" r="7" fill="${i === 0 ? '#635BFF' : '#fff'}" stroke="${i === 0 ? '#635BFF' : '#d0d0d0'}" stroke-width="2"/>
    ${text(266, 420 + i * 32, opt, 12, '#374151', 'start')}
  `).join('')}
  ${rect(240, 720, 480, 44, '#635BFF', 8)}
  ${text(480, 748, 'Create link', 14, '#fff', 'middle', 700)}
  <!-- Live preview right -->
  ${rect(780, 72, 620, 780, '#fff', 8)}
  ${text(800, 102, 'Preview', 11, '#6b7280', 'start', 600)}
  ${rect(830, 120, 520, 640, '#f6f9fc', 8)}
  ${rect(830, 120, 520, 1, '#e0e0e0', 0)}
  ${text(1090, 172, 'Pro Plan', 18, '#0a2540', 'middle', 700)}
  ${text(1090, 200, '€49.00 / month', 14, '#6b7280', 'middle')}
  ${rect(870, 230, 440, 36, '#635BFF', 8)}
  ${text(1090, 252, 'Subscribe', 13, '#fff', 'middle', 700)}
  ${text(1090, 290, '— or pay with card —', 11, '#aaa', 'middle')}
  ${rect(870, 308, 440, 32, '#fff', 4)}
  ${rect(870, 308, 440, 32, '#e0e0e0', 4)}
  ${text(886, 328, 'Card number', 11, '#aaa', 'start')}
  ${text(720, 855, 'Stripe · Payment Links', 13, '#bbb', 'middle')}
</svg>`;
}

// ─── Generic fallback ──────────────────────────────────────────────────────

function genericSVG(screen) {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="1440" height="900" style="font-family:system-ui,sans-serif">
  ${rect(0, 0, 1440, 900, SURFACE)}
  ${text(720, 440, screen.label, 24, MUTED, 'middle', 600)}
  ${text(720, 472, 'Run scripts/fetch-screenshots.js to capture real screenshots', 13, FAINT, 'middle')}
</svg>`;
}
