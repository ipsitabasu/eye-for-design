export default {
  id: 'linear',
  name: 'Linear',
  tagline: 'Issue tracking built for speed',
  accentColor: '#5E6AD2',
  screens: [
    {
      id: 'inbox',
      label: 'Inbox',
      imageUrl: 'assets/screenshots/linear/inbox.png',
      imageWidth: 1440,
      imageHeight: 900,
      context: 'The first screen users land on — surfaces unread notifications and action items without requiring navigation.',
      annotations: [
        {
          id: 'linear-inbox-1',
          x: 6.5,
          y: 38,
          label: '1',
          title: 'Icon-only sidebar at rest',
          analysis: 'Linear collapses the global sidebar to icon-only by default. This is a deliberate application of progressive disclosure: the full labels are available via hover or expanding the rail, but hidden until needed. The result is more horizontal room for the content that actually matters — the issue list — without losing navigational orientation. Users who know where they are don\'t need the label; those who are learning can hover to reveal it.',
          sources: [
            { label: 'NNG: Progressive Disclosure', url: 'https://www.nngroup.com/articles/progressive-disclosure/' },
            { label: 'NNG: Icon Usability', url: 'https://www.nngroup.com/articles/icon-usability/' }
          ],
          principles: ['Progressive Disclosure', 'Spatial Memory', 'Visual Hierarchy']
        },
        {
          id: 'linear-inbox-2',
          x: 50,
          y: 12,
          label: '2',
          title: 'Grouped, scannable notification rows',
          analysis: 'Inbox items are grouped by issue, not by notification type. This matches how a developer\'s mental model works: "what happened to issue ENG-412?" rather than "what did Alice comment on?". Each row shows just enough — title, actor, timestamp — and relies on a single click to expand. This is Miller\'s Law in practice: chunking related signals into one scannable row rather than exploding them into separate items.',
          sources: [
            { label: 'Laws of UX: Miller\'s Law', url: 'https://lawsofux.com/millers-law/' },
            { label: 'NNG: Chunking', url: 'https://www.nngroup.com/articles/chunking/' }
          ],
          principles: ['Miller\'s Law', 'Information Scent', 'Cognitive Load']
        },
        {
          id: 'linear-inbox-3',
          x: 88,
          y: 19,
          label: '3',
          title: 'Done / Archive actions at the row level',
          analysis: 'Hovering a notification reveals "Done" and "Snooze" actions inline, without a modal or separate page. This is direct manipulation: the action lives where the object lives. Linear avoids the common antipattern of sending users to a separate "notification settings" page to triage their inbox. The Doherty Threshold (< 400ms response time) is met because the action is instant and the item disappears immediately, giving satisfying closure.',
          sources: [
            { label: 'Laws of UX: Doherty Threshold', url: 'https://lawsofux.com/doherty-threshold/' },
            { label: 'NNG: Direct Manipulation', url: 'https://www.nngroup.com/articles/direct-manipulation/' }
          ],
          principles: ['Direct Manipulation', 'Doherty Threshold', 'Efficiency']
        },
        {
          id: 'linear-inbox-4',
          x: 50,
          y: 96,
          label: '4',
          title: '⌘K command palette hint',
          analysis: 'The keyboard shortcut hint is persistently visible at the bottom of the UI — a quiet but powerful teacher. Rather than burying power-user features in a help doc or onboarding modal, Linear surfaces them at the moment the user has run out of content to look at (the bottom). This is sometimes called "progressive onboarding": the system teaches as the user gains confidence, not before.',
          sources: [
            { label: 'NNG: Progressive Disclosure in Interfaces', url: 'https://www.nngroup.com/articles/progressive-disclosure/' }
          ],
          principles: ['Progressive Disclosure', 'Learnability', 'Expert Efficiency']
        }
      ]
    },
    {
      id: 'issues',
      label: 'Issue Detail',
      imageUrl: 'assets/screenshots/linear/issues.png',
      imageWidth: 1440,
      imageHeight: 900,
      context: 'The core workspace — where teams spend the majority of their time writing, triaging, and updating issues.',
      annotations: [
        {
          id: 'linear-issues-1',
          x: 72,
          y: 18,
          label: '1',
          title: 'Metadata in a right-rail, not inline',
          analysis: 'Status, priority, assignee, cycle, and label all live in a structured right column, never interrupting the prose of the issue description. This respects the "F-pattern" reading behavior: users scan the left side for the narrative, and look right only when they need to act on metadata. Mixing metadata inline with prose (as many tools do) forces eye movement that breaks reading flow.',
          sources: [
            { label: 'NNG: F-Pattern Scanning', url: 'https://www.nngroup.com/articles/f-shaped-pattern-reading-web-content/' },
            { label: 'NNG: Layered Information Architecture', url: 'https://www.nngroup.com/articles/ia-vs-navigation/' }
          ],
          principles: ['F-Pattern', 'Visual Hierarchy', 'Cognitive Load']
        },
        {
          id: 'linear-issues-2',
          x: 35,
          y: 35,
          label: '2',
          title: 'Markdown-rendered description',
          analysis: 'The issue body renders markdown immediately — no "preview" tab required. This is a common but important UX decision: forcing users into a separate preview mode adds friction and breaks the creative flow of writing. Rendering inline signals that the product trusts users and respects their time. The editing affordance (pencil icon) appears on hover, keeping the surface clean at rest.',
          sources: [
            { label: 'NNG: Efficiency of Use', url: 'https://www.nngroup.com/articles/efficiency-vs-effectiveness/' }
          ],
          principles: ['Efficiency', 'Direct Manipulation', 'WYSIWYG']
        },
        {
          id: 'linear-issues-3',
          x: 72,
          y: 55,
          label: '3',
          title: 'Compact status selector',
          analysis: 'Clicking "Status" opens a small dropdown with all states, not a modal. Each state has a distinct icon shape and color, not just a label — this is redundant coding, where both color and shape carry the same meaning. This matters for accessibility and for glanceability: users can distinguish "In Progress" from "Done" even while focused elsewhere on the page.',
          sources: [
            { label: 'NNG: Redundant Coding', url: 'https://www.nngroup.com/articles/color-enhance-design/' }
          ],
          principles: ['Redundant Coding', 'Accessibility', 'Fitts\'s Law']
        },
        {
          id: 'linear-issues-4',
          x: 35,
          y: 80,
          label: '4',
          title: 'Activity log with comment thread',
          analysis: 'All changes — status updates, assignments, comments — appear in a single chronological log. This gives the issue a full audit trail without separate tabs for "history" and "comments". Users can follow the narrative of an issue\'s life without switching contexts. The mild visual distinction between automated events (status changed) and human comments (avatar-led) maintains parsability.',
          sources: [
            { label: 'NNG: Visibility of System Status', url: 'https://www.nngroup.com/articles/ten-usability-heuristics/' }
          ],
          principles: ['Visibility of System Status', 'Audit Trail', 'Narrative Cohesion']
        }
      ]
    },
    {
      id: 'cycles',
      label: 'Cycles',
      imageUrl: 'assets/screenshots/linear/cycles.png',
      imageWidth: 1440,
      imageHeight: 900,
      context: 'Linear\'s version of sprints — designed to feel lighter-weight and less ceremonial than traditional sprint tooling.',
      annotations: [
        {
          id: 'linear-cycles-1',
          x: 50,
          y: 22,
          label: '1',
          title: 'Progress bar as primary status signal',
          analysis: 'Each cycle has a prominent horizontal progress bar showing completion percentage. This is a direct application of the Gestalt principle of continuity — the bar is pre-attentive: users grasp the state of the cycle before they\'ve consciously processed any text. Status numbers (12/28 issues) appear alongside but are secondary to the visual.',
          sources: [
            { label: 'Laws of UX: Pre-attentive Processing', url: 'https://lawsofux.com/aesthetic-usability-effect/' },
            { label: 'NNG: Data Visualization', url: 'https://www.nngroup.com/articles/data-visualization-for-teams/' }
          ],
          principles: ['Pre-attentive Attributes', 'Gestalt: Continuity', 'Status Visibility']
        },
        {
          id: 'linear-cycles-2',
          x: 50,
          y: 50,
          label: '2',
          title: 'Active / Upcoming / Completed tabs',
          analysis: 'Cycles are partitioned into three clearly labeled time states. This solves a real problem in sprint tools: "where is the last sprint\'s data?" The consistent tab pattern (same as issues, projects) means users transfer their mental model from one area of Linear to another — this is Jakob\'s Law: familiarity from one part of the product reduces the learning cost in another.',
          sources: [
            { label: 'Laws of UX: Jakob\'s Law', url: 'https://lawsofux.com/jakobs-law/' }
          ],
          principles: ['Jakob\'s Law', 'Consistency', 'Mental Model Transfer']
        },
        {
          id: 'linear-cycles-3',
          x: 82,
          y: 38,
          label: '3',
          title: 'Scope creep indicator',
          analysis: 'Issues added after the cycle started appear with a subtle "added after start" badge. This is a small but sophisticated design decision: it surfaces information that was previously invisible in most PM tools, enabling teams to reason about whether their cycle was well-scoped or if scope crept. Making invisible data visible is one of the highest-leverage things a product interface can do.',
          sources: [
            { label: 'NNG: Visibility Heuristic', url: 'https://www.nngroup.com/articles/ten-usability-heuristics/' }
          ],
          principles: ['Visibility of System Status', 'Sensemaking', 'Data Transparency']
        }
      ]
    }
  ]
};
