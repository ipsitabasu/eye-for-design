renderShell('workspace');

const promoteBtn = document.getElementById('promoteBtn');
const statusPill = document.getElementById('statusPill');
const promoteNote = document.getElementById('promoteNote');
let promoted = false;

promoteBtn.addEventListener('click', () => {
  promoted = !promoted;
  if (promoted) {
    statusPill.className = 'status-pill status-pill--promoted';
    statusPill.innerHTML = '<span class="dot"></span> Captured — saved to Vault / Acme v. GlobalCorp / Memos';
    promoteBtn.textContent = 'Promoted ✓';
    promoteNote.textContent = 'Now indexed in the knowledge graph with full provenance — searchable in Phase 2, reviewable by a partner.';
  } else {
    statusPill.className = 'status-pill status-pill--ephemeral';
    statusPill.innerHTML = '<span class="dot"></span> Ephemeral — in thread';
    promoteBtn.textContent = 'Promote to artifact';
    promoteNote.textContent = 'Auto-promotes on first edit, export, share, or matter attachment — or when the classifier scores this high enough on its own.';
  }
});

document.getElementById('exportBtn').addEventListener('click', () => {
  if (!promoted) promoteBtn.click(); // exporting is a promotion signal, per the design doc
});
