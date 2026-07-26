# Harvey — Design System

> **Confidence note:** This file combines two sources. (1) Written research — Harvey's own design-team blog posts, press coverage, and typeface databases, surfaced via web search (this session couldn't render harvey.ai directly). (2) One real screenshot the user provided — Harvey's `/platform/agents` marketing page, showing the top nav, hero, and one embedded in-product screenshot (an Agents delegation chat with a progress panel). Values pulled from that screenshot are marked **"confirmed — screenshot"**; everything else is still **"estimated"**, visually eyeballed from a single image rather than pixel-sampled from live CSS, or inferred from text alone. Sections/screens not covered by the screenshot (Vault, Workflow builder, Library, History, mobile, pricing) remain unverified — see `Known Gaps`.

## Overview

Harvey reads as an **editorial, high-contrast, trust-first legal brand** — warm cream canvas, near-black ink, a Didone-style high-contrast serif for display copy, and a clean grotesque sans for everything else. The identity was shaped by Portland studio **Geist** with brand consultant Shawn Farsai, with the web/product build by **Basement Studio**. The house serif, **TWK Ghost** (WELTKERN), carries the wordmark, headlines, and display copy — its thick/thin stroke contrast is directly visible in the "Delegate the Work. Own the Judgment." hero headline and the "Harvey" wordmark. Body copy and UI run in a clean grotesque sans (Harvey's own material names **ABC Diatype** by Dinamo) — visible in nav links, buttons, and the in-product chat text.

The product's defining trait isn't a color or a shape — it's **transparency as a design principle**, now sharpened into an "agents" pitch: "Delegate the Work. Own the Judgment." Harvey's design team has written publicly that every surface exists to make AI reasoning verifiable, and the confirmed product screenshot shows this directly — a right-hand **Progress panel** enumerates completed steps with strikethrough + checkmarks, and an **Outputs / Sources** toggle sits right below it, keeping "what Harvey did" and "what it's based on" as co-equal, always-visible UI, not a buried footnote.

Two things the marketing site confirms that the earlier text-only research got right: the **cream-canvas, black-ink, single-accent** palette, and the **serif-display / sans-UI** split. One thing it corrects: this is **not** a hairline-only, flat system — the hero product screenshot sits in a large, heavily-rounded, drop-shadowed card over a dark painterly/textured backdrop, and a floating "Ask Harvey" pill chip in the product view is clearly elevated with its own shadow. Harvey uses real elevation deliberately, on a small number of hero surfaces, against an otherwise flat, cream, hairline-divided UI.

**Key characteristics (confirmed — screenshot):**
- Warm cream/off-white canvas (not white, not gray) behind nav and hero.
- Near-black ink text; a black-filled primary CTA button (`Request a Demo`) paired with an outlined black-on-cream secondary button (`Login`).
- **TWK Ghost**-style high-contrast serif for the wordmark and hero headline; clean grotesque sans everywhere else (nav, buttons, body, in-product UI).
- One sparing accent — a warm terracotta/orange, seen only in a small circular "spark" mark (the agent/AI indicator) and a thin accent bar — not used broadly.
- The in-product Agents view: dark near-black icon sidebar, white main panel, a tan/beige user-message bubble, unstyled-gray assistant prose, a right-hand **Progress** checklist with strikethrough-on-complete, and an **Outputs/Sources** segmented toggle.
- A floating **"Ask Harvey"** pill (avatar + label + accent spark icon) bottom-right of the product view, elevated with a drop shadow — the one persistent "always available" affordance.
- Full-width black **announcement bar** above the nav ("Harvey Agents execute legal work end-to-end").
- Generous corner radii on the big hero product-mockup card (~20px) against comparatively tight radii on buttons (~8–10px) — two different rounding scales for "hero" vs. "control" surfaces.

**Key characteristics (sourced — text research, not yet visually confirmed):**
- Design philosophy centers on **citation traceability** — every AI output is linked to verifiable source material (the confirmed screenshot's Progress/Sources panel is the visible expression of this).
- Five product pillars: **Assistant** (chat), **Vault** (bulk document repository + RAG analysis, ~10,000 docs/project), **Workflow** (no-code agent builder), **History**, **Library** — plus the newer **Agents** delegation surface shown in the screenshot.
- Native **Word integration** for redlining, driven by natural-language prompts.
- Design tokens are **semantic/intent-based** ("foreground-base" not "neutral-400"), part of a January 2026 design-system rebuild on a Shadcn-derived React component base.
- Full **mobile app** (iOS/Android): dictation, "Magic Prompt," Vault search, scan-and-upload, audio-to-transcript.

## Colors

### Surface
- **Canvas** (`{colors.canvas}` — ~#F7F5F0 *confirmed — screenshot*): Warm cream page floor behind nav and hero. Not pure white.
- **Surface Card** (`{colors.surface-card}` — ~#FFFFFF *confirmed — screenshot*): The in-product chat/progress panel background, white against the cream canvas.
- **Sidebar Dark** (`{colors.sidebar-dark}` — ~#16181D *confirmed — screenshot*): The narrow icon rail on the left of the in-product Agents view — near-black, cooler than the ink text color.
- **Announcement Bar** (`{colors.bar-dark}` — ~#0E0D0B *confirmed — screenshot*): Full-width black bar above the nav.

### Text
- **Ink** (`{colors.ink}` — ~#17160F *confirmed — screenshot*): Near-black, warm-leaning. Hero headline, wordmark, nav links, bold UI labels ("Progress," "Context").
- **Body** (`{colors.body}` — ~#4A4842 *estimated*): Running text weight between ink and muted; not directly distinguishable from ink in the single screenshot at this resolution.
- **Muted** (`{colors.muted}` — ~#8B8576 *confirmed — screenshot*): Breadcrumb ("Platform /"), "Set client matter," step-count label ("4 of 4 steps") — secondary/contextual text.

### Accent
- **Spark Accent** (`{colors.accent}` — ~#DB5A35 *confirmed — screenshot*): Warm terracotta/orange-red. Seen only in the small circular agent/AI "spark" icon beside the floating Ask Harvey chip, and a thin accent bar. Used sparingly — this is Harvey's one brand color beyond black/cream, not a general-purpose UI color.

### Buttons
- **Primary fill** (`{colors.primary}` — ~#17160F *confirmed — screenshot*, same as ink): Solid black "Request a Demo" CTA.
- **On Primary** (`{colors.on-primary}` — #FFFFFF *confirmed — screenshot*): White label text on the black CTA.
- **Secondary border** (`{colors.border-strong}` — ~#17160F *confirmed — screenshot*): Black 1px outline on the cream-background "Login" button.

### Product UI accents
- **Chat bubble (user)** (`{colors.bubble-user}` — ~#ECE5DA *confirmed — screenshot*): Warm tan/beige rounded bubble for the user's message in the Agents chat.
- **Progress check** (`{colors.progress-done}` — ~#3F8F5F *confirmed — screenshot, lower confidence*): Green checkmark/strikethrough color for completed Progress-panel steps.
- **Hairline** (`{colors.hairline}` — ~#E6E1D5 *confirmed — screenshot*): Vertical divider between the chat column and the Progress/Context side panel.

### Semantic (inferred, standard enterprise pattern — not visible in the screenshot)
- **Warning** (`{colors.semantic-warning}` — ~#B8791F *estimated*): Flagged clause, unresolved conflict.
- **Error** (`{colors.semantic-error}` — ~#C0392B *estimated*): Failed extraction, validation error.

## Typography

### Font Family
**TWK Ghost** (WELTKERN, designed by Nolan Paparelli) — high-contrast, Didone-leaning serif — confirmed visually in the "Harvey" wordmark and the "Delegate the Work. Own the Judgment." hero headline: heavy vertical stems, thin hairline serifs and crossbars, classic high-contrast display-serif shape. Sourced separately: first released May 2022 (Regular/Italic), expanded to 13+ weights + italics in June 2025.

A clean grotesque sans — Harvey's own material names **ABC Diatype** (Dinamo) — carries nav links, buttons, breadcrumbs, and all in-product UI/chat text, confirmed visually as a neutral, low-contrast grotesque (not geometric, not humanist-warm).

Both are commercial/licensed typefaces — see substitutes below.

### Hierarchy

| Token | Approx. Size | Weight | Confidence | Use |
|---|---|---|---|---|
| `{typography.display-hero}` | ~72–80px | TWK Ghost, high-contrast | confirmed — screenshot (relative scale) | "Delegate the Work. Own the Judgment." hero headline, 3-line wrap |
| `{typography.wordmark}` | ~24px | TWK Ghost | confirmed — screenshot | "Harvey" nav logo |
| `{typography.nav-link}` | ~15px | Sans, regular | confirmed — screenshot | Platform / Solutions / Customers / Security / Resources / Company |
| `{typography.body-lg}` | ~18px | Sans, regular | confirmed — screenshot | Hero subheadline ("Harvey handles work end to end…") |
| `{typography.button}` | ~15px | Sans, medium | confirmed — screenshot | "Request a Demo," "Login" |
| `{typography.chat-body}` | ~14–15px | Sans, regular | confirmed — screenshot | User message bubble, assistant response text |
| `{typography.caption}` | ~12–13px | Sans, regular | confirmed — screenshot | Breadcrumb, "Set client matter," "4 of 4 steps," Progress list items |
| `{typography.mono}` | ~13px *estimated* | Sans Mono | estimated | Citation IDs / source references — not visible in this screenshot |

### Principles
- **Serif carries the brand voice; sans carries the work** — confirmed. TWK Ghost appears only in the wordmark and hero headline; every nav, button, and in-product UI element observed is set in the sans.
- Body/UI text stays small and restrained (~13–15px) even in marketing contexts — this is a controlled, editorial type scale, not an oversized SaaS-marketing one.

### Note on Font Substitutes
Both TWK Ghost and ABC Diatype are licensed. Open-source substitutes: **Source Serif 4** or **Freight Text** for TWK Ghost's high-contrast editorial serif role; **Inter** or **IBM Plex Sans** for the grotesque UI role, with **IBM Plex Mono** or **JetBrains Mono** for the monospace cut.

## Layout

- **Top announcement bar**: full-width, black, ~40px tall, centered white text + "Learn more" link + close icon. *(confirmed — screenshot)*
- **Nav bar**: cream background, ~80px tall, logo far left, nav links roughly centered, Login + Request a Demo right-aligned. *(confirmed — screenshot)*
- **Hero**: asymmetric two-column split within one row — breadcrumb + large serif headline on the left (~55–60% width), subheadline + single CTA top-aligned on the right (~35–40% width). Generous top/bottom padding, headline wraps across 3 lines. *(confirmed — screenshot)*
- **Hero product mockup**: full-bleed-within-container card, sits directly below the hero copy, appears to slightly overlap/bleed past the hero's vertical rhythm via a dark textured backdrop. *(confirmed — screenshot)*
- **In-product Agents view**: narrow icon sidebar (fixed width, ~48–56px) + flexible main chat column + fixed-width right panel (~280–320px) for Progress/Context. *(confirmed — screenshot)*
- **Container width**: page content appears to cap around ~1280–1400px based on the captured viewport; margins are generous (~80–100px) at desktop width. *(estimated from the single screenshot's proportions)*
- **Base spacing unit**: not measurable precisely from one screenshot; assume 4px/8px base as a standard default. *(estimated)*

## Elevation & Depth

Harvey is **not** hairline-only — this was the biggest correction from seeing an actual screenshot. Two elevation tiers are visible:

| Level | Treatment | Use | Confidence |
|---|---|---|---|
| Flat (canvas) | `{colors.canvas}`, no shadow | Nav, hero copy, body bands | confirmed — screenshot |
| Hairline card | 1px `{colors.hairline}`, no shadow | Divider between chat column and Progress panel inside the product view | confirmed — screenshot |
| **Hero-elevated** | Large radius + soft drop shadow + dark textured backdrop | The big product-mockup card on the marketing hero | confirmed — screenshot |
| **Floating-elevated** | Pill shape + drop shadow | The "Ask Harvey" chip, bottom-right of the product view | confirmed — screenshot |

Elevation is reserved for a small number of "hero" and "always-on-top" surfaces; the rest of the UI (nav, panels, list rows) stays flat with hairline dividers only.

## Shapes

| Token | Value | Use | Confidence |
|---|---|---|---|
| `{rounded.control}` | ~8–10px | Buttons (Request a Demo, Login), context tabs (Outputs/Sources) | confirmed — screenshot |
| `{rounded.hero-card}` | ~20px | The large hero product-mockup card | confirmed — screenshot |
| `{rounded.pill}` | full/9999px | Floating "Ask Harvey" chip, breadcrumb-adjacent small elements | confirmed — screenshot |
| `{rounded.bubble}` | ~12–14px | Chat user-message bubble | confirmed — screenshot |

Two distinct rounding scales are in play: a tight, functional radius for controls (buttons, tabs) and a much larger, more decorative radius for the one hero showcase card — not a single uniform scale.

## Components

### Marketing
**`announcement-bar`** — Full-width black bar above nav; centered white text + link + dismiss icon. *(confirmed)*

**`top-nav`** — Cream background, serif wordmark left, sans nav links with dropdown chevrons (Platform, Solutions, Resources, Company) center, outlined `button-secondary` (Login) + solid `button-primary` (Request a Demo) right. *(confirmed)*

**`hero-band`** — Breadcrumb ("Platform / Agents") + large serif headline + sans subheadline + single primary CTA, asymmetric split layout. *(confirmed)*

**`hero-product-card`** — The signature marketing surface: a large-radius, drop-shadowed card containing a dark painterly/textured top backdrop and an embedded screenshot of the actual product below it. This is Harvey's equivalent of Cursor's "IDE mockup card" — the one place the marketing site shows real product UI at native fidelity. *(confirmed)*

### Buttons
**`button-primary`** — Solid black (`{colors.primary}`) fill, white text, ~8–10px radius, medium-weight sans label. *(confirmed)*

**`button-secondary`** — Cream/transparent fill, black 1px border, black text, same radius as primary; used for lower-emphasis actions (Login). *(confirmed)*

### In-product (Agents delegation view)
**`agent-sidebar`** — Narrow, near-black icon rail, fixed left. *(confirmed)*

**`chat-thread`** — Main panel: user turns render as a tan rounded `chat-bubble`; assistant turns render as plain gray prose with no bubble — a deliberate asymmetry that visually separates "what you asked" from "what Harvey found," reinforced by a smaller gray status/log line ("Search complete. I've located responsive documents…"). *(confirmed)*

**`progress-panel`** — Right-hand panel: "Progress" header + step-count ("4 of 4 steps") + chevron, followed by a checklist where completed steps show a check icon and strikethrough text. This is Harvey's closest analogue to Cursor's AI-timeline pills — the signature "make the agent's work legible" component. *(confirmed)*

**`context-tabs`** — Small segmented control below the Progress panel: "Outputs" / "Sources," ~8px-radius tab buttons. Keeps generated output and cited source material as co-equal, one-click-apart views. *(confirmed)*

**`ask-harvey-chip`** — Floating pill, bottom-right, persistent across the product view: circular "H" avatar + "Ask Harvey" label + small accent-colored spark icon, drop-shadow elevated. *(confirmed)*

### Documented but not yet visually confirmed
**`citation-chip`** — Inline source-trace marker on AI-generated claims (Harvey's stated design philosophy; exact rendering not visible in this screenshot).

**`vault-project-list`** / **`vault-answer-table`** — Vault's bulk document repository and tabular cross-document answers.

**`workflow-canvas`** — No-code, node-based workflow builder.

**`redline-panel`** — Word-integrated AI redlining.

**`history-list`** / **`library-card`** — Saved threads and templates.

**`mobile-assistant`** / **`mobile-scan-upload`** — Mobile app surfaces (dictation, scan-and-upload).

## Do's and Don'ts

### Do
- Reserve **TWK Ghost** for the wordmark and hero-level headlines only — everything else, including in-product UI, is sans.
- Reserve the terracotta **accent** for the agent/AI "spark" mark — it is not a general button or link color; black-on-cream carries that job.
- Reserve elevation (shadow + large radius) for hero/showcase surfaces and persistent floating affordances (the Ask Harvey chip) — keep the rest of the UI flat with hairlines.
- Pair completed-step checklists with a source/output toggle, matching the confirmed Progress + Context(Outputs/Sources) pattern — this is the concrete expression of Harvey's "citation traceability" principle.

### Don't
- Don't apply the large hero-card radius (~20px) to ordinary UI controls — buttons and tabs use a much tighter radius (~8–10px).
- Don't use the terracotta accent broadly; in the one confirmed screenshot it appears exactly once, at small size.
- Don't add drop shadows to routine panels/rows — only two elevated surface types were observed, and both are exceptional (hero card, floating chip).
- Don't treat unconfirmed sections (Vault, Workflow builder, Library, mobile) as verified — they carry the same visual language by inference only.

## Responsive Behavior

Not observed — the one screenshot is a single desktop viewport. No breakpoint, tablet, or mobile behavior can be confirmed from it. Standard enterprise-SaaS assumption (unconfirmed): desktop-first for Assistant/Vault/Workflow/Agents, with the mobile app treated as a separate, feature-scoped surface rather than a responsive collapse of the desktop product.

## Iteration Guide

1. The confirmed marketing hero/nav and the confirmed Agents in-product view are safe to build on directly — colors, type roles, radii, and elevation patterns above came from an actual screenshot, not inference.
2. The **Progress panel + Outputs/Sources toggle** is Harvey's real signature component (parallel to Cursor's AI-timeline pills) — preserve it in any redesign pass; it's the visible form of Harvey's stated citation-traceability philosophy, and it's now visually confirmed, not just documented.
3. Typeface pairing (TWK Ghost display + sans body/UI) is both well-sourced and visually confirmed — safe to build on directly.
4. Still get a second screenshot (or live access) before finalizing Vault, Workflow builder, Library, History, or mobile — those remain inference-only.

## Known Gaps

- **Only one screen confirmed.** The `/platform/agents` marketing page (nav, hero, one embedded product screenshot) is the only visually-verified surface. Vault, Workflow builder, Library, History, pricing, and the mobile app are still text-research-only.
- **Hex values are eyeballed, not sampled.** Colors above were read visually from a single screenshot image, not extracted with a color picker against live CSS — treat them as close approximations, not exact brand values.
- **No responsive/breakpoint data** — single desktop viewport only.
- **No dark mode observed** — unknown whether one exists.
- **TWK Ghost and ABC Diatype are licensed** typefaces; substitutes are suggested above but unverified against Harvey's actual type scale/weights.
- **Design token rebuild details are partial** — Harvey's January 2026 design-system blog post describes the *naming philosophy* (semantic over appearance-based tokens) but specific token values and the full component list weren't recoverable via text search alone.
