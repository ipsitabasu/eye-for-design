import duolingo from './duolingo.js';
import linear from './linear.js';
import notion from './notion.js';
import stripe from './stripe.js';

export const apps = [linear, duolingo, notion, stripe];
export const appsById = Object.fromEntries(apps.map(a => [a.id, a]));
