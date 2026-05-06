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
      context: 'The default landing screen — surfaces what needs your attention without requiring navigation.',
      annotations: [
        {
          id: 'linear-inbox-1',
          x: 3.2,
          y: 42,
          label: '1',
          title: 'Icon-only sidebar — the anti-Jira manifesto',
          analysis: 'Karri Saarinen (Linear\'s CEO and designer) built this product out of pure frustration. His exact words from Figma Config 2025: "I\'ve always been frustrated with how bad the commonly used tools are in this market. Why are they so slow? Why is everything so complex?" The collapsed icon-only sidebar is the direct answer. Linear bets that developers using the product daily build spatial memory — they know Issues is at position 3 without needing the label. Labels appear on hover for anyone who needs them. This is the same pattern as VS Code\'s activity bar, which Linear\'s ICP already lived in for hours every day. The design borrows a mental model users already have, then removes every pixel that isn\'t earning its place.',
          sources: [
            { label: 'Figma Blog: Karri Saarinen\'s 10 Rules', url: 'https://www.figma.com/blog/karri-saarinens-10-rules-for-crafting-products-that-stand-out/' },
            { label: 'Lenny\'s Newsletter: Inside Linear', url: 'https://www.lennysnewsletter.com/p/inside-linear-building-with-taste' }
          ],
          principles: ['Progressive Disclosure', 'Spatial Memory', 'Mental Model Transfer']
        },
        {
          id: 'linear-inbox-2',
          x: 50,
          y: 16,
          label: '2',
          title: 'Grouped by issue, not by person',
          analysis: 'Most notification feeds group by actor: "Alice commented, Bob changed status." Linear groups by issue instead. This reflects a deep understanding of how engineers actually think: "What happened to ENG-412 today?" — not "What did everyone do today?" It sounds like a small data structure choice, but it\'s actually a statement of values: Linear was built by engineers for engineers, with the founders as their own first customers. Karri Saarinen told First Round Capital: "We were the first ideal customer. So we just had to build something nice for ourselves that actually worked." When you design for yourself with real discipline, you catch things outsiders never would.',
          sources: [
            { label: 'First Round Review: Linear\'s Path to PMF', url: 'https://review.firstround.com/linears-path-to-product-market-fit/' }
          ],
          principles: ['User Mental Model', 'Information Architecture', 'Jobs-to-be-Done']
        },
        {
          id: 'linear-inbox-3',
          x: 90,
          y: 30,
          label: '3',
          title: 'Mark done in one keystroke — inbox-zero culture built in',
          analysis: 'Hovering a notification reveals "Done" and "Snooze" actions. Pressing D marks it done instantly. This is direct manipulation at the notification level — the action lives where the object lives, with no modal, no confirmation, no page redirect. But the deeper story is cultural: Linear\'s inbox is built around inbox-zero, the ritual that many engineers already practice with email. Linear didn\'t invent the habit — they borrowed it. This is Jakob\'s Law applied strategically: people spend most of their time in other products, so products that import familiar interaction patterns win faster than those that invent new ones.',
          sources: [
            { label: 'Laws of UX: Jakob\'s Law', url: 'https://lawsofux.com/jakobs-law/' },
            { label: 'NNG: Direct Manipulation', url: 'https://www.nngroup.com/articles/direct-manipulation/' }
          ],
          principles: ['Jakob\'s Law', 'Direct Manipulation', 'Habit Import']
        },
        {
          id: 'linear-inbox-4',
          x: 50,
          y: 96,
          label: '4',
          title: '⌘K hint: teaching power users passively',
          analysis: 'The command palette shortcut sits quietly at the bottom of the screen — visible when there\'s nothing else to look at. This is one of the most underrated UX patterns in Linear\'s design: passive progressive onboarding. Instead of a modal that explains keyboard shortcuts on Day 1 (which users dismiss and forget), the hint surfaces when users have run out of active content to process. Linear runs on $35K in total paid marketing spend in its entire history, with 80% of growth product-led (per Aakash Gupta\'s growth analysis). The keyboard-first design isn\'t just a UX choice — it\'s a growth mechanic. Engineers tweet about it. Word-of-mouth spreads among technical teams who value speed.',
          sources: [
            { label: 'Aakash Gupta: How Linear Grows', url: 'https://www.news.aakashg.com/p/how-linear-grows' },
            { label: 'NNG: Progressive Disclosure', url: 'https://www.nngroup.com/articles/progressive-disclosure/' }
          ],
          principles: ['Progressive Disclosure', 'Product-Led Growth', 'Expert Efficiency']
        }
      ]
    },
    {
      id: 'issues',
      label: 'Issue Detail',
      imageUrl: 'assets/screenshots/linear/issues.png',
      imageWidth: 1440,
      imageHeight: 900,
      context: 'The core workspace — where teams spend most of their time triaging, writing, and updating issues.',
      annotations: [
        {
          id: 'linear-issues-1',
          x: 68,
          y: 22,
          label: '1',
          title: 'Right-rail metadata — F-pattern reading respected',
          analysis: 'Status, priority, assignee, and label all live in a right column. The prose of the issue description runs freely on the left. This respects NNG\'s research on F-pattern scanning: users read left-to-right, top-heavy, with the right side reserved for supporting detail. Mixing metadata inline with prose — which many tools do — forces constant eye movement that breaks reading flow. Linear\'s layout decision seems obvious once you see it, which is the hallmark of good design. But it required a conscious choice to not "maximize information density" — a temptation most PM tools fall into. Linear published this philosophy publicly as "The Linear Method": focused work requires an uncluttered surface.',
          sources: [
            { label: 'The Linear Method', url: 'https://linear.app/method' },
            { label: 'NNG: F-Pattern Scanning', url: 'https://www.nngroup.com/articles/f-shaped-pattern-reading-web-content/' }
          ],
          principles: ['F-Pattern', 'Visual Hierarchy', 'Focused Work Design']
        },
        {
          id: 'linear-issues-2',
          x: 35,
          y: 38,
          label: '2',
          title: 'No "preview" tab — WYSIWYG Markdown is a trust statement',
          analysis: 'Linear renders Markdown immediately as you type — no separate "preview" tab required. This is rare in issue trackers (Jira, GitHub Issues still use a write/preview split). The design decision signals trust in the user: they don\'t need to switch modes to verify their work. It also dramatically reduces friction for the primary workflow (writing an issue description). The editing affordance (pencil icon) appears on hover, keeping the surface clean at rest — a "progressive disclosure at the element level" pattern. Jori Lallo\'s founding insight was that flexible software that forces users to switch modes constantly creates cognitive overhead at scale. Every mode-switch is a micro-interruption.',
          sources: [
            { label: 'Eleken: Linear App Case Study', url: 'https://www.eleken.co/blog-posts/linear-app-case-study' }
          ],
          principles: ['WYSIWYG', 'Direct Manipulation', 'Mode Reduction']
        },
        {
          id: 'linear-issues-3',
          x: 70,
          y: 52,
          label: '3',
          title: 'Status selector with shape + color — redundant coding for glanceability',
          analysis: 'Each status (Todo, In Progress, Done, Cancelled) has a distinct icon shape and a distinct color. This is redundant coding: the same meaning is carried by two visual channels simultaneously. Redundant coding matters because color alone fails for colorblind users and shape alone is slow to parse at a distance. Using both means the status of 20 issues is legible in a single glance — no reading required. This is pre-attentive attribute design, borrowed from the information visualization tradition (Edward Tufte, Stephen Few). Linear\'s team had design pedigree — Saarinen led Airbnb\'s Design Language System and built the Lottie animation library — and it shows in these small, principled decisions.',
          sources: [
            { label: 'NNG: Redundant Coding', url: 'https://www.nngroup.com/articles/color-enhance-design/' }
          ],
          principles: ['Redundant Coding', 'Pre-attentive Attributes', 'Accessibility']
        },
        {
          id: 'linear-issues-4',
          x: 35,
          y: 82,
          label: '4',
          title: 'Unified activity log — history and comments as one narrative',
          analysis: 'Status changes, assignments, and comments all appear in a single chronological stream. Most tools separate these into "History" and "Comments" tabs, which forces users to context-switch to reconstruct the full story of an issue. Linear\'s unified log means you can follow the life of any issue — from creation to close — without clicking. This reflects Nielsen\'s Visibility of System Status heuristic at a high level: the product makes its own state transparent so users always know what happened and when. For engineering teams doing incident reviews or retrospectives, this log becomes the source of truth.',
          sources: [
            { label: 'NNG: 10 Usability Heuristics', url: 'https://www.nngroup.com/articles/ten-usability-heuristics/' }
          ],
          principles: ['Visibility of System Status', 'Unified Narrative', 'Audit Transparency']
        }
      ]
    },
    {
      id: 'cycles',
      label: 'Cycles',
      imageUrl: 'assets/screenshots/linear/cycles.png',
      imageWidth: 1440,
      imageHeight: 900,
      context: 'Linear\'s version of sprints — lighter-weight and less ceremonial than traditional sprint tooling.',
      annotations: [
        {
          id: 'linear-cycles-1',
          x: 50,
          y: 25,
          label: '1',
          title: 'Progress bar as primary status — pre-attentive before conscious',
          analysis: 'Each cycle shows a horizontal progress bar displaying completion percentage before any text. This is a deliberate application of pre-attentive processing: the brain registers a half-filled bar as "in progress" before conscious reading begins. Status in numbers (12/28 issues) is present but secondary. This distinction matters in practice: when a head of engineering looks at 6 active cycles, she needs the status of each in under a second. A progress bar delivers that; a table of numbers does not. Linear\'s entire visual language is built around the principle that information used for monitoring should be faster to read than information used for editing.',
          sources: [
            { label: 'Pragmatic Engineer: Story of Linear with Tuomas Artman', url: 'https://newsletter.pragmaticengineer.com/p/linear' }
          ],
          principles: ['Pre-attentive Attributes', 'Monitoring vs Editing', 'Data Visualization']
        },
        {
          id: 'linear-cycles-2',
          x: 50,
          y: 52,
          label: '2',
          title: 'Active / Upcoming / Completed — answering "where is the last sprint?"',
          analysis: 'Cycles are partitioned into three time-state tabs, solving a real and frustrating problem: in most sprint tools, previous sprints are hard to find. The consistent tab pattern (same as Issues, Projects, Views) means users transfer their mental model across every part of Linear — this is Jakob\'s Law working at a product architecture level. Linear keeps its surface area deliberately small: Jori Lallo\'s founding rule was "one really good way of doing things." Fewer patterns, more mastery. Aakash Gupta noted in his analysis of Linear\'s growth that the company operates with only 2 PMs for 18,000+ paying customers — a product so well-designed that support and education cost is near zero.',
          sources: [
            { label: 'Aakash Gupta: How Linear Grows', url: 'https://www.news.aakashg.com/p/how-linear-grows' },
            { label: 'Laws of UX: Jakob\'s Law', url: 'https://lawsofux.com/jakobs-law/' }
          ],
          principles: ['Jakob\'s Law', 'Consistent Patterns', 'Wayfinding']
        },
        {
          id: 'linear-cycles-3',
          x: 82,
          y: 40,
          label: '3',
          title: 'Scope creep badge — making invisible data visible',
          analysis: 'Issues added after the cycle started are flagged with a subtle "added after start" marker. This surfaces a data point that was invisible in every major project tool before Linear: did this cycle\'s scope hold? This is one of the highest-leverage things a product interface can do — make invisible organizational behavior visible so teams can reflect on it. Karri Saarinen\'s Figma Config 2025 talk centered on this principle: "If you want to build a culture of quality, you have to make quality measurable." Linear\'s scope creep badge does for sprint health what a step counter does for fitness — it doesn\'t force behavior change, but it makes the data undeniable.',
          sources: [
            { label: 'Figma Blog: Karri Saarinen\'s 10 Rules', url: 'https://www.figma.com/blog/karri-saarinens-10-rules-for-crafting-products-that-stand-out/' }
          ],
          principles: ['Data Transparency', 'Behavioral Nudge', 'Visibility of System Status']
        }
      ]
    }
  ]
};
