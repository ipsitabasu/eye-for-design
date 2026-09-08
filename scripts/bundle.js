const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');

function read(rel) {
  return fs.readFileSync(path.join(root, rel), 'utf8');
}

// Remove ES module import/export syntax for inline use
function strip(src, varName) {
  let out = src
    .replace(/^import\s+.+?from\s+'.+?';?\s*$/gm, '')
    .replace(/^export\s+default\s+/m, `const ${varName} = `)
    .replace(/^export\s+function\s+/gm, 'function ')
    .replace(/^export\s+const\s+/gm, 'const ')
    .trim();
  return out;
}

const style    = read('style.css');
const navJs    = strip(read('components/nav.js'), '_nav');
const viewerJs = strip(read('components/viewer.js'), '_viewer');
const panelJs  = strip(read('components/panel.js'), '_panel');
const linearJs = strip(read('data/linear.js'), 'linearData');
const duoJs    = strip(read('data/duolingo.js'), 'duolingoData');
const notionJs = strip(read('data/notion.js'), 'notionData');
const stripeJs = strip(read('data/stripe.js'), 'stripeData');
const harveyJs = strip(read('data/harvey.js'), 'harveyData');
const appJs    = read('app.js')
  .replace(/^import\s+.+?from\s+'.+?';?\s*$/gm, '')
  .trim();

const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Eye for Design — UX Teardowns</title>
  <style>
${style}
  </style>
</head>
<body>

  <header class="app-nav" id="app-nav">
    <a class="brand" href="#">
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
        <circle cx="10" cy="10" r="9" stroke="currentColor" stroke-width="1.5"/>
        <circle cx="10" cy="10" r="3.5" fill="currentColor"/>
        <line x1="10" y1="1" x2="10" y2="4.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
        <line x1="10" y1="15.5" x2="10" y2="19" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
        <line x1="1" y1="10" x2="4.5" y2="10" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
        <line x1="15.5" y1="10" x2="19" y2="10" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
      </svg>
      Eye for Design
    </a>
    <nav class="app-switcher" id="app-switcher" aria-label="App switcher"></nav>
  </header>

  <div class="screen-nav-wrapper">
    <nav class="screen-nav" id="screen-nav" aria-label="Screen navigation"></nav>
  </div>

  <main class="layout">
    <div class="viewer-column">
      <div class="viewer-context" id="viewer-context"></div>
      <div class="viewer-frame" id="viewer-frame">
        <img id="viewer-img" src="" alt="App screenshot" />
        <div class="viewer-skeleton" id="viewer-skeleton" aria-hidden="true"></div>
      </div>
    </div>
    <aside class="side-panel" id="side-panel">
      <div class="panel-detail" id="panel-detail">
        <div class="panel-empty-state">
          <svg width="40" height="40" viewBox="0 0 40 40" fill="none" aria-hidden="true">
            <circle cx="20" cy="20" r="16" stroke="var(--app-accent)" stroke-width="1.5" stroke-dasharray="5 3" opacity="0.5"/>
            <circle cx="20" cy="20" r="6" fill="var(--app-accent)" opacity="0.2"/>
            <text x="20" y="24" text-anchor="middle" font-size="10" font-weight="700" fill="var(--app-accent)" opacity="0.8" font-family="system-ui,sans-serif">1</text>
          </svg>
          <p>Click a numbered marker on the screenshot to explore the UX decision behind it.</p>
        </div>
      </div>
      <div class="panel-index" id="panel-index"></div>
    </aside>
  </main>

  <script>
(function () {
'use strict';

// ── Data files ─────────────────────────────────────────────────────────────

${linearJs}

${duoJs}

${notionJs}

${stripeJs}

${harveyJs}

const apps = [linearData, duolingoData, notionData, stripeData, harveyData];
const appsById = Object.fromEntries(apps.map(function(a) { return [a.id, a]; }));

// ── Components ─────────────────────────────────────────────────────────────

${navJs}

${viewerJs}

${panelJs}

// ── App router ─────────────────────────────────────────────────────────────

${appJs}

})();
  </script>
</body>
</html>`;

const outPath = path.join(root, 'eye-for-design.html');
fs.writeFileSync(outPath, html, 'utf8');
console.log('Bundled: eye-for-design.html (' + Math.round(html.length / 1024) + ' KB)');
