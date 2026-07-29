renderShell('search');

const RESULTS = [
  {
    title: 'Change-of-control triggers — Meridian Pharma / Series C',
    meta: 'Meridian Pharma · S. Cole · 3 weeks ago · 9 citations',
    prior: true,
    status: 'Pending review',
    body: [
      'The Series C investment agreement\'s change-of-control clause is triggered by any transaction resulting in a third party acquiring more than 40% of voting equity, including a reverse triangular merger.<span class="citation-badge">4</span><span class="citation-badge">9</span>',
      'This diverges from Meridian\'s earlier Series B terms, which used a 50% threshold — the lower bar meaningfully increases deal friction on a future acquisition.<span class="citation-badge">2</span>',
    ],
    trace: [
      { text: 'Threshold defined at §7.2 of the Series C SPA', source: 'Series C SPA — Meridian Pharma.pdf, p.14', verified: true, comment: '' },
      { text: 'Series B comparison pulled from prior firm memo', source: 'Meridian Series B — CoC memo.docx', verified: true, comment: 'Good catch on the delta — flag this in the closing memo too.' },
      { text: 'Reverse triangular merger language', source: 'Series C SPA — Meridian Pharma.pdf, p.15', verified: false, comment: '' },
    ],
  },
  {
    title: 'Change-of-control carve-outs — biotech licensing deals',
    meta: 'Northbridge Holdings · M. Turner · 2 months ago · 6 citations',
    prior: true,
    status: 'Verified by M. Turner',
    body: [
      'Standard carve-out language across three recent biotech licensing deals excludes internal reorganizations and financings from the change-of-control definition, provided ultimate beneficial ownership is unchanged.<span class="citation-badge">3</span><span class="citation-badge">11</span>',
    ],
    trace: [
      { text: 'Carve-out precedent across 3 deals', source: 'Licensing precedent set — Northbridge.pdf', verified: true, comment: '' },
      { text: 'UBO continuity requirement', source: 'License Agreement §4.3', verified: true, comment: '' },
    ],
  },
  {
    title: 'Pharma acquisition — assignment vs. change-of-control analysis',
    meta: 'Amend v Delta IP Litigation · A. Rowe · 4 months ago · 4 citations',
    prior: false,
    status: 'Draft',
    body: [
      'Whether an acquisition triggers assignment restrictions versus change-of-control provisions turns on whether the surviving entity is the original contracting party.<span class="citation-badge">1</span>',
    ],
    trace: [
      { text: 'Surviving-entity test applied', source: 'Delaware merger analysis — internal memo.docx', verified: false, comment: '' },
    ],
  },
];

let active = 0;

function renderResults() {
  const col = document.getElementById('resultsCol');
  col.innerHTML = RESULTS.map((r, i) => `
    <div class="result-card${i === active ? ' active' : ''}" data-i="${i}">
      <div class="rc-title">${r.title}</div>
      <div class="rc-meta">${r.meta}</div>
      ${r.prior ? '<span class="rc-prior">PRIOR POSITION</span>' : ''}
    </div>
  `).join('');
  col.querySelectorAll('.result-card').forEach((el) => {
    el.addEventListener('click', () => { active = Number(el.dataset.i); render(); });
  });
}

function renderReview() {
  const r = RESULTS[active];
  const col = document.getElementById('reviewCol');
  col.innerHTML = `
    <div class="review-head">
      <span class="review-title">${r.title}</span>
      <span class="status-pill ${r.status.startsWith('Verified') ? 'status-pill--promoted' : 'status-pill--ephemeral'}">
        <span class="dot"></span> ${r.status}
      </span>
    </div>
    <div class="review-body">
      ${r.body.map((p) => `<p>${p}</p>`).join('')}
      <div class="trace-list">
        ${r.trace.map((t) => `
          <div class="trace-item">
            <span class="ti-icon">${t.verified
              ? '<svg width="15" height="15" viewBox="0 0 15 15" fill="none"><circle cx="7.5" cy="7.5" r="6.5" stroke="currentColor" stroke-width="1.2"/><path d="M4.7 7.6l1.8 1.8 3.8-3.9" stroke="currentColor" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"/></svg>'
              : '<svg width="15" height="15" viewBox="0 0 15 15" fill="none" style="color:var(--muted)"><circle cx="7.5" cy="7.5" r="6.5" stroke="currentColor" stroke-width="1.2" stroke-dasharray="2 2"/></svg>'}</span>
            <span>
              <div>${t.text}</div>
              <div class="ti-source">${t.source}</div>
              ${t.comment ? `<div class="ti-comment">${t.comment}</div>` : ''}
            </span>
          </div>
        `).join('')}
      </div>
      <div class="chat-composer review-composer">
        <div class="cc-text" style="color:var(--muted)">Leave a note for the associate, or verify a specific claim above…</div>
        <div class="cc-toolbar">
          <span class="cc-mode">Verify &amp; Comment ▾</span>
          <span class="cc-send">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M2 7h10M8 3l4 4-4 4" stroke="#fff" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>
          </span>
        </div>
      </div>
    </div>
  `;
}

function render() { renderResults(); renderReview(); }
render();
