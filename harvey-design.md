# Harvey — Design System

> **Confidence note:** This file combines written research (Harvey's own design-team blog posts, press coverage, typeface databases — this session can't render harvey.ai directly) with **real screenshots** the user provided, covering: (1) the `/platform/agents` marketing page (nav, hero, one embedded Agents-view screenshot), (2) the Assistant answer view mid-conversation (follow-up suggestions, chat composer, version row), (3) a split Assistant + Word-style document editor view (citations, sources card, glossary tooltip, full redline toolbar), (4) an email/Outlook add-in analysis panel, and (5) the actual **Vault landing page** with its global app sidebar (Assistant/Vault/Workflows/History/Library/Guidance nav, org switcher, project grid). Values pulled from screenshots are marked **"confirmed — screenshot."** Areas still not covered by any screenshot (the Workflow builder canvas, Library/History internals, inside a Vault project, mobile, pricing) remain **"estimated"** or "inferred" — see `Known Gaps`.

## Overview

Harvey reads as an **editorial, high-contrast, trust-first legal brand** on its marketing site, and a **plain, white, document-dense productivity tool** in the actual product — the two are deliberately different registers. Marketing (nav, hero) sits on a warm cream canvas; the Assistant and document-editor views confirmed here are **pure white**, consistent with the "Shadcn-derived neutral React base" Harvey's own design-system blog post describes. The identity was shaped by Portland studio **Geist** with brand consultant Shawn Farsai; web build by **Basement Studio**. The house serif, **TWK Ghost** (WELTKERN), carries the wordmark and marketing headlines only — every in-product screenshot confirms body/UI text is a clean grotesque sans throughout, with no serif anywhere in the actual product.

The product's defining trait is **citation traceability made literally visible**, confirmed directly now: every substantive claim in an Assistant answer carries small gray superscript **citation badges** (e.g. "¹³ ¹⁷ ³⁸") linking back to source material, and every answer ends in a **Sources card** ("Web search and files — 16 cited"). The Agents view's Progress panel and this citation-badge system are two expressions of the same underlying principle — nothing Harvey generates is presented without a visible trail back to its source.

The redline/drafting workflow (confirmed via the split-panel screenshot) pairs the Assistant conversation on the left with a **full Word-style rich-text editor** on the right — paragraph style, bold/italic/underline/strike, lists, alignment, font, link, and undo/redo, plus a "Show edits" toggle and version switcher ("Version 2"). A nice, specific, confirmed detail: hovering an entity name in a drafted document (e.g. "Sterling Group") surfaces a **glossary tooltip** — a small white card with a bold title and a plain-language definition — so a lawyer never has to leave the document to check what a referenced company or term is.

**Key characteristics (confirmed — screenshot):**
- **Marketing vs. product canvas split.** Marketing site: warm cream (~#F7F5F0). Assistant + document editor: pure white (#FFFFFF). This is a real, deliberate distinction, not an inconsistency.
- Near-black ink text; solid-black primary buttons/send-actions; a black-filled `Request a Demo` marketing CTA and a black circular chat-send button share the same near-black fill.
- **TWK Ghost**-style high-contrast serif only in the wordmark and marketing hero headline. Zero serif usage anywhere in the product screenshots (Assistant, follow-ups, sources, document editor) — all grotesque sans.
- One sparing accent — warm terracotta/orange, seen only in the marketing "spark" icon; not present anywhere in the confirmed product screenshots (which stay strictly black/white/gray).
- **Citation badges**: small gray rounded-square superscript chips carrying reference numbers, inline in Assistant answer text.
- **Sources card**: bordered card with a globe icon, "Web search and files" label, and an "N cited" count.
- **Chat composer**: rounded light-gray card (not white, not cream — a third, warmer neutral) holding the prompt text, an icon row (attach, connect/share, magic-wand), a mode selector, and a circular send button that is **black when the field has content, muted gray when empty** — a real, confirmed disabled/enabled state pair.
- **Mode selector** appears in two confirmed forms: a simple "Chat ▾" dropdown in the plain Assistant composer, and a three-way **Auto / Edit / Answer** segmented control in the split editor view.
- **Version history row**: a bordered pill showing "Version 1" (bold) + a relative timestamp ("2 minutes ago"), plus a "Version 2" label with a history icon in the document editor's own toolbar.
- **Glossary tooltip**: hovering a pale-blue-highlighted entity name in a drafted document shows a small white card — bold title + plain-language definition — floating with a subtle border/shadow.
- **Response toolbar**: every AI answer/document gets a consistent small gray icon-row underneath — Copy, Export, Rewrite, Open in editor, plus thumbs up/down at the far right.
- The in-product Agents view: dark near-black icon sidebar, white main panel, tan/beige user-message bubble, unstyled-gray assistant prose, a right-hand **Progress** checklist with strikethrough-on-complete, and an **Outputs/Sources** segmented toggle.
- A floating **"Ask Harvey"** pill (avatar + label + accent spark icon) bottom-right of the Agents view, elevated with a drop shadow.
- Full-width black **announcement bar** above the marketing nav.
- Two distinct radius scales: ~20px on the hero product-mockup card and the chat composer, vs. ~8–10px on buttons/tabs — "hero/container" surfaces round more generously than "control" surfaces.

**Key characteristics (sourced — text research, not yet visually confirmed):**
- All six top-level nav destinations are now confirmed to exist (**Assistant, Vault, Workflows, History, Library, Guidance**), plus the **Agents** delegation surface. **Vault's landing page** is fully confirmed (entry-point cards, tabbed/searchable project grid); its internal per-project view, the **Workflow builder canvas**, and **History/Library** internals are still text-research-only.
- Vault holds real, large document sets per project (confirmed real examples run from ~4,000 to ~92,000 files), organized as either a plain Vault project, a "Knowledge base," or a "Shared" project — three distinct types with different card iconography.
- Harvey also ships an **email client add-in** (confirmed via an Outlook-style analysis panel): it reads an email thread plus attached redlines, produces a structured bullet-point analysis, and offers a "Send to Vault" suggestion to cross-reference with other files.
- Design tokens are semantic/intent-based ("foreground-base" not "neutral-400"), part of a January 2026 design-system rebuild on a Shadcn-derived React base — the confirmed all-white, sans-only, restrained-accent product UI is consistent with this.
- Full mobile app (iOS/Android): dictation, "Magic Prompt," Vault search, scan-and-upload, audio-to-transcript.

## Colors

### Marketing surface
- **Canvas** (`{colors.canvas}` — ~#F7F5F0 *confirmed*): Warm cream, nav + hero only.
- **Announcement Bar** (`{colors.bar-dark}` — ~#0E0D0B *confirmed*): Full-width black bar above nav.
- **Spark Accent** (`{colors.accent}` — ~#DB5A35 *confirmed*): Terracotta/orange, marketing-only — the Agents view's floating chip icon. Not observed anywhere in the Assistant or editor screenshots.

### Product surface
- **Product White** (`{colors.surface}` — #FFFFFF *confirmed*): Assistant conversation view, Sources card, document editor — the actual product's base surface, distinct from marketing's cream.
- **Sidebar Dark** (`{colors.sidebar-dark}` — ~#16181D *confirmed*): Narrow icon rail in the Agents view.
- **Composer Surface** (`{colors.composer-bg}` — ~#F5F3EE *confirmed*): Rounded card background for the chat input — a third neutral, warmer than product-white, cooler/lighter than marketing canvas.
- **Citation Badge** (`{colors.badge-bg}` — ~#EEEDE8 *confirmed*): Light gray rounded-square chip behind inline citation numbers.
- **Chat Bubble (user)** (`{colors.bubble-user}` — ~#ECE5DA *confirmed*): Warm tan bubble, Agents-view user turns.
- **Glossary Highlight** (`{colors.glossary-highlight}` — ~#DCE8F5 *confirmed*): Pale-blue underline/background on entity terms that trigger a definition tooltip.

### Text
- **Ink** (`{colors.ink}` — ~#17160F *confirmed*): Headlines, wordmark, body emphasis, bold labels ("Bottom Line," "Sources," "Version 1").
- **Body** (`{colors.body}` — ~#302E28 *confirmed*): Assistant answer prose, follow-up question text, document editor body copy.
- **Muted** (`{colors.muted}` — ~#8B8576 *confirmed*): Breadcrumbs, toolbar labels (Copy/Export/Rewrite), timestamps, "N cited" subtext, composer placeholder text ("Ask Harvey a question…").

### Buttons & interactive states
- **Primary fill** (`{colors.primary}` — ~#17160F *confirmed*): Black CTA fill (marketing `Request a Demo`) and the chat send-button's **active** state.
- **Send button (disabled/empty)** (`{colors.control-disabled}` — ~#C9C6BC *confirmed*): Muted gray circular send button when the composer is empty — a real, distinguishable disabled state from the black active one.
- **Mode selector (active segment)** (`{colors.segment-active}` — ~#2B2A26 *confirmed*): Dark pill behind the selected mode ("Auto") in the Auto/Edit/Answer control.
- **On Primary** (`{colors.on-primary}` — #FFFFFF *confirmed*): White text/icons on black fills.
- **Secondary border** (`{colors.border-strong}` — ~#17160F *confirmed*): Black 1px outline, marketing `Login` button.

### Other confirmed
- **Progress check** (`{colors.progress-done}` — ~#3F8F5F *confirmed, lower confidence*): Green checkmark/strikethrough, Agents Progress panel.
- **Hairline** (`{colors.hairline}` — ~#E6E1D5 *confirmed*): Dividers between follow-up rows, chat-column/Progress-panel split, editor toolbar icon groups, sidebar/content split.
- **Editor toolbar icon** (`{colors.icon-muted}` — ~#6B6860 *confirmed*): Gray icon color in the document editor's formatting toolbar.
- **Status dot** (`{colors.status-dot}` — ~#3B6FD9 *confirmed, moderate confidence*): Small blue dot beside some Vault project names — exact meaning unconfirmed (possibly "has new activity").
- **Card icon tile** (`{colors.icon-tile-bg}` — ~#F1EFEA *confirmed*): Flat gray background behind a Vault project card's type icon.
- **Active nav highlight** (`{colors.nav-active-bg}` — ~#F0EEE8 *confirmed*): Soft rounded-rect background behind the active sidebar nav item.

### Semantic (still inferred — not visible in any screenshot)
- **Warning** (`{colors.semantic-warning}` — ~#B8791F *estimated*)
- **Error** (`{colors.semantic-error}` — ~#C0392B *estimated*)

## Typography

### Font Family
**TWK Ghost** (WELTKERN) — high-contrast serif — confirmed in the wordmark and marketing hero headline only. **Zero serif usage confirmed anywhere in the product** (Assistant, follow-ups, Sources, document editor, Agents view) — a clean grotesque sans (Harvey's material names **ABC Diatype**, Dinamo) carries all of it, including the drafted email body inside the Word-style editor.

### Hierarchy

| Token | Approx. Size | Weight | Confidence | Use |
|---|---|---|---|---|
| `{typography.display-hero}` | ~72–80px | TWK Ghost | confirmed | Marketing hero headline |
| `{typography.wordmark}` | ~24px | TWK Ghost | confirmed | "Harvey" nav logo |
| `{typography.nav-link}` | ~15px | Sans, regular | confirmed | Marketing nav |
| `{typography.section-label}` | ~17px | Sans, regular, gray | confirmed | "Follow-ups" section header |
| `{typography.answer-body}` | ~15–16px | Sans, regular | confirmed | Follow-up question rows, Assistant answer prose, editor document body |
| `{typography.toolbar-label}` | ~13px | Sans, regular, gray | confirmed | Copy / Export / Rewrite / Open in editor |
| `{typography.caption}` | ~12–13px | Sans, regular, gray | confirmed | Breadcrumb, timestamps, "N cited," "4 of 4 steps" |
| `{typography.citation-badge}` | ~10–11px | Sans, medium | confirmed | Inline superscript citation numbers |
| `{typography.composer-placeholder}` | ~14–15px | Sans, regular, gray | confirmed | "Ask Harvey a question…" |
| `{typography.page-title}` | ~28–30px | Sans, bold | confirmed | "Vault" page header |
| `{typography.page-subtitle}` | ~15px | Sans, regular, gray | confirmed | "Upload, store, and analyze thousands of documents" |
| `{typography.card-title}` | ~15–16px | Sans, bold | confirmed | Entry-point and project card titles |
| `{typography.nav-item}` | ~14px | Sans, regular/medium | confirmed | Sidebar nav labels |
| `{typography.mono}` | ~13px *estimated* | Sans Mono | estimated | Not directly observed; inferred from citation-heavy product |

### Principles
- **Serif is 100% marketing-only** — this is now confirmed across three separate product screenshots, not just inferred from the earlier single hero image.
- **Muted gray is used heavily and consistently** for anything secondary: timestamps, toolbar labels, placeholders, breadcrumbs, citation subtext — the product leans on a single muted tone rather than multiple gray steps.

### Note on Font Substitutes
Both TWK Ghost and ABC Diatype are licensed. Substitutes: **Source Serif 4** / **Freight Text** for TWK Ghost; **Inter** / **IBM Plex Sans** for the grotesque UI role, **IBM Plex Mono** / **JetBrains Mono** for any monospace need.

## Layout

- **Top announcement bar**: full-width black, ~40px, centered white text + link + close icon. *(confirmed)*
- **Nav bar**: cream, ~80px, logo far left, links centered, actions right. *(confirmed)*
- **Hero**: asymmetric split — serif headline left (~55–60%), subhead + CTA right (~35–40%), top-aligned. *(confirmed)*
- **Assistant answer column**: single centered reading column, generous max-width (~900–960px based on screenshot proportions), comfortable line-length for long-form legal analysis. *(confirmed)*
- **Follow-up list**: full-width rows within the answer column, hairline-divided, no card treatment — plain list. *(confirmed)*
- **Chat composer**: docked at the bottom of the answer column, not full-width of viewport — matches the answer column's width. *(confirmed)*
- **Split editor view**: two-pane layout — Assistant conversation left (~45–50% width), Word-style document editor right (~50–55%), each independently scrollable, no visible resize handle. *(confirmed)*
- **In-product Agents view**: narrow icon sidebar (~48–56px) + flexible chat column + fixed right panel (~280–320px) for Progress/Context. *(confirmed)*
- **Base spacing unit**: not precisely measurable; 4px/8px assumed as a standard default. *(estimated)*

## Elevation & Depth

| Level | Treatment | Use | Confidence |
|---|---|---|---|
| Flat (canvas) | `{colors.canvas}`/`{colors.surface}`, no shadow | Nav, hero copy, Assistant answer column, follow-up rows | confirmed |
| Hairline card | 1px `{colors.hairline}` | Row dividers, chat/Progress-panel split, editor toolbar groups | confirmed |
| Soft-card | Light fill, subtle border, small shadow | Chat composer, Sources card, glossary tooltip, version-history row | confirmed |
| **Hero-elevated** | Large radius + drop shadow + dark textured backdrop | Marketing hero product-mockup card | confirmed |
| **Floating-elevated** | Pill + drop shadow | "Ask Harvey" chip | confirmed |

Elevation is used more broadly in the product than the first screenshot suggested — small soft-shadowed cards (composer, sources, tooltips) are a real, recurring pattern, not just the two "hero" exceptions noted earlier. The distinction that holds up: **nothing gets a heavy shadow**, everything stays subtle except the two marketing-hero exceptions.

## Shapes

| Token | Value | Use | Confidence |
|---|---|---|---|
| `{rounded.control}` | ~8–10px | Buttons, context tabs (Outputs/Sources), mode-selector segments | confirmed |
| `{rounded.hero-card}` | ~20px | Marketing hero product-mockup card, chat composer card | confirmed |
| `{rounded.pill}` | full/9999px | Floating Ask Harvey chip, send button (circular), citation badges (rounded-square, not full pill) | confirmed |
| `{rounded.bubble}` | ~12–14px | Chat user-message bubble, glossary tooltip card | confirmed |
| `{rounded.badge}` | ~4–6px | Citation superscript chips, "N cited" source card | confirmed |

## Components

### Marketing
**`announcement-bar`**, **`top-nav`**, **`hero-band`**, **`hero-product-card`**, **`button-primary`**, **`button-secondary`** — see prior confirmed descriptions; unchanged by the new screenshots.

### Assistant (confirmed — new)
**`follow-up-list`** — Plain, hairline-divided list of suggested next questions below an Assistant answer. No card/bubble treatment — just rows.

**`citation-badge`** — Small gray rounded-square superscript chip carrying one or more reference numbers (e.g. "¹³ ¹⁷ ³⁸"), inline within answer prose. This is Harvey's confirmed signature trust affordance — every non-trivial claim gets one.

**`sources-card`** — Bordered card below an answer: globe icon + "Web search and files" label (bold) + "N cited" count (muted). Summarizes the citation badges into one clickable entry point.

**`response-toolbar`** — Small gray icon row under every AI output: Copy, Export, Rewrite, Open in editor, plus thumbs up/down at the far right. Consistent across the plain Assistant view and the split editor view.

**`chat-composer`** — Rounded, light-neutral card holding the prompt textarea, an icon row (attach / connect-share / magic-wand), a mode selector, and a circular send button. **Two confirmed button states**: black-filled when text is present, muted-gray when empty.

**`mode-selector`** — Two confirmed variants: a simple "Chat ▾" dropdown (plain Assistant composer) and a three-way **Auto / Edit / Answer** segmented control with a dark active-pill (split editor composer).

**`version-row`** — Bordered pill: bold "Version N" label + relative timestamp, right-aligned. Used for prompt/response version history.

### Document Editor (confirmed — was previously "documented but not visually confirmed" as `redline-panel`)
**`document-editor-toolbar`** — Full rich-text formatting bar: back arrow, paragraph-style dropdown, Bold/Italic/Underline/Strikethrough, ordered/unordered list, alignment (left/center/right/justify), font ("Aa"), link, cut/copy/paste, undo/redo — grouped with hairline dividers. Right-aligned: "Show edits" toggle, "Version N" + history icon, close icon.

**`glossary-tooltip`** — A pale-blue-highlighted entity name (e.g. a company mentioned in a drafted document) triggers a small white card on hover: bold title ("What is Sterling Group? | SterlingGroup.com") + a plain-language gray description paragraph. Subtle border and shadow.

### In-product (Agents delegation view)
**`agent-sidebar`**, **`chat-thread`** (Agents variant), **`progress-panel`**, **`context-tabs`**, **`ask-harvey-chip`** — unchanged from prior confirmation; see Overview.

### App Shell / Global Navigation (confirmed — new)
**`app-sidebar`** — The persistent left rail across the main app (distinct from the Agents view's dark icon-only rail — this one is light/labeled). White background, hairline right border. Top-to-bottom: an **org switcher** (small dark square logomark with a white initial + bold org name "Whitford Lane" + dropdown chevron), a full-width **`button-create`** ("+ Create" — white fill, black 1px border, black text; notably the *outline* button style, not the solid-black primary used on marketing CTAs), then the primary nav list — **Assistant, Vault, Workflows, History, Library, Guidance** — each an icon + label row. The active item (Vault) gets a soft light-gray rounded-rect background, and expands inline to show pinned/recent items as plain indented text rows (no icons) — confirmed example: "Statements (A&W)," "Delta Supply," "Supply Agreements." A muted "Help" row anchors the bottom.

**`page-header`** — Bold page title (~28–30px, e.g. "Vault") + a smaller gray subtitle line beneath it (e.g. "Upload, store, and analyze thousands of documents"). Used at the top of each top-level section.

**`page-tabs`** — A second, distinct tab style from the Agents view's pill-segmented `context-tabs`: plain text tabs with no box/pill — active tab is bold black, inactive tabs are muted gray, no underline observed. Confirmed example: "All projects / Your Projects / Shared with you."

**`search-input`** — Bordered, rounded (~8px) input with a leading magnifying-glass icon and gray placeholder text ("Search"), right-aligned opposite the page tabs.

### Vault (confirmed — new)
**`entry-point-card`** — Two side-by-side bordered cards at the top of the Vault landing page, each: a circular icon badge, a bold title, and a muted description line. Confirmed pair: **"Create project"** ("Upload a new collection of files or folders") and **"Create knowledge base"** ("Distribute a repository of files to your organization").

**`project-card`** — Grid card (4-up on desktop): a large flat-gray icon/illustration tile on top (icon varies by project type — plain document-stack for a Knowledge base, a folder-with-people glyph for a Shared project, a plain folder for a standard Vault project), then below: a bold project name (some carry a small blue status dot beside the name), an overflow "···" menu top-right, and a muted metadata line ("`N files` · `Type`"). Confirmed real examples: "M&A (US)" (26,593 files · Knowledge base), "Cross-Border Tax Strategies" (14,977 files · Knowledge base), "Avenor AI – Series B Financing" (8,201 files · Shared), "Amend v Delta IP Litigation" (36,897 files · Shared), "Northbridge Holdings" (4,065 files), "Commercial Contracts" (92,841 files · Vault).

**`project-grid`** — The 4-column responsive grid these cards sit in, below the tabs/search row.

### Email / Outlook Add-in (confirmed — new)
**`email-analysis-panel`** — A contextual side-panel view (email plugin context): left side shows the raw email thread with plain text and bordered **file-attachment chips** (e.g. "…Services Agreement (Acme–GlobalCorp) – Redline.docx"); right side is Harvey's structured analysis of that email/attachment — bold section headers (e.g. "Practical effect") followed by plain bullet lists (no citation badges observed in this particular panel). Ends in a light-gray **`suggestion-card`** ("Send to Vault" bold + "Analyze this email with other related files in Harvey" muted) and a "Settings" row with a small icon at the very bottom.

### Documented but still not visually confirmed
**`vault-answer-table`** — Tabular per-file/cross-document answers inside an opened Vault project (the landing grid above is confirmed; the inside-a-project view is not).

**`workflow-canvas`** — No-code, node-based workflow builder (the nav entry "Workflows" is now confirmed to exist; its canvas UI is not).

**`history-list`** / **`library-card`** — Nav entries "History" and "Library" are now confirmed to exist; their internal layouts are not.

**`guidance-view`** — A confirmed nav entry ("Guidance") with no confirmed internal UI.

**`mobile-assistant`** / **`mobile-scan-upload`** — Mobile app surfaces.

## Do's and Don'ts

### Do
- Keep the **marketing/product canvas split** intentional: cream for marketing, white for product. Don't collapse them into one value.
- Attach a **citation badge** to any generated claim, and roll them up into a **Sources card** at the end of the response — this is the confirmed, load-bearing trust pattern.
- Give the send/submit action a distinguishable **disabled state** (muted gray) vs. **active state** (black) tied to whether the input has content.
- Reserve TWK Ghost strictly for the wordmark and marketing hero — the product is confirmed 100% sans, with no exceptions observed.
- Use a consistent, restrained **muted gray** for all secondary/meta text rather than introducing new gray steps.

### Don't
- Don't bring the marketing terracotta accent into product UI — it was not observed anywhere in the Assistant, editor, or Agents screenshots.
- Don't apply the hero-card radius (~20px) to small controls — buttons/tabs/badges use much tighter radii (~4–10px).
- Don't add heavy shadows to routine cards (composer, sources, tooltips) — they get a subtle soft-shadow at most; only the two marketing-hero exceptions get a pronounced drop shadow.
- Don't treat Vault, Workflow builder, Library, History-list, or mobile as verified — still inference-only.

## Responsive Behavior

Not observed — all screenshots are desktop viewports. No breakpoint, tablet, or mobile behavior can be confirmed. Unconfirmed assumption: desktop-first for Assistant/Vault/Workflow/Agents, mobile app treated as a separate, feature-scoped surface.

## Iteration Guide

1. Marketing (nav/hero) and three product surfaces (Assistant answer view, split document editor, Agents delegation view) are now all visually confirmed — safe to build on directly.
2. The **citation-badge → sources-card** pattern and the Agents **progress-panel** are Harvey's two concrete expressions of the same "make AI reasoning verifiable" principle — preserve both in any redesign pass.
3. Typeface pairing (TWK Ghost display-only + sans everywhere else) is now confirmed across four independent screenshots — treat this as settled, not inferred.
4. Still get a screenshot of Vault, the Workflow builder canvas, Library, or History-list before finalizing those sections.

## Known Gaps

- **Vault's landing page is confirmed; its interior (an opened project/knowledge base), the Workflow builder canvas, History's list view, Library's internal layout, Guidance, pricing, and mobile all remain unconfirmed** — text-research-only or, for the nav entries, confirmed to exist but not confirmed internally.
- **Hex values are eyeballed** from screenshot images, not sampled with a color picker against live CSS — close approximations, not exact brand values.
- **No responsive/breakpoint or dark-mode data** — all screenshots are a single desktop viewport, light mode.
- **TWK Ghost and ABC Diatype are licensed**; substitutes suggested above are unverified against Harvey's actual weights/metrics.
- **Design-token rebuild details are partial** — the semantic-naming philosophy is documented, but specific token values and the full component list weren't recoverable via text search alone.
