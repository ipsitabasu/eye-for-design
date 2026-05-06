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
      context: 'The Stripe Dashboard home — command center for revenue, payments, and business health.',
      annotations: [
        {
          id: 'stripe-dashboard-1',
          x: 50,
          y: 22,
          label: '1',
          title: 'Revenue chart as the hero: an editorial decision',
          analysis: 'The most prominent element on the dashboard is a time-series revenue chart — not activity feeds, not alerts, not a feature discovery carousel. This is Patrick Collison\'s product philosophy made visible: "It should be really fast and beautiful and simple." But simple doesn\'t mean sparse — it means opinionated. Stripe made an editorial decision that revenue is what matters most to their users and designed around that truth. Katie Dill (Stripe\'s Head of Design, formerly at Airbnb and Lyft) described Stripe\'s design quality rubric to Lenny\'s Podcast as four dimensions: usability, utility, desirability, and surprise. The revenue chart scores on all four. Collison told Berkeley Haas: "My intuition is that more of Stripe\'s success than one would think is downstream of the fact that people like beautiful things."',
          sources: [
            { label: 'Lenny\'s Podcast: Building Beautiful Products with Katie Dill', url: 'https://www.lennysnewsletter.com/p/building-beautiful-products-with' },
            { label: 'Berkeley Haas: Patrick Collison on Craftsmanship', url: 'https://newsroom.haas.berkeley.edu/stripe-co-founder-and-ceo-patrick-collison-on-founding-a-company-that-should-have-already-existed/' }
          ],
          principles: ['Editorial Hierarchy', 'Design as Opinion', 'Cognitive Load Reduction']
        },
        {
          id: 'stripe-dashboard-2',
          x: 12,
          y: 52,
          label: '2',
          title: 'Icon + label nav: calibrated for infrequent users',
          analysis: 'Unlike Linear (icon-only) or Notion (text-only), Stripe shows both icon and label in its left navigation — always. This is a deliberate decision based on usage frequency. Linear\'s daily power users build spatial memory; Stripe\'s users are often weekly visitors — accountants, finance teams, founders checking in. NNG research shows that icon-only navigation fails for infrequent users: without labels, users must guess what icons mean. Stripe\'s "both" approach sacrifices some space to gain zero ambiguity. This is calibrating to your actual user, not your ideal user. It also explains why Stripe invests so heavily in documentation and onboarding — the same user who visits the dashboard once a week is the same user who needs the API reference to make sense in 30 seconds.',
          sources: [
            { label: 'NNG: Icon Usability', url: 'https://www.nngroup.com/articles/icon-usability/' },
            { label: 'Benjamin De Cock: Designing at Stripe', url: 'https://medium.com/@bdc/designing-at-stripe-3bb978e7c8e0' }
          ],
          principles: ['Icon + Label Pattern', 'Usage Frequency Calibration', 'Zero Ambiguity']
        },
        {
          id: 'stripe-dashboard-3',
          x: 50,
          y: 58,
          label: '3',
          title: 'Metric cards with comparison: a number without context is meaningless',
          analysis: 'Each summary card shows the absolute number AND the percentage change versus the prior period. "€24,831" tells you nothing. "€24,831 (+18% vs last month)" is immediately actionable. This is a fundamental principle of data design that most dashboards violate: contextless numbers don\'t help users make decisions. Stripe bakes benchmark comparison into every metric by default. Benjamin De Cock, one of Stripe\'s early designers (reached out by founding designer Ludwig Pettersson in 2011, stayed 8 years), articulated the guiding philosophy: "Actual speed barely matters. Perceived speed truly matters." The same principle applied to data: actual data barely matters. Contextual data truly matters.',
          sources: [
            { label: 'Compound Manual: Interview with Benjamin De Cock', url: 'https://manual.compoundplanning.com/chapters/interview-with-benjamin-de-cock-early-designer-at-stripe' }
          ],
          principles: ['Contextual Data', 'Benchmark Comparison', 'Actionable Metrics']
        },
        {
          id: 'stripe-dashboard-4',
          x: 86,
          y: 36,
          label: '4',
          title: 'Recent transactions at a glance: zero-click access to the #1 question',
          analysis: 'A right-rail feed shows the 5 most recent transactions. This answers the most common question Stripe users ask: "Did that payment go through?" — without requiring navigation to the Payments page. This is task-centered design: Stripe studied what users actually do when they open the dashboard (monitor recent activity) and made that action zero-click. Katie Dill\'s quality rubric includes "surprise" as a dimension — positive delight that exceeds expectation. The transaction feed is mundane in function but surprising in its immediacy. Stripe\'s conversion research showed that businesses that switched to their Payment Element saw 10.5% more revenue on average, partly because the dashboard visibility of payment results helped teams debug and optimize faster.',
          sources: [
            { label: 'Stripe Newsroom: 10.5% Revenue Uplift Study', url: 'https://stripe.com/newsroom/news/payments-revenue-uplift' }
          ],
          principles: ['Zero-Click Access', 'Task-Centered Design', 'Visibility of System Status']
        }
      ]
    },
    {
      id: 'checkout',
      label: 'Checkout',
      imageUrl: 'assets/screenshots/stripe/checkout.png',
      imageWidth: 1440,
      imageHeight: 900,
      context: 'Stripe\'s hosted checkout — used by millions of merchants, optimized obsessively for conversion.',
      annotations: [
        {
          id: 'stripe-checkout-1',
          x: 72,
          y: 22,
          label: '1',
          title: 'Order summary before payment fields: the trust architecture',
          analysis: 'The right column shows exactly what the user is paying for — product name, image, price, tax, total — before any payment form appears. This builds confidence through transparency: users know what they\'re committing to before they\'ve typed a single character. Stripe\'s own published guidance states that on desktop, placing the order summary in a right column is "familiar and effective" and mirrors how physical receipts work. The data behind this: Baymard Institute research names order summary confusion as a top-5 driver of checkout abandonment. Stripe doesn\'t just follow best practice — they contributed to defining it. When businesses switched to Stripe Checkout from custom implementations, the conversion improvement alone justified the switch.',
          sources: [
            { label: 'Stripe: Checkout UI Design Guide', url: 'https://stripe.com/resources/more/credit-card-checkout-ui-design' },
            { label: 'Baymard: Checkout Usability Research', url: 'https://baymard.com/research/checkout-usability' }
          ],
          principles: ['Trust Building', 'Commitment Transparency', 'Conversion Architecture']
        },
        {
          id: 'stripe-checkout-2',
          x: 30,
          y: 50,
          label: '2',
          title: 'Single-column form: a 15% conversion lift hiding in plain sight',
          analysis: 'Stripe\'s payment fields always run in a single column. This looks obvious but is violated by an enormous number of checkout implementations. Baymard Institute research shows single-column forms have 15.4% higher completion rates than multi-column layouts. The reason: multi-column forms require users to manage two reading axes simultaneously, which increases cognitive load and error rates. Stripe\'s published checkout guidance explicitly recommends single-column forms and groups related fields (card details, billing address) under shared labels — applying the Gestalt Law of Proximity. Note that the two-column appearance of Stripe Checkout overall (summary right, form left) is an information architecture decision, not a form layout decision. The form itself is always single-column.',
          sources: [
            { label: 'Stripe: Checkout Flow Design Strategies', url: 'https://stripe.com/resources/more/checkout-flow-design-strategies-that-can-help-boost-conversion-and-customer-retention' },
            { label: 'Baymard: Single vs Multi-Column Forms', url: 'https://baymard.com/blog/avoid-multi-column-forms' }
          ],
          principles: ['Law of Proximity', 'Form Completion Rate', 'Cognitive Load']
        },
        {
          id: 'stripe-checkout-3',
          x: 30,
          y: 82,
          label: '3',
          title: 'Real-time inline validation: the gold standard for form feedback',
          analysis: 'As users type card details, Stripe validates immediately: card type is detected after 1 digit, expiry date is auto-formatted MM/YY, CVC length is validated on blur. Errors appear below the specific field, not in a summary banner at the top. This is the gold standard for form feedback: closest to the error, as soon as possible, without interrupting flow. Adding Apple Pay as a payment method (surfaced dynamically based on device) drives a 22.3% average increase in conversion and 22.5% revenue boost in Stripe\'s own published data. Each additional relevant payment method surfaced dynamically drives a 12% average revenue increase. These numbers explain why Stripe invests so heavily in the checkout UX — the product IS the conversion rate.',
          sources: [
            { label: 'Stripe Blog: Testing 50+ Global Payment Methods', url: 'https://stripe.com/blog/testing-the-conversion-impact-of-50-plus-global-payment-methods' },
            { label: 'NNG: Form Validation & Error Messages', url: 'https://www.nngroup.com/articles/errors-forms/' }
          ],
          principles: ['Inline Validation', 'Error Proximity', 'Conversion Optimization']
        }
      ]
    },
    {
      id: 'payment-links',
      label: 'Payment Links',
      imageUrl: 'assets/screenshots/stripe/payment-links.png',
      imageWidth: 1440,
      imageHeight: 900,
      context: 'No-code payment link creation — the entire flow of build + preview side by side.',
      annotations: [
        {
          id: 'stripe-payment-links-1',
          x: 72,
          y: 42,
          label: '1',
          title: 'Live preview: the "Collison Installation" scaled to a product',
          analysis: 'The right side of the screen shows a live preview of the checkout page, updating as you type the product name and price. This collapses the distance between creation and validation — the user never wonders "what will this look like?" because they can see it while they build it. This is the institutionalized version of what Patrick and John Collison did manually when founding Stripe. Paul Graham coined the term "Collison Installation" for their technique of physically taking a developer\'s laptop and integrating Stripe for them on the spot. Graham\'s principle: "friction in getting started is as fatal as friction in the product itself." The live preview is that philosophy applied to Stripe\'s own product — the experience of creating a payment link has zero friction between action and result.',
          sources: [
            { label: 'Paul Graham: Do Things That Don\'t Scale', url: 'https://www.inc.com/business-insider/paul-grahams-counter-intuitive-startup-advice-do-things-that-dont-scale.html' },
            { label: 'Just Go Grind: The First Few — Stripe', url: 'https://www.justgogrind.com/p/the-first-few-stripe' }
          ],
          principles: ['Live Preview', 'WYSIWYG', 'Zero Setup Friction']
        },
        {
          id: 'stripe-payment-links-2',
          x: 30,
          y: 38,
          label: '2',
          title: 'Smart defaults: the best interface is one you don\'t configure',
          analysis: 'Currency is auto-detected from the account\'s locale setting. Tax collection is pre-configured from the account settings. Billing address collection is required by default. Most fields are pre-filled with reasonable values that work for most use cases. This is "defaults as design opinion" — one of the most underrated leverage points in product. Patrick Collison at Berkeley Haas: "There\'s a culture at Stripe of really prizing the small details." Every default is a small detail that reflects the design team\'s informed opinion about what most users want. Katie Dill described Stripe\'s process as using "surprise" as a quality dimension: when a user discovers a field is already correctly set before they touched it, that\'s the best possible surprise.',
          sources: [
            { label: 'Berkeley Haas: Patrick Collison on Small Details', url: 'https://newsroom.haas.berkeley.edu/stripe-co-founder-and-ceo-patrick-collison-on-founding-a-company-that-should-have-already-existed/' },
            { label: 'NNG: The Power of Defaults', url: 'https://www.nngroup.com/articles/the-power-of-defaults/' }
          ],
          principles: ['Smart Defaults', 'Opinionated Design', 'Decision Fatigue Reduction']
        },
        {
          id: 'stripe-payment-links-3',
          x: 30,
          y: 76,
          label: '3',
          title: 'Progressive complexity: simple for 80%, powerful for the 20%',
          analysis: 'The basic form is short and approachable: product, price, currency. Custom fields, upsells, trial periods, and tax IDs are tucked behind "Advanced options." This is progressive disclosure applied to a business-critical workflow. Stripe\'s 7-line-of-code origin story (the snippet that launched the company in 2010) is the original expression of this philosophy: hide the incomprehensible complexity of global payments behind something any developer can read in 30 seconds. As Graham Mann wrote: "The genius of Stripe isn\'t 7 lines of code itself, but their ability to make incredibly difficult things look easy." Payment Links is that same principle extended to non-developers — no code at all, but the full power of Stripe\'s infrastructure behind one link.',
          sources: [
            { label: 'Graham Mann: How Stripe Turned 7 Lines Into $107B', url: 'https://grahammann.net/blog/how-stripe-turned-7-lines-of-code-into-107-billion' },
            { label: 'NNG: Progressive Disclosure', url: 'https://www.nngroup.com/articles/progressive-disclosure/' }
          ],
          principles: ['Progressive Disclosure', 'Layered Complexity', '7-Lines Philosophy']
        }
      ]
    }
  ]
};
