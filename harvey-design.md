# Harvey — Design System

> **Confidence note:** This file was built from written research (Harvey's own design-team blog posts, press coverage, third-party reviews, and typeface databases) surfaced via web search. This session's network policy blocked direct access to harvey.ai, the App Store, and every other page-render/screenshot source I tried — so nothing here was derived from actually looking at pixels. Product structure, typefaces, and design philosophy below are sourced and reasonably solid. **Colors, spacing, radii, and exact type sizes are inferred/estimated**, not measured, and are called out inline. Treat this as a first draft to correct once real screenshots or live-site access are available — see `Known Gaps` at the end.

## Overview

Harvey reads as an **editorial, trust-first legal brand** — closer to a legal journal than a typical SaaS dashboard. The identity was shaped by Portland studio **Geist** with brand consultant Shawn Farsai, with the web/product build by **Basement Studio**. The house serif, **TWK Ghost** (WELTKERN), carries the wordmark, headlines, and display copy with refined high-contrast shapes — deliberately chosen to signal "the editorial gravitas of a legal journal" alongside craftsmanship and precision. Body copy and UI run in **ABC Diatype** (Dinamo), described by Harvey's own team as "a measured counterpoint that lets TWK Ghost hold the emotional and visual weight of the brand."

The product's defining trait isn't a color or a shape — it's **transparency as a design principle**. Harvey's design team has written publicly that every surface exists to make AI reasoning verifiable: clause extractions link back to source paragraphs, comparisons show underlying language side-by-side, and drafted redlines cite the playbook or precedent that produced them. This "paper trail" of citations is the load-bearing UX idea across every product pillar (Assistant, Vault, Workflow, History, Library) — the visual system exists in service of defensibility, not decoration.

Harvey rebuilt its internal design system in January 2026, moving from appearance-based token names ("neutral-400") to **intent-based semantic tokens** ("foreground-base") so the same token can theme text, icons, or other foreground elements without rework. The component library sits on a React codebase that had accreted legacy components, Shadcn primitives, and one-off custom work; the rebuild consolidated these with graduated enforcement (linter warnings → warnings at 80% adoption → pre-commit errors at 95%). This context matters for reconstruction: Harvey's actual implementation likely resembles a **Shadcn-derived neutral-gray UI kit** with a restrained accent, rather than a highly saturated or novel visual system.

**Key characteristics (sourced):**
- Two-typeface system: **TWK Ghost** (serif, display/wordmark) + **ABC Diatype** (grotesque sans, body/UI).
- Design philosophy centers on **citation traceability** — every AI output is linked to verifiable source material.
- Five product pillars: **Assistant** (chat), **Vault** (bulk document repository + RAG analysis, ~10,000 docs/project), **Workflow** (no-code agent builder with conditionals/classification/role permissions), **History**, **Library**.
- Reviewers repeatedly describe the interface as **"Apple-like"** — clean, fast, structured — in contrast to more cluttered legal-tech competitors.
- Native **Word integration** brings redlining into the lawyer's existing document, driven by natural-language prompts.
- Design tokens are **semantic/intent-based**, not appearance-based — component tokens reference semantic tokens, semantic tokens reference primitives.
- Full **mobile app** (iOS/Android): dictation, "Magic Prompt" query refinement, Vault search, scan-and-upload for contracts, audio-to-transcript, and synced history.

**Key characteristics (inferred, unverified — flagged below wherever used):**
- Likely a light, paper-like canvas (cream/ivory rather than pure white) given the "legal journal" framing — not confirmed.
- Likely a restrained, near-monochrome palette (ink on paper) with a single sparing accent, consistent with a Shadcn-neutral base — not confirmed.
- Likely compact, functional radii and spacing typical of dense enterprise document-review UI — not confirmed.

## Colors

**Everything in this section is an estimate.** No CSS, screenshot, or rendered page was available to sample actual values in this session. Treat hex values as placeholders that preserve the *relationships* (canvas vs. ink vs. accent) described in Harvey's own editorial/legal-journal framing — not as measured brand colors.

### Surface (inferred)
- **Canvas** (`{colors.canvas}` — ~#F8F6F1 *estimated*): Warm paper-like page floor, consistent with "legal journal" editorial framing. Unverified — could equally be pure white or a cooler off-white given the Shadcn-neutral base.
- **Surface Card** (`{colors.surface-card}` — ~#FFFFFF *estimated*): Card/document surfaces sitting above canvas.
- **Surface Muted** (`{colors.surface-muted}` — ~#F1F0EC *estimated*): Sidebar, secondary panels (Vault file lists, History rail).

### Text (inferred)
- **Ink** (`{colors.ink}` — ~#1A1A17 *estimated*): Near-black, warm-leaning to match a paper canvas. Headlines, body emphasis.
- **Body** (`{colors.body}` — ~#4A4842 *estimated*): Default running text in ABC Diatype.
- **Muted** (`{colors.muted}` — ~#8A867C *estimated*): Captions, timestamps, secondary metadata (citation labels, doc counts).

### Accent (unconfirmed)
- **Primary Accent** (`{colors.primary}` — *value unknown*): Harvey's marketing materials did not surface a confirmed single accent hex in this session's research. Given the restrained, trust-first brand voice, expect **one** sparing accent (not a multi-color system) reserved for primary CTAs and the citation/trust affordances — do not guess a hue without visual confirmation.

### Semantic (inferred, standard enterprise pattern)
- **Success** (`{colors.semantic-success}` — ~#1F8A65 *estimated*): Verified citation / completed workflow step.
- **Warning** (`{colors.semantic-warning}` — ~#B8791F *estimated*): Flagged clause, unresolved conflict.
- **Error** (`{colors.semantic-error}` — ~#C0392B *estimated*): Failed extraction, validation error.

### Hairlines (inferred)
- **Hairline** (`{colors.hairline}` — ~#E5E2DB *estimated*): 1px dividers between document rows, table cells, chat turns.

## Typography

### Font Family
**TWK Ghost** (WELTKERN, designed by Nolan Paparelli) — high-contrast serif — carries the wordmark, headlines, and display copy. First released May 2022 (Regular/Italic); expanded to 13+ weights plus italics in June 2025 alongside Harvey's "Practice Made Perfect" campaign.

**ABC Diatype** (Dinamo) — a warm, sharp grotesque sans — carries body copy and UI. Available in Thin, Light, Regular, Medium, Bold, with matching Monospace and Italic styles. The Monospace cut is the natural choice for any code/citation-ID surfaces.

Both are commercial/licensed typefaces — see substitutes below.

### Hierarchy (sizes/weights inferred — not measured)

| Token | Approx. Size | Weight | Use |
|---|---|---|---|
| `{typography.display-lg}` | ~56–72px | TWK Ghost, Regular/high-contrast | Marketing hero headline |
| `{typography.display-md}` | ~32–40px | TWK Ghost | Section heads |
| `{typography.title-md}` | ~20–24px | ABC Diatype Medium | Card/component titles, Vault project names |
| `{typography.body-md}` | ~15–16px | ABC Diatype Regular | Assistant chat text, running body copy |
| `{typography.caption}` | ~12–13px | ABC Diatype Regular/Medium | Citation labels, timestamps, metadata |
| `{typography.mono}` | ~13px | ABC Diatype Monospace | Citation IDs, source references, redline diffs |

### Principles
- **Serif carries the brand voice; sans carries the work.** TWK Ghost never appears in dense UI — it's reserved for marketing and top-level product headers. ABC Diatype does the rest.
- **Citations and metadata likely use the mono cut** of ABC Diatype to visually distinguish "sourced fact" from "prose" — this is a reasonable inference from the citation-heavy product philosophy, not a confirmed pattern.

### Note on Font Substitutes
Both TWK Ghost and ABC Diatype are licensed (WELTKERN and Dinamo respectively). Open-source substitutes: **Source Serif 4** or **Freight Text** for TWK Ghost's high-contrast editorial serif role; **Inter** or **IBM Plex Sans** for ABC Diatype's grotesque UI role, with **IBM Plex Mono** or **JetBrains Mono** for the monospace cut.

## Layout

*Spacing scale, container widths, and grid are unverified — no live page was available to inspect.* Reasonable defaults for a dense, document-heavy enterprise product, consistent with the Shadcn-derived component base:

- **Base unit (assumed):** 4px, following the near-universal Shadcn/Tailwind convention Harvey's own design post describes them as building on.
- **Content-dense panels** (Vault file lists, History): tight vertical rhythm, likely 8–12px row padding.
- **Assistant chat column**: centered, constrained reading width (~640–760px), consistent with a citation-heavy long-form reading experience.
- **Workflow builder**: full-bleed canvas (node-based, similar to Figma/n8n-style builders), given its description as a "no-code" flow with conditionals and branching.

## Elevation & Depth

Unverified. Given the editorial, paper-like framing and enterprise-document context, the more likely pattern is **hairline-and-flat-surface depth** (cards separated by 1px borders and subtle surface-color shifts) rather than heavy drop shadows — this mirrors both the "legal journal" aesthetic and the Shadcn-neutral component base. Not confirmed against a rendered page.

## Shapes

Border radius scale is unverified. Enterprise document-review products in this category (redlining, tabular Vault answers, dense chat) typically skew toward **small-to-moderate radii** (4–10px) rather than heavily rounded consumer-app shapes, to keep density and precision legible. Treat any specific value as a placeholder pending visual confirmation.

## Components

*Component visuals below are structural inferences from documented product features, not observed UI.*

### Assistant (chat)
**`chat-thread`** — The "front door" of Harvey: a chat interface where natural-language queries return research, summaries, or drafted clauses. Every substantive claim in a response carries a citation back to source material.

**`citation-chip`** — Harvey's likely signature component, analogous to a "trust badge": an inline marker on any AI-generated claim that links to the source paragraph/document it was drawn from. This is the visual expression of Harvey's stated design philosophy ("clear paper trail... verify sources and data used") — the one element worth treating as load-bearing in any Harvey-styled UI, even though its exact rendering (pill, footnote, underline) is unconfirmed.

### Vault (document repository)
**`vault-project-list`** — Document repository view; a project can hold up to ~10,000 documents for bulk RAG-based analysis.

**`vault-answer-table`** — Tabular per-file answers when a query is run across a document set, alongside options for a single consolidated answer or a deeper cited report.

### Workflow (no-code builder)
**`workflow-canvas`** — Node-based builder for multi-step legal processes: conditionals, classification, and role-based permissions. Users describe a workflow in natural language and Harvey translates it into structured steps.

### Word integration (redlining)
**`redline-panel`** — Brings AI-assisted redlining into the lawyer's live Word document. Natural-language edit prompts produce suggested redlines, each traceable to the playbook or precedent that informed it.

### History & Library
**`history-list`** — Past queries and threads, synced between web and the mobile app.

**`library-card`** — Saved templates/precedent content (referenced via Harvey Academy's "Library" documentation).

### Mobile
**`mobile-assistant`** — Chat entry point with dictation and "Magic Prompt" query refinement.

**`mobile-scan-upload`** — Camera-based contract/exhibit capture that saves directly into Vault or attaches to a query.

## Do's and Don'ts

### Do
- Reserve **TWK Ghost** for wordmark, marketing headlines, and top-level product headers — never dense UI text.
- Attach a citation/source trace to any AI-generated claim rendered in the UI — this is Harvey's core trust mechanic, not an optional affordance.
- Keep the palette restrained — the brand's "editorial legal journal" framing argues against a loud, multi-color system.

### Don't
- Don't invent a saturated, playful color system — nothing in Harvey's documented brand or product research supports it; this is an enterprise-trust brand, not a consumer one.
- Don't present the hex/spacing values in this file as verified — they're placeholders until checked against a live render.
- Don't use TWK Ghost (the display serif) for body copy or dense data — that role belongs to ABC Diatype.

## Responsive Behavior

Unverified — no rendered page available to inspect breakpoints. Standard enterprise-SaaS assumptions (not confirmed): desktop-first product (Assistant/Vault/Workflow are document- and data-dense, likely min-supported width ~1024px), with the mobile app treated as a genuinely separate, feature-scoped surface (dictation, scan-and-upload, search) rather than a responsive collapse of the desktop product.

## Iteration Guide

1. Before trusting any specific pixel value in this file, re-derive it from a live render — either restore network access to harvey.ai in this environment, or supply screenshots directly.
2. The one thing worth preserving in any redesign pass: the **citation-chip / source-trace** pattern. It's the closest thing Harvey has to a signature component (parallel to Cursor's AI-timeline pills) and it's grounded in the company's own stated design philosophy, not inference.
3. Typeface pairing (TWK Ghost display + ABC Diatype body/UI) is well-sourced — safe to build on directly.
4. Use `{token.refs}` everywhere; the semantic-token naming convention ("foreground-base" not "neutral-400") is itself a documented Harvey design decision worth mirroring structurally, independent of the actual color values.

## Known Gaps

- **No visual access.** This session could not reach harvey.ai, the App Store/Google Play listings, or any third-party page for direct rendering — every WebFetch call and every Playwright navigation attempt returned a 403 (gateway policy denial for the site, or broad WebFetch failures even on unrelated sites like Wikipedia). All colors, spacing, radii, and exact type sizes in this file are estimates, clearly flagged inline.
- **No accent color confirmed.** Research did not surface a specific, sourced hex for Harvey's primary brand accent.
- **No app screenshots reviewed.** The mobile app and Vault/Workflow interfaces are described only from feature lists (App Store description, product pages' text), not from any image.
- **TWK Ghost and ABC Diatype are licensed** typefaces; substitutes are suggested above but unverified against Harvey's actual type scale.
- **Design token rebuild details are partial.** Harvey's January 2026 design-system blog post describes the *naming philosophy* (semantic over appearance-based tokens) in useful detail, but specific token values, the full component list, and spacing/radius primitives were not recoverable via search summaries alone.
