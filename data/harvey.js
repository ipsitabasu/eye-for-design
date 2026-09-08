export default {
  id: 'harvey',
  name: 'Harvey',
  tagline: 'AI-assisted contract review and negotiation',
  accentColor: '#1E3A5F',
  screens: [
    {
      id: 'queue',
      label: 'Review Queue',
      imageUrl: 'assets/screenshots/harvey/queue.png',
      imageWidth: 1440,
      imageHeight: 900,
      context: 'Concept design · The home surface — every NDA Harvey has reviewed and every one still waiting, sorted by who owes the next move.',
      annotations: [
        {
          id: 'harvey-queue-1',
          x: 90,
          y: 11,
          label: '1',
          title: 'Sorted by who owes the next move — not by document status',
          analysis: 'A queue of NDAs is really two queues: the ones the agent has already reviewed and the ones it hasn\'t. Most contract tools sort by document status — Draft, In Review, Out for Signature — which answers the document\'s question, not the lawyer\'s. The lawyer\'s actual question at 9am is "what is stuck on me?" Harvey\'s default sort answers that instead: Waiting on Harvey, Waiting on counterparty, Waiting on a lawyer, Waiting on you. Thirty-eight rows collapse to the four that need a human today. The tabs above carry the same split, so the reviewed/to-be-reviewed distinction is a filter rather than a mental calculation. This is Jobs-to-be-Done applied to information architecture: organise by the decision the user has to make, not by the state your database happens to store.',
          sources: [
            { label: 'NNG: 10 Usability Heuristics', url: 'https://www.nngroup.com/articles/ten-usability-heuristics/' },
            { label: 'Google PAIR: Mental Models', url: 'https://pair.withgoogle.com/chapter/mental-models/' }
          ],
          principles: ['Jobs-to-be-Done', 'Information Architecture', 'Match System to Real World']
        },
        {
          id: 'harvey-queue-2',
          x: 53,
          y: 20,
          label: '2',
          title: 'Turn pips: the escalation is visible six turns before it happens',
          analysis: 'Every row shows "4 of 6" with six pips, the sixth outlined in amber — the turn where Harvey hands the negotiation to a lawyer. This turns an invisible policy into a progress bar. Two things follow. First, no handoff is ever a surprise: a lawyer scanning the queue can see which deals are about to land on their desk and intervene early if they want to. Second, it gives the agent\'s autonomy a legible budget, which is what makes people comfortable granting it. Progress indicators pull attention forward — the goal-gradient effect — and here that pull is useful rather than manipulative, because the finish line is a human taking over, not a purchase. The threshold itself is editable in Handoff Rules; the pip is a link to it.',
          sources: [
            { label: 'NNG: Visibility of System Status', url: 'https://www.nngroup.com/articles/visibility-system-status/' },
            { label: 'Laws of UX: Goal-Gradient Effect', url: 'https://lawsofux.com/goal-gradient-effect/' }
          ],
          principles: ['Visibility of System Status', 'Goal-Gradient Effect', 'Predictable Autonomy']
        },
        {
          id: 'harvey-queue-3',
          x: 95.5,
          y: 26,
          label: '3',
          title: 'Pause lives on the row — stopping one NDA, not the agent',
          analysis: 'The pause control sits at the end of every row, one click, no dialog. This scoping is the whole design: a lawyer who gets nervous about one counterparty should not have to stop the other thirteen negotiations to act on it. Pausing is deliberately not cancelling — the thread stays open, the counterparty sees nothing, and Harvey simply stops replying until someone resumes. The toast at the bottom states that consequence in plain language and offers Undo, because a control people are afraid to press is a control they won\'t use in the moment that matters. Nielsen\'s User Control and Freedom heuristic calls this the "emergency exit"; the EU AI Act calls it the ability to interrupt a high-risk system. The same button satisfies both.',
          sources: [
            { label: 'NNG: User Control and Freedom', url: 'https://www.nngroup.com/articles/user-control-and-freedom/' },
            { label: 'EU AI Act, Article 14: Human Oversight', url: 'https://artificialintelligenceact.eu/article/14/' }
          ],
          principles: ['User Control and Freedom', 'Reversibility', 'Scoped Intervention']
        },
        {
          id: 'harvey-queue-4',
          x: 7,
          y: 89,
          label: '4',
          title: 'The kill switch is furniture, not a setting',
          analysis: 'Global automation state is pinned to the bottom of the sidebar on every screen: a green dot, the word On, the live count of what that covers, and Pause all automation directly underneath. It never moves and it is never more than one click away. Burying a kill switch in Settings is a common mistake in agent products — it optimises for the 99% of sessions where nobody needs it and fails the 1% where someone needs it in ten seconds. Showing "14 NDAs running · 3 paused" next to the button matters as much as the button: it tells the user the blast radius before they press. Microsoft\'s Human-AI Interaction guidelines are explicit that a system doing work on the user\'s behalf must offer global controls and make its scope of action visible.',
          sources: [
            { label: 'Microsoft HAX: Guidelines for Human-AI Interaction', url: 'https://www.microsoft.com/en-us/haxtoolkit/ai-guidelines/' },
            { label: 'NNG: Visibility of System Status', url: 'https://www.nngroup.com/articles/visibility-system-status/' }
          ],
          principles: ['Global Controls', 'Blast Radius Visibility', 'Fail-Safe Design']
        },
        {
          id: 'harvey-queue-5',
          x: 62,
          y: 35,
          label: '5',
          title: 'The queue is the top layer of the audit log',
          analysis: 'The widest column is "Last decision by Harvey", written the way a colleague would say it: "Countered non-solicit 24 → 12 months (playbook § 4.2)". Underneath, in smaller type, sits the provenance — turn number, timestamp, the citations used. One click opens the full turn. This is progressive disclosure applied to explainability: a one-line summary that a lawyer can trust at a glance, a full decision trail one level down, and nothing forced on anyone who doesn\'t need it. The alternative most AI products ship — a confidence score, or worse, no explanation at all — gives the reader nothing to verify. Harvey\'s bet is that a citation someone can check is worth more than a number they can\'t.',
          sources: [
            { label: 'NNG: Progressive Disclosure', url: 'https://www.nngroup.com/articles/progressive-disclosure/' },
            { label: 'Google PAIR: Explainability + Trust', url: 'https://pair.withgoogle.com/chapter/explainability-trust/' }
          ],
          principles: ['Progressive Disclosure', 'Explainability', 'Trust Calibration']
        }
      ]
    },
    {
      id: 'audit',
      label: 'NDA Audit Log',
      imageUrl: 'assets/screenshots/harvey/audit.png',
      imageWidth: 1440,
      imageHeight: 900,
      context: 'Concept design · One NDA, turn by turn — every clause, citation, and redline Harvey produced, and the memory it formed for the next turn.',
      annotations: [
        {
          id: 'harvey-audit-1',
          x: 79,
          y: 5.5,
          label: '1',
          title: 'Pause this NDA sits where the state is read',
          analysis: 'The per-NDA pause is a header action next to Hand to lawyer and Open document — the three things a reviewing lawyer might do after reading the log. It is amber, not red: pausing is not destructive, and colouring it like a delete would suppress its use. The label names the object ("Pause this NDA") so it can never be confused with the global switch in the sidebar; two controls that stop different amounts of work must never look alike. Pressing it writes a turn into the log itself — "Turn 5 · A. Wu · paused, reason: awaiting security review" — so a pause is part of the record rather than a gap in it. Human interventions and agent actions belong in the same chronology.',
          sources: [
            { label: 'NNG: User Control and Freedom', url: 'https://www.nngroup.com/articles/user-control-and-freedom/' },
            { label: 'Google PAIR: Feedback + Control', url: 'https://pair.withgoogle.com/chapter/feedback-controls/' }
          ],
          principles: ['User Control and Freedom', 'Object-Scoped Actions', 'Auditable Interventions']
        },
        {
          id: 'harvey-audit-2',
          x: 69,
          y: 14.5,
          label: '2',
          title: 'The autonomy contract, stated in one sentence',
          analysis: 'A teal banner above the timeline says exactly what the agent is doing and exactly when it will stop: "Harvey is negotiating autonomously. It hands to R. Mehta at turn 6, or sooner if Acme asks for a call." Change rules sits at the end of the sentence. This is the single highest-leverage line on the screen. Users cannot calibrate trust in an agent whose boundaries they have to infer from behaviour, and an agent that is silent about its own limits reads as either overconfident or unbounded. Stating the rule where the work is shown — rather than only in a settings page nobody visits — means every session re-teaches the policy. The link makes the statement honest: the sentence is generated from the rules, so it cannot drift out of date.',
          sources: [
            { label: 'Microsoft HAX: Guidelines for Human-AI Interaction', url: 'https://www.microsoft.com/en-us/haxtoolkit/ai-guidelines/' },
            { label: 'Google PAIR: Mental Models', url: 'https://pair.withgoogle.com/chapter/mental-models/' }
          ],
          principles: ['Set Expectations', 'Trust Calibration', 'Policy Transparency']
        },
        {
          id: 'harvey-audit-3',
          x: 17.5,
          y: 31,
          label: '3',
          title: 'Every turn has the same four fields — a schema, not a transcript',
          analysis: 'Clause → Playbook → Law → Redline sent. The gutter labels are identical on every turn, which does three things. It makes the log scannable: a lawyer checking eleven turns reads down one column, not through eleven paragraphs. It makes gaps visible: a turn with no Law row is instantly legible as an unsupported position, and a turn with no Playbook row means the agent went off-book. And it makes supervision practicable — under the ABA Model Rules a lawyer remains responsible for work product produced with a tool\'s help, and responsibility requires a reviewable artifact. Free-form chain-of-thought text reads well once and audits terribly. A fixed schema is worse prose and far better evidence.',
          sources: [
            { label: 'ABA Model Rules of Professional Conduct', url: 'https://www.americanbar.org/groups/professional_responsibility/publications/model_rules_of_professional_conduct/' },
            { label: 'NIST AI Risk Management Framework', url: 'https://www.nist.gov/itl/ai-risk-management-framework' }
          ],
          principles: ['Consistency and Standards', 'Auditability', 'Structured Explanation']
        },
        {
          id: 'harvey-audit-4',
          x: 44,
          y: 39.5,
          label: '4',
          title: 'Citations resolve — playbook version and case law, both clickable',
          analysis: 'The playbook row carries "§ 4.2 · v12 · last edited by R. Mehta"; the law row carries a statute and the case that construes it. Both are chips that open the source, not prose that asserts it. Version-stamping the playbook citation is the subtle part: a decision made under v12 must stay attributable to v12 even after the playbook becomes v13, or the log quietly rewrites history. Grounding also changes the failure mode of the whole product. When Harvey is wrong, a lawyer sees which rule it misapplied and fixes the rule; without citations they can only distrust the agent generally. PAIR\'s guidance on explainability makes the same point — show the sources behind an output so people can judge each one on its merits instead of the system as a whole.',
          sources: [
            { label: 'Google PAIR: Explainability + Trust', url: 'https://pair.withgoogle.com/chapter/explainability-trust/' },
            { label: 'NNG: 10 Usability Heuristics', url: 'https://www.nngroup.com/articles/ten-usability-heuristics/' }
          ],
          principles: ['Grounded Citations', 'Provenance', 'Recoverable Errors']
        },
        {
          id: 'harvey-audit-5',
          x: 47,
          y: 52,
          label: '5',
          title: 'The redline is shown as sent — the artifact, not a summary of it',
          analysis: 'The fourth field renders the actual diff that went to the counterparty: strike through "24 months", insert "12 months", insert "Neither party", plus the recipient and the timestamp. Summarising an outbound legal edit is a category error — the words are the work product, and a lawyer reviewing an agent\'s turn needs to see the exact language that now sits in someone else\'s inbox. Diff formatting borrows a representation this audience already reads fluently from Word track changes, so no new visual vocabulary is required. The outcome line beneath closes the loop: "Acme accepted 12 months at turn 5". Read together, the two lines show what the agent proposed and what the world did about it, which is the only way to judge whether the position was any good.',
          sources: [
            { label: 'Laws of UX: Jakob\'s Law', url: 'https://lawsofux.com/jakobs-law/' },
            { label: 'NNG: Direct Manipulation', url: 'https://www.nngroup.com/articles/direct-manipulation/' }
          ],
          principles: ['Show the Artifact', 'Jakob\'s Law', 'Closed-Loop Feedback']
        },
        {
          id: 'harvey-audit-6',
          x: 86,
          y: 30,
          label: '6',
          title: 'Memory is a reviewable object with a scope, not an invisible upgrade',
          analysis: 'The right rail shows what Harvey learned from this negotiation as discrete, quoted statements — "Acme accepts a 12-month non-solicit if it is mutual" — each stamped with the turn that produced it, a scope chip (this counterparty vs. all NDAs), and Edit / Forget. This is the feature that makes turn N+1 better, and it is also the largest risk surface in the product: memory that forms silently means the agent\'s behaviour changes without anyone deciding it should. So scope is explicit and asymmetric. Counterparty-scoped memory applies immediately; anything that would generalise across all NDAs is queued for a lawyer\'s approval and only then drafted into the playbook. Forgetting is one click, in the same place as remembering, because a learning system without a delete key is one bad inference away from being untrustworthy.',
          sources: [
            { label: 'Google PAIR: Feedback + Control', url: 'https://pair.withgoogle.com/chapter/feedback-controls/' },
            { label: 'NIST AI Risk Management Framework', url: 'https://www.nist.gov/itl/ai-risk-management-framework' }
          ],
          principles: ['Editable Memory', 'Scoped Generalisation', 'Human Approval Gate']
        }
      ]
    },
    {
      id: 'command-center',
      label: 'Command Center',
      imageUrl: 'assets/screenshots/harvey/command-center.png',
      imageWidth: 1440,
      imageHeight: 900,
      context: 'Concept design · The autonomy dashboard — how much Harvey handled alone, why it handed off, and the one switch that stops everything.',
      annotations: [
        {
          id: 'harvey-cc-1',
          x: 26,
          y: 18,
          label: '1',
          title: 'Autonomy rate is the north star — and it carries its own baseline',
          analysis: 'The leftmost tile reads 78%, defined precisely underneath as "NDAs closed with zero lawyer turns", with the pre-Harvey comparison beside it. Every metric on this screen is paired with the number it replaced: 3.1 turns against a 5.2 baseline, 6h 40m cycle time against 4.2 days. A percentage on its own is a vanity metric; a percentage against the world before the agent existed is an argument a general counsel can take to a budget meeting. Choosing one dominant number also does the interface a favour — four equal tiles would make the reader rank them, so the first tile is the one the product is judged on and the rest are supporting evidence. The chart below shows the trend rather than the total, because the question is never "how much" but "is this getting better".',
          sources: [
            { label: 'Laws of UX: Von Restorff Effect', url: 'https://lawsofux.com/von-restorff-effect/' },
            { label: 'NNG: 10 Usability Heuristics', url: 'https://www.nngroup.com/articles/ten-usability-heuristics/' }
          ],
          principles: ['Baseline Comparison', 'Visual Hierarchy', 'Trend over Total']
        },
        {
          id: 'harvey-cc-2',
          x: 94,
          y: 4.5,
          label: '2',
          title: 'Pause all automation: a state display first, a button second',
          analysis: 'The top-right control is a card, not a lone button: green dot, "Automation on", the live count of what is running, and only then Pause all. Reading the state is the frequent act; pressing the switch is the rare one, and the layout matches that ratio. The confirmation names the consequence in the agent\'s own terms — Harvey starts nothing new, drafts already sent stay sent, counterparties see no change — because "are you sure?" is not information. Every pause records who, when, and why, and that record surfaces at the bottom of this screen. A kill switch that leaves no trace is a governance gap; a kill switch whose effect nobody can describe gets pressed too late.',
          sources: [
            { label: 'EU AI Act, Article 14: Human Oversight', url: 'https://artificialintelligenceact.eu/article/14/' },
            { label: 'NNG: Visibility of System Status', url: 'https://www.nngroup.com/articles/visibility-system-status/' }
          ],
          principles: ['Human Oversight', 'Consequence Preview', 'Accountable Controls']
        },
        {
          id: 'harvey-cc-3',
          x: 82,
          y: 42,
          label: '3',
          title: 'Escalation reasons end in a rule, not a number',
          analysis: 'Every handoff is bucketed by the trigger that caused it — turn limit 41%, counterparty accepted 26%, call requested 22%, no playbook match 11% — and each row links straight to the rule that fired. That makes the dashboard a control surface instead of a report. Read it as a diagnosis: a high turn-limit share means the threshold is too tight or the playbook is too rigid; a growing "no playbook match" share is a content gap the legal team can close this week. Analytics that stop at description leave the reader to invent the next step, which is why most dashboards are opened once a quarter. Every number here answers "so what do I change?" and puts the change one click away.',
          sources: [
            { label: 'NNG: 10 Usability Heuristics', url: 'https://www.nngroup.com/articles/ten-usability-heuristics/' },
            { label: 'Google PAIR: Feedback + Control', url: 'https://pair.withgoogle.com/chapter/feedback-controls/' }
          ],
          principles: ['Actionable Analytics', 'Closed-Loop Feedback', 'Diagnostic Framing']
        },
        {
          id: 'harvey-cc-4',
          x: 60.5,
          y: 70,
          label: '4',
          title: 'The dashboard ends in a queue',
          analysis: 'The bottom-left panel is "Needs a human now" — three NDAs, each with the trigger that escalated it, how long it has been waiting, and Open. A metrics screen that ends in charts asks the reader to go find the work somewhere else; this one hands it over. The waiting time is deliberately prominent, because the failure mode of an autonomous system is not usually a bad decision, it is a handoff nobody picked up. Sorting by wait rather than by value keeps the oldest escalation from starving while everyone works the interesting deal. Dashboard to detail with no navigation in between is the same move the Review Queue makes with its last-decision column: summary and object in the same click.',
          sources: [
            { label: 'NNG: Progressive Disclosure', url: 'https://www.nngroup.com/articles/progressive-disclosure/' },
            { label: 'Laws of UX: Zeigarnik Effect', url: 'https://lawsofux.com/zeigarnik-effect/' }
          ],
          principles: ['Insight to Action', 'Queue Health', 'Progressive Disclosure']
        },
        {
          id: 'harvey-cc-5',
          x: 68.5,
          y: 66.5,
          label: '5',
          title: 'Guardrails are published on the dashboard, where the buyer looks',
          analysis: 'The bottom-right card lists what Harvey will never do on its own: never autonomous on IP assignment, non-compete, or data processing clauses; auto-pause when the playbook version changes; no memory generalises without a lawyer\'s approval; hard limit of six turns. Underneath sits the last global pause with who did it and why. Most products hide their constraints in documentation because constraints sound like weaknesses. For an agent negotiating on a company\'s behalf they are the product: the fastest route to letting an agent run unattended is to show precisely where it stops. This card is also the screenshot that gets pasted into a security review, so it is designed to be readable out of context.',
          sources: [
            { label: 'NIST AI Risk Management Framework', url: 'https://www.nist.gov/itl/ai-risk-management-framework' },
            { label: 'Microsoft HAX: Guidelines for Human-AI Interaction', url: 'https://www.microsoft.com/en-us/haxtoolkit/ai-guidelines/' }
          ],
          principles: ['Published Constraints', 'Trust by Limitation', 'Governance Artifact']
        }
      ]
    },
    {
      id: 'handoff',
      label: 'Handoff Rules',
      imageUrl: 'assets/screenshots/harvey/handoff.png',
      imageWidth: 1440,
      imageHeight: 900,
      context: 'Concept design · Where autonomy ends — the three triggers that give control back to a lawyer, and what that lawyer receives.',
      annotations: [
        {
          id: 'harvey-handoff-1',
          x: 29.5,
          y: 20,
          label: '1',
          title: 'The turn limit is a dial with its reasoning attached',
          analysis: '"Hand to a lawyer after 6 turns" is a stepper, and the sentence under it explains both the unit and the default: a turn is one redline exchanged with the counterparty, the median NDA closes in 3.1 of them, so six leaves Harvey room to counter twice and still hand over a warm deal. Defaults in an autonomy setting are policy, and policy that arrives without justification gets either blindly accepted or cargo-culted from a competitor. Showing the distribution the number came from lets a legal team argue with it — which is the point of exposing it at all. The sub-option ("only count turns where Harvey changed the document") exists because a counterparty who replies "thanks, reviewing" should not burn a turn.',
          sources: [
            { label: 'NNG: 10 Usability Heuristics', url: 'https://www.nngroup.com/articles/ten-usability-heuristics/' },
            { label: 'Google PAIR: Mental Models', url: 'https://pair.withgoogle.com/chapter/mental-models/' }
          ],
          principles: ['Explained Defaults', 'Configurable Autonomy', 'Defined Units']
        },
        {
          id: 'harvey-handoff-2',
          x: 39,
          y: 41,
          label: '2',
          title: 'A call request is a probabilistic trigger, so the threshold is exposed',
          analysis: 'Detecting "can we hop on a call?" is inference, not a fact in a database — the phrasing varies, a calendar link may or may not mean it, and the cost of a false positive (an unnecessary escalation) is not the cost of a false negative (a counterparty left waiting while a bot keeps emailing). So the rule ships with a confidence threshold the team can move and, crucially, a graceful degradation: below the threshold Harvey flags the thread in the queue rather than silently ignoring the signal. Designing the uncertain case explicitly is what separates an agent people keep running from one they switch off after the first embarrassment. The Slack notification option acknowledges the same reality — a handoff that only exists inside this product is a handoff that waits until someone logs in.',
          sources: [
            { label: 'Google PAIR: Errors + Graceful Failure', url: 'https://pair.withgoogle.com/chapter/errors-failing/' },
            { label: 'Microsoft HAX: Guidelines for Human-AI Interaction', url: 'https://www.microsoft.com/en-us/haxtoolkit/ai-guidelines/' }
          ],
          principles: ['Uncertainty Made Visible', 'Graceful Degradation', 'Notification Reach']
        },
        {
          id: 'harvey-handoff-3',
          x: 19,
          y: 61.5,
          label: '3',
          title: 'Acceptance is a handoff too — Harvey never executes',
          analysis: 'The third trigger fires on success: when the counterparty accepts, the NDA routes to a lawyer instead of straight to signature. The default is the middle option — escalate only if any clause deviated from the playbook — so clean deals close without ceremony while edited ones get a human read before execution. The third option, "never, auto-route to signature", exists but is not the default, because the moment a document is executed the undo button stops working. This is the asymmetry that should govern every autonomy setting: the agent may act freely where actions are reversible and must stop where they are not. The line beneath states the invariant plainly — Harvey never sends a document for signature on its own — so the boundary survives however the toggles are set.',
          sources: [
            { label: 'EU AI Act, Article 14: Human Oversight', url: 'https://artificialintelligenceact.eu/article/14/' },
            { label: 'NNG: User Control and Freedom', url: 'https://www.nngroup.com/articles/user-control-and-freedom/' }
          ],
          principles: ['Irreversible Actions Need Humans', 'Safe Defaults', 'Invariant Boundaries']
        },
        {
          id: 'harvey-handoff-4',
          x: 82,
          y: 43,
          label: '4',
          title: 'Simulation before save — the rules are replayed on the last 30 days',
          analysis: 'Changing a threshold changes how much work lands on a team of three lawyers, and nobody can estimate that from a number. So the right rail replays the proposed rules against the last 186 NDAs and states the outcome in staffing terms: escalations 22% → 27%, nine more NDAs, autonomy rate down five points. The caveat is printed rather than buried — the replay assumes counterparty behaviour is unchanged — because a simulation that overstates its own certainty is worse than none. Consequence preview is an old idea in interface design (print preview, dry-run flags, "this will affect 412 records"), and it applies with more force here: the settings screen of an autonomous system is the highest-leverage screen in the product, and it is usually the least designed.',
          sources: [
            { label: 'NNG: 10 Usability Heuristics', url: 'https://www.nngroup.com/articles/ten-usability-heuristics/' },
            { label: 'Google PAIR: Explainability + Trust', url: 'https://pair.withgoogle.com/chapter/explainability-trust/' }
          ],
          principles: ['Consequence Preview', 'Error Prevention', 'Honest Uncertainty']
        },
        {
          id: 'harvey-handoff-5',
          x: 68.5,
          y: 78,
          label: '5',
          title: 'The handoff brief — the lawyer starts at turn 6, not turn 0',
          analysis: 'What a lawyer receives is designed as carefully as what the agent does: the open issue in one line, the position Harvey has been holding and why, the citations it relied on, and a recommended next move — plus every prior turn one click away for anyone who wants to check. A handoff that dumps a thread and says "over to you" throws away the six turns of context that were the point of running the agent at all. The two buttons make control bidirectional: Take over, or Send back to Harvey with a note, which becomes an instruction the agent carries into the next turn. Control that only flows one way is abdication; this pattern makes the lawyer the escalation path and the teacher in the same interaction.',
          sources: [
            { label: 'Google PAIR: Feedback + Control', url: 'https://pair.withgoogle.com/chapter/feedback-controls/' },
            { label: 'NNG: Recognition Rather Than Recall', url: 'https://www.nngroup.com/articles/recognition-and-recall/' }
          ],
          principles: ['Context Transfer', 'Bidirectional Control', 'Recognition over Recall']
        },
        {
          id: 'harvey-handoff-6',
          x: 63,
          y: 80,
          label: '6',
          title: 'Clause-level guardrails that no turn count can override',
          analysis: 'Below the three triggers sits a list of clause types that always escalate regardless of turn, confidence, or how well the negotiation is going: IP assignment, non-compete, data processing, indemnity above a cap. Turn-based rules are about patience; these are about category risk, and conflating the two is how autonomous systems drift. Harvey still drafts a recommendation for each — the work is done, it simply is not sent — so the guardrail costs the lawyer a review rather than an hour of drafting. Keeping the list editable and visible on the same screen as the thresholds means one page answers the question every general counsel asks first: what can this thing do without asking me?',
          sources: [
            { label: 'NIST AI Risk Management Framework', url: 'https://www.nist.gov/itl/ai-risk-management-framework' },
            { label: 'ABA Model Rules of Professional Conduct', url: 'https://www.americanbar.org/groups/professional_responsibility/publications/model_rules_of_professional_conduct/' }
          ],
          principles: ['Category Guardrails', 'Defence in Depth', 'Draft but Do Not Send']
        }
      ]
    }
  ]
};
