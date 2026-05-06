export default {
  id: 'duolingo',
  name: 'Duolingo',
  tagline: 'Language learning that actually sticks',
  accentColor: '#58CC02',
  screens: [
    {
      id: 'home',
      label: 'Home',
      imageUrl: 'assets/screenshots/duolingo/home.png',
      imageWidth: 1440,
      imageHeight: 900,
      context: 'The daily hub — the screen users return to dozens of times across weeks and months.',
      annotations: [
        {
          id: 'duolingo-home-1',
          x: 38,
          y: 8,
          label: '1',
          title: 'The streak: 600 experiments, one copy change worth 10,000 DAUs',
          analysis: 'The fire emoji and streak counter at the top of the screen is not decoration — it\'s the most A/B tested single feature in Duolingo\'s history. Jackson Shuttleworth\'s retention team ran 600+ experiments on streaks over four years. One of the most striking findings: changing the button text from "Continue" to "Commit to my goal" drove 10,000 incremental daily active users — a single copy change. The streak was discovered when an associate PM noticed that users who hit a 10-day streak had dramatically lower churn. The simplification mattered too: Duolingo originally tied streaks to XP points, which confused users. Simplifying to "complete one lesson a day" dramatically improved the feature\'s effectiveness. Lenny Rachitsky called it "one of the best designed, most clever, and most impactful growth features ever created."',
          sources: [
            { label: 'Lenny\'s Newsletter: Behind the Product — Duolingo Streaks', url: 'https://www.lennysnewsletter.com/p/behind-the-product-duolingo-streaks' },
            { label: 'Duolingo Blog: How the Streak Builds Habit', url: 'https://blog.duolingo.com/how-duolingo-streak-builds-habit/' }
          ],
          principles: ['Loss Aversion', 'Habit Formation', 'Variable Reward']
        },
        {
          id: 'duolingo-home-2',
          x: 50,
          y: 48,
          label: '2',
          title: 'One button: Hick\'s Law as a growth strategy',
          analysis: 'The page has one dominant action. Luis von Ahn frames Duolingo\'s real competitors as Instagram and TikTok — not Rosetta Stone. "The insight is the hardest thing about learning something by yourself is staying motivated — by a margin." Every design decision flows from that: if motivation is the problem, friction is the enemy. Hick\'s Law states that decision time grows logarithmically with the number of choices. Duolingo eliminates the decision by removing every alternative. No grammar notes, no vocabulary lists — just "Continue." The path of least resistance is always the right path. The company has run 16,000 A/B tests in its history to optimize exactly this kind of conversion moment.',
          sources: [
            { label: 'ACQ2: Why Duolingo Worked — Luis von Ahn', url: 'https://www.acquired.fm/acq2-episodes/why-duolingo-worked-with-luis-von-ahn-ceo' },
            { label: 'Laws of UX: Hick\'s Law', url: 'https://lawsofux.com/hicks-law/' }
          ],
          principles: ['Hick\'s Law', 'Friction Reduction', 'Motivation-First Design']
        },
        {
          id: 'duolingo-home-3',
          x: 11,
          y: 62,
          label: '3',
          title: 'The leaderboard: a Zynga idea that tripled engaged learners',
          analysis: 'The league widget in the sidebar came from Jorge Mazal, Duolingo\'s CPO, who joined in 2017 from Zynga where he had worked on FarmVille 2. His hypothesis: in a product where users\' friends are no longer active, competitive matching by engagement level works better than social graphs. Duolingo auto-opts users into a league with 30 strangers who had similar engagement the prior week. The results were immediate and dramatic: overall learning time rose 17%, and the number of highly engaged learners (1+ hour/day, 5+ days/week) tripled. Mazal\'s Lenny\'s Newsletter post explaining this is Lenny\'s #1 most-read post of all time.',
          sources: [
            { label: 'Lenny\'s Newsletter: How Duolingo Reignited User Growth', url: 'https://www.lennysnewsletter.com/p/how-duolingo-reignited-user-growth' }
          ],
          principles: ['Social Competition', 'Extrinsic Motivation', 'Engagement Loop']
        },
        {
          id: 'duolingo-home-4',
          x: 88,
          y: 62,
          label: '4',
          title: 'XP progress ring: the Goal Gradient Effect in action',
          analysis: 'The daily XP goal ring starts lighting up from the very first XP earned — it is never shown as empty. This is the Goal Gradient Effect: people put in more effort as they approach a goal, and Duolingo creates the perception of progress from the first action. The company\'s North Star metric is CURR (Current User Retention Rate). Data showed that a 1% CURR improvement compounded over time — an experiment that added 1,000 DAUs in week 1 added 1,072 the following week through word-of-mouth. Over four years of CURR focus, DAUs grew 4.5x. The progress ring is not a UI element — it is the physical embodiment of Duolingo\'s retention strategy.',
          sources: [
            { label: 'Lenny\'s Newsletter: The Secret to Duolingo\'s Exponential Growth', url: 'https://www.lennysnewsletter.com/p/the-secret-to-duolingos-growth' },
            { label: 'Laws of UX: Goal Gradient Effect', url: 'https://lawsofux.com/goal-gradient-effect/' }
          ],
          principles: ['Goal Gradient Effect', 'Progress Visualization', 'Retention Strategy']
        }
      ]
    },
    {
      id: 'lesson',
      label: 'Lesson',
      imageUrl: 'assets/screenshots/duolingo/lesson.png',
      imageWidth: 1440,
      imageHeight: 900,
      context: 'The core learning experience — an exercise screen within an active lesson.',
      annotations: [
        {
          id: 'duolingo-lesson-1',
          x: 50,
          y: 5,
          label: '1',
          title: 'Progress bar at the top: the Zeigarnik Effect as an engine',
          analysis: 'The thin progress bar at the top of every lesson screen grows with each correct answer. This is a direct application of the Zeigarnik Effect: humans are more motivated to complete tasks they have already started than tasks they haven\'t begun. Duolingo never shows you an empty progress bar — by the time you see it, you\'ve already made one move. The data behind this: Duolingo found the first 7 days to be the highest-risk churn window. Get a user past their first week and long-term retention probability rises dramatically. The progress bar is one of the mechanisms that closes that gap.',
          sources: [
            { label: 'Lenny\'s Newsletter: Behind the Product — Duolingo Streaks', url: 'https://www.lennysnewsletter.com/p/behind-the-product-duolingo-streaks' },
            { label: 'Laws of UX: Zeigarnik Effect', url: 'https://lawsofux.com/zeigarnik-effect/' }
          ],
          principles: ['Zeigarnik Effect', 'Completion Motivation', 'Churn Prevention']
        },
        {
          id: 'duolingo-lesson-2',
          x: 50,
          y: 58,
          label: '2',
          title: 'Answer tiles: Fitts\'s Law at the core of the product loop',
          analysis: 'Answer choices are large, rounded tiles with generous padding. This is Fitts\'s Law: the time to tap a target is a function of both its size and the distance to it. Duolingo\'s mobile-first design makes targets generously large — minimum 44px, often much larger — which reduces motor effort and accidental taps. But there\'s a business reason beyond usability: each lesson is a micro-loop. Reduce friction per interaction → increase completions per session → increase XP per day → extend streak → improve retention. The tile size is part of the conversion funnel. Luis von Ahn\'s game design confession: "You can trace a lot of the things we do based on what game our product managers are currently playing." The tile interaction pattern comes directly from mobile gaming.',
          sources: [
            { label: 'Stanford GSB: Duolingo\'s Luis von Ahn on AI', url: 'https://www.gsb.stanford.edu/insights/duolingos-luis-von-ahn-his-vision-ai-educating-world' },
            { label: 'Laws of UX: Fitts\'s Law', url: 'https://lawsofux.com/fittss-law/' }
          ],
          principles: ['Fitts\'s Law', 'Micro-Loop Design', 'Mobile-First']
        },
        {
          id: 'duolingo-lesson-3',
          x: 50,
          y: 90,
          label: '3',
          title: 'Feedback banner: error framing as a retention tool',
          analysis: 'When an answer is wrong, a red banner slides up showing the correct answer — but the copy is always encouraging, never shaming. This is deliberate. Duolingo\'s product team studied the emotional arc of language learning and found that shame is the leading cause of lesson abandonment. The banner stays visible for approximately 800ms — calibrated to the Doherty Threshold (the point at which a system response feels immediate rather than delayed), long enough to process the feedback but short enough to maintain flow. The lesson continues immediately after. Von Ahn told The Verge: "We\'ve run 16,000 A/B tests." Many of those tests were precisely about feedback copy and timing.',
          sources: [
            { label: 'The Verge: Luis von Ahn on Gamification', url: 'https://www.theverge.com/24267841/luis-von-ahn-duolingo-owl-language-learning-gamification-generative-ai-android-decoder' },
            { label: 'Laws of UX: Doherty Threshold', url: 'https://lawsofux.com/doherty-threshold/' }
          ],
          principles: ['Doherty Threshold', 'Positive Framing', 'Error Recovery']
        }
      ]
    },
    {
      id: 'leaderboard',
      label: 'Leaderboard',
      imageUrl: 'assets/screenshots/duolingo/leaderboard.png',
      imageWidth: 1440,
      imageHeight: 900,
      context: 'The weekly XP competition — a league system where users compete to earn promotion or avoid demotion.',
      annotations: [
        {
          id: 'duolingo-leaderboard-1',
          x: 50,
          y: 18,
          label: '1',
          title: 'Promotion and demotion zones — anxiety and aspiration, calibrated',
          analysis: 'The leaderboard uses green (promotion) and red (demotion) zone highlights to communicate two separate signals simultaneously. This is redundant coding applied to social motivation. The key design insight is in the calibration: the middle zone is neutral (no color), which dramatically reduces anxiety for average users. Only the top 10 and bottom 5 of the 30-person league are highlighted — everyone else is just watching. Jorge Mazal designed this deliberately to avoid the trap Zynga had fallen into: leaderboards that shame losers produce churn, not engagement. The goal was to create "friendly competition" — making the top feel aspirational and the bottom feel recoverable, not humiliating.',
          sources: [
            { label: 'Lenny\'s Newsletter: How Duolingo Reignited User Growth', url: 'https://www.lennysnewsletter.com/p/how-duolingo-reignited-user-growth' }
          ],
          principles: ['Redundant Coding', 'Ethical Gamification', 'Anxiety Calibration']
        },
        {
          id: 'duolingo-leaderboard-2',
          x: 50,
          y: 48,
          label: '2',
          title: 'Your row always visible — "Where am I?" answered instantly',
          analysis: 'The user\'s own row is always pinned so it\'s visible regardless of their position. This answers the primary question every user has when opening the leaderboard without requiring any scrolling. The design principle is Recognition over Recall (Nielsen Heuristic #6): don\'t make users remember or hunt for their own standing — show it. This seems obvious, but many leaderboards (including early versions of Duolingo\'s) buried the user\'s row in a long list. The product team identified "finding yourself" as a moment of anxiety and friction — and eliminated it. One of the 600 streak experiments was specifically about reducing this anxiety window.',
          sources: [
            { label: 'NNG: 10 Usability Heuristics', url: 'https://www.nngroup.com/articles/ten-usability-heuristics/' }
          ],
          principles: ['Recognition over Recall', 'Anxiety Reduction', 'Information Hierarchy']
        },
        {
          id: 'duolingo-leaderboard-3',
          x: 50,
          y: 82,
          label: '3',
          title: 'Countdown timer: urgency without pressure',
          analysis: 'A timer shows days and hours remaining in the league week. Time pressure is one of the most powerful behavioral motivators — but it has a dark side: it causes anxiety that drives users away. Duolingo frames the timer positively ("5 days left to climb!") and places it below the fold, secondary to the leaderboard itself. This is a masterclass in ethical urgency design. Luis von Ahn\'s broader philosophy on this: "We want to get people to learn, not to feel bad about not learning." The leaderboard timer creates urgency without triggering the guilt response that causes app uninstalls. Duolingo Q4 2024 earnings showed 51% DAU growth — 90% of it word-of-mouth. Users who feel good about the product refer others.',
          sources: [
            { label: 'Duolingo Q4 2024 Earnings', url: 'https://investors.duolingo.com/news-releases/news-release-details/duolingo-finishes-2024-51-daus-growth-more-than-40-million-daus-and' }
          ],
          principles: ['Positive Urgency', 'Ethical Design', 'Referral-Friendly Experience']
        }
      ]
    }
  ]
};
