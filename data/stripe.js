export default {
  id: 'stripe',
  name: 'Stripe',
  tagline: 'Financial infrastructure for the internet',
  accentColor: '#635BFF',
  screens: [
    {
      id: 'dashboard',
      label: 'Dashboard',
      imageUrl: 'assets/screenshots/stripe/dashboard.png',
      imageWidth: 1440,
      imageHeight: 900,
      context: 'The Stripe Dashboard home — the command center for revenue, payments, and business health.',
      annotations: [
        {
          id: 'stripe-dashboard-1',
          x: 50,
          y: 20,
          label: '1',
          title: 'Revenue chart as the hero element',
          analysis: 'The most prominent element on the dashboard is a time-series revenue chart. This is a deliberate signal about what Stripe thinks matters most to their users: money. In most dashboards, the hero position is contested by many metrics. Stripe makes an editorial decision and owns it. This reduces cognitive load by establishing a hierarchy: revenue first, everything else secondary. The design is saying "we know why you\'re here."',
          sources: [
            { label: 'NNG: Dashboard Design', url: 'https://www.nngroup.com/articles/dashboard-design/' }
          ],
          principles: ['Visual Hierarchy', 'Editorial Clarity', 'Cognitive Load Reduction']
        },
        {
          id: 'stripe-dashboard-2',
          x: 15,
          y: 50,
          label: '2',
          title: 'Left-rail navigation with icon + label',
          analysis: 'Unlike Linear (icon-only) or Notion (text-only), Stripe shows both icon and label in its left nav — always. This is because Stripe\'s users are often infrequent: accountants, finance teams, and founders who log in a few times a week, not hourly. Icon-only navigation works for daily power users who build spatial memory; labeled navigation is more appropriate for intermittent users who need words to orient. The design is calibrated to the usage pattern.',
          sources: [
            { label: 'NNG: Icon Usability', url: 'https://www.nngroup.com/articles/icon-usability/' },
            { label: 'NNG: Navigation Design Patterns', url: 'https://www.nngroup.com/articles/navigation-cognitive-strain/' }
          ],
          principles: ['Icon + Label Pattern', 'User Frequency Calibration', 'Wayfinding']
        },
        {
          id: 'stripe-dashboard-3',
          x: 50,
          y: 55,
          label: '3',
          title: 'Metric cards with comparison periods',
          analysis: 'Each summary card (Gross volume, Net volume, New customers) shows both the absolute number and the percentage change vs. the previous period. This is a fundamental principle of data design: a number alone is meaningless without context. "€14,230" tells you nothing; "€14,230 (+12% vs. last month)" is actionable. Stripe bakes this context into every metric display.',
          sources: [
            { label: 'NNG: Data Presentation', url: 'https://www.nngroup.com/articles/data-visualization-for-teams/' }
          ],
          principles: ['Contextual Data', 'Benchmark Comparison', 'Actionable Metrics']
        },
        {
          id: 'stripe-dashboard-4',
          x: 85,
          y: 35,
          label: '4',
          title: 'Recent activity feed',
          analysis: 'A right-rail activity feed shows the 5 most recent transactions in real time. This serves a specific use case: "did that payment just go through?" — a question Stripe users ask constantly. Rather than requiring navigation to the Payments page, the dashboard surfaces this answer immediately. The design respects the user\'s most common task (monitoring recent activity) by making it zero-click accessible.',
          sources: [
            { label: 'NNG: Visibility of System Status', url: 'https://www.nngroup.com/articles/ten-usability-heuristics/' }
          ],
          principles: ['Zero-Click Access', 'Visibility of System Status', 'Task-Centered Design']
        }
      ]
    },
    {
      id: 'checkout',
      label: 'Checkout',
      imageUrl: 'assets/screenshots/stripe/checkout.png',
      imageWidth: 1440,
      imageHeight: 900,
      context: 'Stripe\'s hosted checkout page — used by millions of merchants, optimized obsessively for conversion.',
      annotations: [
        {
          id: 'stripe-checkout-1',
          x: 50,
          y: 15,
          label: '1',
          title: 'Order summary above the fold',
          analysis: 'The right column of Stripe Checkout shows exactly what the user is paying for — product name, image, price, and any discounts — before any payment fields. This builds confidence: the user knows what they\'re committing to before they\'ve entered a single character. Baymard Institute research shows that order summary confusion is a top-5 driver of checkout abandonment. Stripe solves this by making it unmissable.',
          sources: [
            { label: 'Baymard: Checkout Usability', url: 'https://baymard.com/research/checkout-usability' },
            { label: 'NNG: Trust in E-Commerce', url: 'https://www.nngroup.com/articles/ecommerce-trust/' }
          ],
          principles: ['Trust Building', 'Commitment Transparency', 'Conversion Optimization']
        },
        {
          id: 'stripe-checkout-2',
          x: 30,
          y: 45,
          label: '2',
          title: 'Single-column form with logical grouping',
          analysis: 'Payment form fields run in a single column, grouped by type (email, card details, billing address). Research by Baymard shows that single-column forms have 15.4% higher completion rates than multi-column forms. The grouping into labeled sections (Payment details, Billing address) uses the Gestalt principle of proximity — related fields feel related because they\'re close together, under a shared label.',
          sources: [
            { label: 'Baymard: Form Field Design', url: 'https://baymard.com/blog/avoid-multi-column-forms' },
            { label: 'Laws of UX: Law of Proximity', url: 'https://lawsofux.com/law-of-proximity/' }
          ],
          principles: ['Law of Proximity', 'Form Completion Rate', 'Gestalt Grouping']
        },
        {
          id: 'stripe-checkout-3',
          x: 30,
          y: 80,
          label: '3',
          title: 'Real-time inline validation',
          analysis: 'As users type card details, Stripe validates them inline and immediately — card type is detected after 1 digit, expiry date is auto-formatted, CVC length is checked on blur. Errors appear below the specific field, not in a summary at the top. This is the gold standard for form feedback: tell users what\'s wrong as soon as possible, as close to the error as possible, without interrupting their flow.',
          sources: [
            { label: 'NNG: Form Validation & Errors', url: 'https://www.nngroup.com/articles/errors-forms/' },
            { label: 'Baymard: Inline Validation', url: 'https://baymard.com/blog/inline-form-validation' }
          ],
          principles: ['Inline Validation', 'Error Prevention', 'Immediate Feedback']
        }
      ]
    },
    {
      id: 'payment-links',
      label: 'Payment Links',
      imageUrl: 'assets/screenshots/stripe/payment-links.png',
      imageWidth: 1440,
      imageHeight: 900,
      context: 'The Payment Links creation flow — Stripe\'s no-code tool for accepting payments without a website.',
      annotations: [
        {
          id: 'stripe-payment-links-1',
          x: 35,
          y: 30,
          label: '1',
          title: 'Live preview alongside the form',
          analysis: 'The left side of the screen is a form; the right side is a live preview of the checkout page that updates as you type. This is the highest-impact UX pattern in creation flows: showing the output as you build it eliminates the anxiety of "I wonder what this will look like." It also catches errors before they go live, reducing support burden. The design collapses the distance between creation and validation.',
          sources: [
            { label: 'NNG: WYSIWYG Editing', url: 'https://www.nngroup.com/articles/direct-manipulation/' }
          ],
          principles: ['WYSIWYG', 'Live Preview', 'Error Prevention']
        },
        {
          id: 'stripe-payment-links-2',
          x: 35,
          y: 60,
          label: '2',
          title: 'Sensible defaults eliminate configuration',
          analysis: 'Most fields in the payment link form are pre-filled with reasonable defaults: currency is auto-detected from account locale, tax collection is pre-configured from account settings, and billing address is "required" by default. This is a profound UX principle: the best interface is one where the user doesn\'t have to configure anything. Defaults represent the design team\'s informed opinion about what most users want, freeing users from decision fatigue.',
          sources: [
            { label: 'Laws of UX: Occam\'s Razor', url: 'https://lawsofux.com/' },
            { label: 'NNG: Defaults in Design', url: 'https://www.nngroup.com/articles/the-power-of-defaults/' }
          ],
          principles: ['Smart Defaults', 'Decision Fatigue Reduction', 'Opinionated Design']
        },
        {
          id: 'stripe-payment-links-3',
          x: 35,
          y: 88,
          label: '3',
          title: 'Progressive complexity via "Advanced options"',
          analysis: 'Simple use cases are served by a short, clean form. Advanced configurations (custom fields, upsells, tax IDs, trial periods) are hidden behind an "Advanced options" disclosure. This is a textbook application of progressive disclosure: the interface is approachable for simple use cases while retaining full power for complex ones. The key is that the collapse is always accessible — power users aren\'t sent to a different page.',
          sources: [
            { label: 'NNG: Progressive Disclosure', url: 'https://www.nngroup.com/articles/progressive-disclosure/' }
          ],
          principles: ['Progressive Disclosure', 'Layered Complexity', 'Beginner & Expert Paths']
        }
      ]
    }
  ]
};
