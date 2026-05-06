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
          y: 30,
          label: '1',
          title: 'Distraction-free writing surface',
          analysis: 'Notion\'s editor defaults to a wide, centered text column with significant margins and no visible UI chrome. This is a direct design choice to support deep focus work. The "empty" space is not wasted — it is a signal that this is a space for thinking, not a dashboard for monitoring. The principle at play is "progressive reduction": UI elements appear only when the user needs them (on hover or on /).',
          sources: [
            { label: 'NNG: Aesthetic-Usability Effect', url: 'https://www.nngroup.com/articles/aesthetic-usability-effect/' },
            { label: 'UX Collective: Whitespace', url: 'https://uxdesign.cc/white-space-is-not-your-enemy-b406b3b0f04c' }
          ],
          principles: ['Aesthetic-Usability Effect', 'Progressive Reduction', 'Focus Support']
        },
        {
          id: 'notion-editor-2',
          x: 8,
          y: 50,
          label: '2',
          title: 'Slash command as universal entry point',
          analysis: 'Typing "/" anywhere in the editor opens a command palette for inserting any block type — headers, databases, callouts, toggles, embeds. This is a single, memorable affordance that replaces a complex toolbar. It scales infinitely: as Notion adds new block types, users don\'t need to relearn a new toolbar position. The "/" pattern has become so standard (Slack, Linear, Figma) that it qualifies as an industry-wide mental model transfer.',
          sources: [
            { label: 'Laws of UX: Jakob\'s Law', url: 'https://lawsofux.com/jakobs-law/' },
            { label: 'NNG: Command Palettes', url: 'https://www.nngroup.com/articles/command-palettes/' }
          ],
          principles: ['Jakob\'s Law', 'Discoverability', 'Scalable Affordances']
        },
        {
          id: 'notion-editor-3',
          x: 50,
          y: 65,
          label: '3',
          title: 'Block-level drag handles',
          analysis: 'Every paragraph, heading, and block has a drag handle (⠿) that appears on hover, to the left of the block. Hovering this also reveals a "+" button to insert a block above. This is direct manipulation at the block level: users can reorganize page content by dragging, an interaction that maps to the mental model of "things on a page." The handles are hidden at rest to avoid cluttering the reading experience.',
          sources: [
            { label: 'NNG: Direct Manipulation', url: 'https://www.nngroup.com/articles/direct-manipulation/' }
          ],
          principles: ['Direct Manipulation', 'WYSIWYG', 'Affordance Visibility']
        },
        {
          id: 'notion-editor-4',
          x: 50,
          y: 10,
          label: '4',
          title: 'Page emoji and cover image',
          analysis: 'Each page can have an emoji icon and a full-width cover image. These may seem decorative, but they serve a key navigational function: visual distinctiveness. When a user has 50+ pages in their sidebar, page icons act as visual landmarks that dramatically speed up recognition vs. scanning through text titles alone. This is the Picture Superiority Effect — images are processed and recalled far faster than words.',
          sources: [
            { label: 'NNG: Recognition vs. Recall', url: 'https://www.nngroup.com/articles/recognition-and-recall/' }
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
      context: 'Notion\'s most powerful feature — a structured data table that can be viewed as a table, board, calendar, or gallery.',
      annotations: [
        {
          id: 'notion-database-1',
          x: 50,
          y: 12,
          label: '1',
          title: 'Multiple view switcher',
          analysis: 'Databases can be viewed as Table, Board, Timeline, Calendar, List, or Gallery. The view switcher lives in a top tab bar, persistent and prominent. The genius is that the underlying data is the same — only the representation changes. This matches a key cognitive science insight: the same information is easier or harder to reason about depending on its representation. Users choose the view that matches their current mental task.',
          sources: [
            { label: 'NNG: Multiple Views of Information', url: 'https://www.nngroup.com/articles/information-scent/' }
          ],
          principles: ['Cognitive Fit', 'Multiple Representations', 'User Control']
        },
        {
          id: 'notion-database-2',
          x: 25,
          y: 50,
          label: '2',
          title: 'Inline property editing',
          analysis: 'Clicking any cell in the table allows immediate in-place editing. No separate "edit mode" is required. This is a low-friction, high-efficiency pattern: the display state and edit state are the same. Contrast this with older enterprise tools (Jira, Confluence) that require navigating to a "details" page to edit most fields. The time savings compound significantly across power users.',
          sources: [
            { label: 'NNG: Efficiency of Use', url: 'https://www.nngroup.com/articles/efficiency-vs-effectiveness/' }
          ],
          principles: ['Direct Manipulation', 'Efficiency', 'Reduced Friction']
        },
        {
          id: 'notion-database-3',
          x: 75,
          y: 88,
          label: '3',
          title: 'Filter and sort toolbar',
          analysis: 'The filter and sort controls live in a persistent toolbar above the table. Filters are shown as chips — active filters are visible at a glance, and each chip has an "x" to remove it. This creates transparency: users always know what data they\'re looking at and why some rows may be missing. The "visibility of system status" heuristic is critical in data tools where users can easily get confused about what they\'re seeing.',
          sources: [
            { label: 'NNG: Heuristic #1 — Visibility of System Status', url: 'https://www.nngroup.com/articles/ten-usability-heuristics/' }
          ],
          principles: ['Visibility of System Status', 'Filter Transparency', 'User Control']
        }
      ]
    },
    {
      id: 'sidebar',
      label: 'Sidebar',
      imageUrl: 'assets/screenshots/notion/sidebar.png',
      imageWidth: 1440,
      imageHeight: 900,
      context: 'The global navigation panel — where users orient themselves and move between pages in their workspace.',
      annotations: [
        {
          id: 'notion-sidebar-1',
          x: 12,
          y: 35,
          label: '1',
          title: 'Nested, collapsible page tree',
          analysis: 'Notion\'s sidebar shows pages nested to unlimited depth, with each level collapsible via a triangle toggle. This is a classic information architecture pattern, but Notion\'s implementation has an important nuance: the nesting is determined by the user, not by Notion. This is the "end-user information architecture" approach, which creates high flexibility but also notorious disorganization for new users who haven\'t developed a personal system.',
          sources: [
            { label: 'NNG: Information Architecture', url: 'https://www.nngroup.com/articles/ia-vs-navigation/' }
          ],
          principles: ['Infinite Nesting', 'User Control', 'Organizational Flexibility']
        },
        {
          id: 'notion-sidebar-2',
          x: 12,
          y: 60,
          label: '2',
          title: 'Hover-revealed action row',
          analysis: 'Each page in the sidebar reveals a "..." menu and a "+" new subpage button on hover. At rest, these are invisible — the sidebar shows only titles and icons. This is an application of "hover disclosure" and is appropriate here because creating and managing pages are secondary actions; navigating to pages is primary. Hiding secondary actions until hover keeps the sidebar scannable without removing functionality.',
          sources: [
            { label: 'NNG: Progressive Disclosure', url: 'https://www.nngroup.com/articles/progressive-disclosure/' }
          ],
          principles: ['Progressive Disclosure', 'Hover Revelation', 'Visual Hierarchy']
        },
        {
          id: 'notion-sidebar-3',
          x: 12,
          y: 85,
          label: '3',
          title: 'Teamspaces vs. private pages separation',
          analysis: 'The sidebar is divided into "Teamspaces" (shared) and "Private" (personal) sections. This is a critically important information architecture decision: it mirrors the mental model most knowledge workers already have ("this is my stuff" vs. "this is our stuff"). The visual separation prevents the anxiety of accidentally sharing private work, and helps users orient at a glance.',
          sources: [
            { label: 'NNG: Mental Models', url: 'https://www.nngroup.com/articles/mental-models/' }
          ],
          principles: ['Mental Model Alignment', 'Anxiety Reduction', 'Information Architecture']
        }
      ]
    }
  ]
};
