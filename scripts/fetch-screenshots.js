/**
 * Captures screenshots of app marketing/feature pages and saves them to
 * assets/screenshots/<app>/<screen>.png at 1440x900 viewport.
 *
 * Run from the repo root:
 *   cd scripts && npm install && node fetch-screenshots.js
 */

// Use the globally installed Playwright to match the pre-installed browser version
const { chromium } = require('/opt/node22/lib/node_modules/playwright');
const path = require('path');
const fs = require('fs');

const OUT_DIR = path.resolve(__dirname, '../assets/screenshots');

const TARGETS = [
  {
    app: 'linear',
    screens: [
      {
        id: 'inbox',
        url: 'https://linear.app/features/inbox',
        // Wait for the hero image to load
        waitFor: '.hero-image, img[src*="inbox"], main',
        clip: null // full viewport
      },
      {
        id: 'issues',
        url: 'https://linear.app/features/issues',
        waitFor: '.hero-image, img[src*="issue"], main',
        clip: null
      },
      {
        id: 'cycles',
        url: 'https://linear.app/features/cycles',
        waitFor: '.hero-image, img[src*="cycle"], main',
        clip: null
      }
    ]
  },
  {
    app: 'duolingo',
    screens: [
      {
        id: 'home',
        url: 'https://www.duolingo.com',
        waitFor: 'main, [data-testid]',
        clip: null
      },
      {
        id: 'lesson',
        url: 'https://www.duolingo.com/practice-hub',
        waitFor: 'main',
        clip: null
      },
      {
        id: 'leaderboard',
        url: 'https://www.duolingo.com/leaderboard',
        waitFor: 'main',
        clip: null
      }
    ]
  },
  {
    app: 'notion',
    screens: [
      {
        id: 'editor',
        url: 'https://www.notion.so/product',
        waitFor: 'main, .notion-app',
        clip: null
      },
      {
        id: 'database',
        url: 'https://www.notion.so/product/databases',
        waitFor: 'main',
        clip: null
      },
      {
        id: 'sidebar',
        url: 'https://www.notion.so/product/teamspaces',
        waitFor: 'main',
        clip: null
      }
    ]
  },
  {
    app: 'stripe',
    screens: [
      {
        id: 'dashboard',
        url: 'https://stripe.com/dashboard-ui',
        waitFor: 'main, .Body',
        clip: null
      },
      {
        id: 'checkout',
        url: 'https://stripe.com/payments/checkout',
        waitFor: 'main',
        clip: null
      },
      {
        id: 'payment-links',
        url: 'https://stripe.com/payment-links',
        waitFor: 'main',
        clip: null
      }
    ]
  }
];

const DISMISS_SELECTORS = [
  '[data-testid="cookie-banner"] button',
  '#onetrust-accept-btn-handler',
  '.cookie-accept',
  '[aria-label="Accept cookies"]',
  'button[class*="cookie"]',
  'button[class*="accept"]',
];

async function dismissCookies(page) {
  for (const sel of DISMISS_SELECTORS) {
    try {
      const btn = await page.$(sel);
      if (btn) { await btn.click(); break; }
    } catch {}
  }
}

async function run() {
  const browser = await chromium.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-dev-shm-usage', '--ignore-certificate-errors']
  });

  for (const { app, screens } of TARGETS) {
    const dir = path.join(OUT_DIR, app);
    fs.mkdirSync(dir, { recursive: true });

    for (const screen of screens) {
      console.log(`\nCapturing: ${app}/${screen.id}`);
      console.log(`  URL: ${screen.url}`);

      const page = await browser.newPage();
      await page.setViewportSize({ width: 1440, height: 900 });

      try {
        await page.goto(screen.url, { waitUntil: 'domcontentloaded', timeout: 30000 });

        // Try to dismiss cookie banners
        await dismissCookies(page);

        // Wait for meaningful content
        try {
          await page.waitForSelector(screen.waitFor, { timeout: 8000 });
        } catch {
          // Proceed even if selector not found
        }

        // Let animations settle
        await page.waitForTimeout(2000);

        const outPath = path.join(dir, `${screen.id}.png`);
        await page.screenshot({ path: outPath, clip: screen.clip ?? undefined });
        console.log(`  ✓ Saved: ${outPath}`);
      } catch (err) {
        console.error(`  ✗ Failed: ${err.message}`);
      } finally {
        await page.close();
      }
    }
  }

  await browser.close();
  console.log('\nDone. Screenshots saved to assets/screenshots/');
}

run().catch(err => {
  console.error(err);
  process.exit(1);
});
