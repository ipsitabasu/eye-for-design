export default {
  id: 'notion',
  name: 'Notion',
  tagline: 'The all-in-one workspace',
  accentColor: '#E8572A',
  screens: [
    {
      id: 'editor',
      label: 'Editor',
      imageUrl: 'assets/screenshots/notion/editor.png',
      imageWidth: 1440,
      imageHeight: 900,
      context: 'The core document editor — where most Notion users spend the majority of their time.',
      annotations: [
        {
          id: 'notion-editor-1',
          x: 50,
          y: 28,
          label: '1',
          title: 'The distraction-free canvas: "broccoli hidden in sugar"',
          analysis: 'The wide centered text column with empty margins is not an accident — it\'s the product\'s founding philosophy made physical. Ivan Zhao\'s public pitch for Notion was what he called "sugar-coated broccoli": hide an ambitious vision (give anyone the ability to build their own software tools) inside something people already recognize (a document editor). The blank canvas is the sugar. The blocks, databases, and relational logic underneath are the broccoli. Zhao told Lenny\'s Podcast this was the core insight from near-failure: "Nobody wants app-building software, but everyone wants to get work done." The editor\'s simplicity is how Notion gets users in the door before they realize how deep it goes.',
          sources: [
            { label: 'Lenny\'s Newsletter: Inside Notion — Ivan Zhao', url: 'https://www.lennysnewsletter.com/p/inside-notion-ivan-zhao' },
            { label: 'Figma Blog: How Notion Pulled Back from the Brink', url: 'https://www.figma.com/blog/design-on-a-deadline-how-notion-pulled-itself-back-from-the-brink-of-failure/' }
          ],
          principles: ['Progressive Complexity', 'Product Strategy as UX', 'Aesthetic-Usability Effect']
        },
        {
          id: 'notion-editor-2',
          x: 8,
          y: 52,
          label: '2',
          title: 'The "/" command: from IRC to everywhere',
          analysis: 'Typing "/" anywhere opens a block insertion menu. The slash-as-command pattern originates from IRC (Internet Relay Chat), invented by Jarkko Oikarinen in Finland in 1988. Slack popularized it in consumer chat in 2013. Notion adapted it for something different and genuinely novel: in-document block selection. This was the key UX innovation — not inventing the slash, but applying it to a new context. The result: Coda, Confluence, Linear, Craft, and dozens of other tools have since copied Notion\'s specific implementation. Ivan Zhao\'s design philosophy (from the Designer Founders Substack): "Go crazy with permutations. If the taste is there, you can churn out versions until you find the best one." The "/" command was the best one, arrived at through iteration.',
          sources: [
            { label: 'Designer Founders Substack: The Ivanisms', url: 'https://designerfounders.substack.com/p/ivan-zhao-notion' },
            { label: 'NNG: Command Palettes', url: 'https://www.nngroup.com/articles/command-palettes/' }
          ],
          principles: ['Mental Model Transfer', 'Scalable Affordances', 'Jakob\'s Law']
        },
        {
          id: 'notion-editor-3',
          x: 50,
          y: 68,
          label: '3',
          title: 'Block drag handles: Engelbart\'s vision, 55 years later',
          analysis: 'The drag handle (⠿) that appears to the left of each block on hover is a direct expression of Ivan Zhao\'s intellectual heroes. Zhao has publicly named Douglas Engelbart — inventor of the mouse and author of "Augmenting Human Intellect" (1962) — as Notion\'s "patron saint." The block architecture is Engelbart\'s vision of dynamic knowledge units made product: "If everything is a block, and blocks can be any type, and blocks can be nested, then you\'ve built a language." The drag handle is direct manipulation at the content unit level — users can reorganize knowledge by dragging, which maps to how we actually think about information. The handle is hidden at rest so it doesn\'t clutter reading.',
          sources: [
            { label: 'Notion Blog: The Data Model Behind Notion', url: 'https://www.notion.com/blog/data-model-behind-notion' },
            { label: 'Notion Webinar: Ivan Zhao + Alan Kay', url: 'https://www.notion.com/webinars/how-to-build-tools-that-shape-civilizations-alan-kay-and-ivan-zhao' }
          ],
          principles: ['Direct Manipulation', 'Hover Disclosure', 'Block Architecture']
        },
        {
          id: 'notion-editor-4',
          x: 50,
          y: 8,
          label: '4',
          title: 'Page emoji + cover: the Picture Superiority Effect at work',
          analysis: 'Each page can have an emoji icon and a cover image. These seem decorative, but they serve a functional navigation role that compounds across a large workspace. When a user has 80+ pages in their sidebar, a distinct 🎯 emoji for their goals page and a 🗄️ for the database is processed in milliseconds — far faster than reading text titles. This is the Picture Superiority Effect: images are encoded and retrieved from memory roughly 60,000x faster than words. For Notion specifically, this matters because the sidebar can become overwhelming. Zhao\'s design philosophy from Lenny\'s: "Designers spend too much time on edge cases. What matters is the dumbest path." The emoji icon is the dumbest possible navigation improvement — and it works.',
          sources: [
            { label: 'Designer Founders Substack: The Ivanisms', url: 'https://designerfounders.substack.com/p/ivan-zhao-notion' }
          ],
          principles: ['Picture Superiority Effect', 'Recognition over Recall', 'Visual Wayfinding']
        }
      ]
    },
    {
      id: 'database',
      label: 'Database',
      imageUrl: 'assets/screenshots/notion/database.png',
      imageWidth: 1440,
      imageHeight: 900,
      context: 'Notion\'s most powerful feature — data that can be viewed as a table, board, calendar, timeline, or gallery.',
      annotations: [
        {
          id: 'notion-database-1',
          x: 50,
          y: 10,
          label: '1',
          title: 'Six views of the same data: cognitive fit over feature count',
          analysis: 'The same database can be viewed as Table, Board, Calendar, Timeline, List, or Gallery. Switching views requires one click; the underlying data never changes. This is the block architecture\'s killer application: the representation changes, but the truth doesn\'t. Notion\'s March 2016 launch (after the Kyoto rebuild) introduced the block model specifically to make this possible. The cognitive science principle is "cognitive fit": people reason more accurately when the data format matches the mental task. A project manager tracking status needs a Board. A content editor tracking publish dates needs a Calendar. Forcing everyone into a spreadsheet is a design failure that most tools accept as inevitable. Notion made it optional.',
          sources: [
            { label: 'Contrary Research: Notion Business Breakdown', url: 'https://research.contrary.com/company/notion' }
          ],
          principles: ['Cognitive Fit', 'Multiple Representations', 'Block Architecture']
        },
        {
          id: 'notion-database-2',
          x: 25,
          y: 55,
          label: '2',
          title: 'Inline cell editing: no "edit mode" means no mode friction',
          analysis: 'Click any cell and it becomes immediately editable. No "Edit" button, no separate details page, no mode switch required. This is direct manipulation at the cell level — the display and edit state are unified. Contrast with Jira or older Confluence, where editing a field requires navigating to a detail page. The friction difference compounds: if a PM updates 10 issues in a standup review, Notion might require 10 clicks while Jira might require 50. Notion\'s approach here reflects Ivan Zhao\'s principle on the "golden path" — optimizing ruthlessly for the 80% case (scanning + quick edits) rather than the 20% case (complex structured forms).',
          sources: [
            { label: 'Designer Founders Substack: The Ivanisms', url: 'https://designerfounders.substack.com/p/ivan-zhao-notion' },
            { label: 'NNG: Direct Manipulation', url: 'https://www.nngroup.com/articles/direct-manipulation/' }
          ],
          principles: ['Direct Manipulation', 'Mode Reduction', 'Golden Path Optimization']
        },
        {
          id: 'notion-database-3',
          x: 72,
          y: 90,
          label: '3',
          title: 'Filter chips: making invisible query visible',
          analysis: 'Active filters appear as chips above the database — always visible, each with an "×" to remove. This is Visibility of System Status applied to data tools specifically: users always know what data they\'re looking at and why some rows are missing. The transparency of active filters is more important than it seems. In tools where filters are hidden in a dropdown, users frequently forget they applied a filter, become confused by missing data, and waste time hunting for the cause. Notion\'s chips make the query legible at a glance. Applied to onboarding: Notion\'s team studied how new users got confused, and filter visibility was one of the highest-impact fixes in reducing early-stage churn.',
          sources: [
            { label: 'Appcues: Notion\'s Lightweight Onboarding', url: 'https://goodux.appcues.com/blog/notions-lightweight-onboarding' }
          ],
          principles: ['Visibility of System Status', 'Filter Transparency', 'Confusion Prevention']
        }
      ]
    },
    {
      id: 'sidebar',
      label: 'Sidebar',
      imageUrl: 'assets/screenshots/notion/sidebar.png',
      imageWidth: 1440,
      imageHeight: 900,
      context: 'Global navigation — where users orient themselves and move between pages in a workspace.',
      annotations: [
        {
          id: 'notion-sidebar-1',
          x: 11,
          y: 38,
          label: '1',
          title: 'Infinite nesting: powerful and dangerous',
          analysis: 'Pages can nest to unlimited depth in the sidebar. This is the product\'s defining design tension. Unlimited nesting gives sophisticated users extraordinary flexibility — engineering teams build complete wikis, product teams build full roadmap systems. But for new users, it\'s paralyzing. Notion\'s own data showed blank canvas churn was a major problem, which led to the personalized onboarding templates they introduced in 2022. Ivan Zhao\'s McLuhan reference is instructive here: he explicitly invokes "We shape our tools, and thereafter our tools shape us." Notion\'s bet is that even if the sidebar becomes messy, users who stay long enough develop personal organizational systems that become deeply embedded in their work.',
          sources: [
            { label: 'Lenny\'s Newsletter: Inside Notion — Ivan Zhao', url: 'https://www.lennysnewsletter.com/p/inside-notion-ivan-zhao' }
          ],
          principles: ['Flexibility vs. Learnability', 'End-User IA', 'Blank Canvas Problem']
        },
        {
          id: 'notion-sidebar-2',
          x: 11,
          y: 60,
          label: '2',
          title: 'Hover-revealed actions: the right thing hidden until needed',
          analysis: 'Each page in the sidebar reveals "..." and "+" buttons on hover. At rest, the sidebar shows only title and emoji — clean and scannable. This is hover disclosure: secondary actions hidden until the user signals intent by hovering. The hierarchy is correct: navigating to pages is primary (always visible); creating subpages and managing pages are secondary (revealed on demand). The mistake most tools make is showing all actions all the time, which creates visual noise that slows the primary task. Notion\'s team learned this through the Kyoto rebuild. Zhao told Figma\'s blog: Ivan spent 18+ hours a day in Figma during that period, visible at the top of their active-user list, "pumping out version after version." The hover pattern emerged from that iteration.',
          sources: [
            { label: 'Figma Blog: How Notion Pulled Back from the Brink', url: 'https://www.figma.com/blog/design-on-a-deadline-how-notion-pulled-itself-back-from-the-brink-of-failure/' }
          ],
          principles: ['Hover Disclosure', 'Progressive Disclosure', 'Visual Hierarchy']
        },
        {
          id: 'notion-sidebar-3',
          x: 11,
          y: 82,
          label: '3',
          title: 'Teamspaces vs Private: mental model alignment reduces anxiety',
          analysis: 'The sidebar is divided into "Teamspaces" (shared) and "Private" (personal). This is an information architecture decision that mirrors the mental model most knowledge workers already have: "this is my stuff, that is our stuff." The visual separation prevents one of the highest-anxiety moments in collaborative tools: accidentally sharing something private. Notion\'s personalized onboarding research (documented by Candu and Appcues) found that clarity about permissions and sharing was one of the top factors in new-user confidence. Zhao\'s design principle: "The golden path — the main flow that 80% of people will take." For a new Notion user, the golden path requires knowing immediately: is this page mine or everyone\'s?',
          sources: [
            { label: 'Candu: How Notion Crafts Personalized Onboarding', url: 'https://www.candu.ai/blog/how-notion-crafts-a-personalized-onboarding-experience-6-lessons-to-guide-new-users' }
          ],
          principles: ['Mental Model Alignment', 'Permission Clarity', 'Anxiety Reduction']
        }
      ]
    }
  ]
};
