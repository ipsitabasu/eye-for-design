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
      context: 'The first screen after login — the daily hub that users return to dozens of times across weeks and months.',
      annotations: [
        {
          id: 'duolingo-home-1',
          x: 50,
          y: 18,
          label: '1',
          title: 'Streak counter front and center',
          analysis: 'The streak — number of consecutive days practiced — is displayed prominently in the header with a fire emoji and a bold number. This is a masterclass in variable reward schedules, a behavioral psychology concept popularized by B.F. Skinner. The streak creates loss aversion: the longer the streak, the more psychologically painful it is to break. Duolingo has found that streak is the single most powerful retention mechanic in the product.',
          sources: [
            { label: 'NNG: Gamification in UX', url: 'https://www.nngroup.com/articles/gamification/' },
            { label: 'BJ Fogg: Behavior Design', url: 'https://behaviordesign.stanford.edu/' }
          ],
          principles: ['Loss Aversion', 'Variable Reward', 'Habit Formation']
        },
        {
          id: 'duolingo-home-2',
          x: 50,
          y: 45,
          label: '2',
          title: 'Single prominent CTA: Continue',
          analysis: 'The page has one dominant action: "Continue" or "Start Lesson". This is Hick\'s Law in practice — the time to make a decision grows logarithmically with the number of choices. By removing every possible alternative (grammar notes, vocabulary lists, settings), Duolingo eliminates the decision fatigue that causes users to leave without completing a lesson. The path of least resistance is always the right path.',
          sources: [
            { label: 'Laws of UX: Hick\'s Law', url: 'https://lawsofux.com/hicks-law/' },
            { label: 'NNG: Decision Making & UX', url: 'https://www.nngroup.com/articles/decision-making/' }
          ],
          principles: ['Hick\'s Law', 'Choice Reduction', 'Goal Gradient']
        },
        {
          id: 'duolingo-home-3',
          x: 15,
          y: 65,
          label: '3',
          title: 'League and XP leaderboard tease',
          analysis: 'A persistent left-rail widget shows the user\'s current league position and XP progress relative to peers. Social comparison is a powerful motivator, but Duolingo is careful: it shows your percentile in a friendly, encouraging frame, not a shame-inducing one. "You\'re in the top 20%!" works better than "12 people are ahead of you." The design avoids the dark pattern of social pressure while still leveraging social motivation.',
          sources: [
            { label: 'NNG: Social Proof in UX', url: 'https://www.nngroup.com/articles/social-proof/' }
          ],
          principles: ['Social Proof', 'Extrinsic Motivation', 'Ethical Gamification']
        },
        {
          id: 'duolingo-home-4',
          x: 85,
          y: 65,
          label: '4',
          title: 'Daily goal progress ring',
          analysis: 'A circular progress indicator shows how much of the daily XP goal has been completed. The ring is never shown as empty — even one XP lights up a segment. This is the Goal Gradient Effect: people put in more effort as they approach a goal. By making progress immediately visible from the first action, Duolingo creates a sense of momentum that persists across the session.',
          sources: [
            { label: 'Laws of UX: Goal Gradient Effect', url: 'https://lawsofux.com/goal-gradient-effect/' }
          ],
          principles: ['Goal Gradient Effect', 'Progress Indicators', 'Intrinsic Motivation']
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
          y: 8,
          label: '1',
          title: 'Progress bar at the top',
          analysis: 'A thin green progress bar at the top of the lesson screen shows how many exercises remain. It grows with each correct answer. This is a classic application of the Zeigarnik Effect: people are more likely to stay motivated to finish something they\'ve already started. By making progress visible from the very first question, Duolingo increases lesson completion rates.',
          sources: [
            { label: 'Laws of UX: Zeigarnik Effect', url: 'https://lawsofux.com/zeigarnik-effect/' }
          ],
          principles: ['Zeigarnik Effect', 'Progress Visibility', 'Completion Motivation']
        },
        {
          id: 'duolingo-lesson-2',
          x: 50,
          y: 45,
          label: '2',
          title: 'Large tap targets, generous spacing',
          analysis: 'Answer choices are large, rounded tiles with significant padding. This is Fitts\'s Law: the time to tap a target is a function of its distance and size. On mobile, Duolingo makes targets generously large (minimum 44px touch target, often much larger), reducing the motor effort required to interact. The spacing between choices prevents accidental taps — an often-overlooked detail in mobile UX.',
          sources: [
            { label: 'Laws of UX: Fitts\'s Law', url: 'https://lawsofux.com/fittss-law/' },
            { label: 'Apple HIG: Touch Targets', url: 'https://developer.apple.com/design/human-interface-guidelines/accessibility' }
          ],
          principles: ['Fitts\'s Law', 'Touch Target Size', 'Error Prevention']
        },
        {
          id: 'duolingo-lesson-3',
          x: 50,
          y: 88,
          label: '3',
          title: 'Correct / incorrect feedback panel',
          analysis: 'When an answer is submitted, a large banner slides up from the bottom: green for correct ("Great job!"), red for incorrect (showing the right answer). This is immediate, unambiguous feedback — a foundational UX principle from Nielsen\'s heuristics. The red state doesn\'t feel punishing because the tone is encouraging ("The correct answer is...") and the user can immediately try the next question. The delay before the next question (≈ 800ms) is calibrated to the Doherty Threshold — long enough to feel the feedback, short enough to maintain flow.',
          sources: [
            { label: 'NNG: Heuristic #1 — Visibility of System Status', url: 'https://www.nngroup.com/articles/ten-usability-heuristics/' },
            { label: 'Laws of UX: Doherty Threshold', url: 'https://lawsofux.com/doherty-threshold/' }
          ],
          principles: ['Immediate Feedback', 'Doherty Threshold', 'Error Recovery']
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
          y: 20,
          label: '1',
          title: 'Promotion / demotion zone visualization',
          analysis: 'The leaderboard uses distinct colored zones to show who is being promoted (top 10, highlighted green) and who is at risk of demotion (bottom 5, highlighted red). This is a brilliant use of spatial position and color to communicate two separate signals simultaneously. Users in the middle zone are unaffected, reducing anxiety; users at the edges get actionable information about what to do.',
          sources: [
            { label: 'NNG: Data Visualization', url: 'https://www.nngroup.com/articles/data-visualization-for-teams/' }
          ],
          principles: ['Redundant Coding', 'Zone Demarcation', 'Actionable Feedback']
        },
        {
          id: 'duolingo-leaderboard-2',
          x: 50,
          y: 50,
          label: '2',
          title: 'User\'s own row is always visible',
          analysis: 'Regardless of the user\'s position, their row is always pinned to be visible (either in its natural position or floating). This removes the anxiety of hunting for oneself in a long list. The design respects the primary question users ask when they open the leaderboard: "Where am I?" — answering it instantly without requiring any scrolling.',
          sources: [
            { label: 'NNG: Recognition over Recall', url: 'https://www.nngroup.com/articles/ten-usability-heuristics/' }
          ],
          principles: ['Recognition over Recall', 'User-Centered Design', 'Anxiety Reduction']
        },
        {
          id: 'duolingo-leaderboard-3',
          x: 50,
          y: 80,
          label: '3',
          title: 'Timer creates urgency without pressure',
          analysis: 'A countdown timer shows time remaining in the league week. This creates time-bound urgency — a classic motivational lever — but Duolingo frames it positively ("5 days left to climb!") rather than as a threat. The timer is visible but not dominant, sitting below the fold so users focused on their rank aren\'t distracted. This balance between urgency and calm is hard to get right and Duolingo calibrates it well.',
          sources: [
            { label: 'NNG: Urgency in UX', url: 'https://www.nngroup.com/articles/urgency/' }
          ],
          principles: ['Scarcity / Urgency', 'Positive Framing', 'Time Pressure']
        }
      ]
    }
  ]
};
