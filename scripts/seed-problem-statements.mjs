/**
 * Seed problem statements into Sanity CMS.
 *
 * Usage:
 *   SANITY_TOKEN=<your-token> node scripts/seed-problem-statements.mjs
 *
 * Or set SANITY_TOKEN in your .env.local and run:
 *   node -r dotenv/config scripts/seed-problem-statements.mjs
 *
 * Documents are created with createOrReplace — safe to run multiple times.
 */

const PROJECT_ID = 'h9q3fpz7'
const DATASET = 'production'
const API_VERSION = '2024-01-01'

const token = process.env.SANITY_TOKEN
if (!token) {
  console.error('Error: SANITY_TOKEN environment variable is required.')
  process.exit(1)
}

const problemStatements = [
  // Track 1: The Attention Economy
  {
    _id: 'ps-ae-1',
    track: 'attention-economy',
    order: 1,
    title: 'Reclaim Your Feed',
    description:
      'Social media feeds are algorithmically designed to keep you scrolling endlessly. Build a browser extension or app that gives users control over their feed — whether that means filtering content by type, capping daily usage, or replacing addictive scroll-loops with intentional reading lists.',
  },
  {
    _id: 'ps-ae-2',
    track: 'attention-economy',
    order: 2,
    title: 'The Focus Coach',
    description:
      'Distraction is expensive. Build a productivity tool that learns your personal focus patterns — when you work best, what derails you, and how long you can sustain deep work — and uses that data to coach you into better work habits over time.',
  },
  {
    _id: 'ps-ae-3',
    track: 'attention-economy',
    order: 3,
    title: 'Notification Detox',
    description:
      'The average smartphone user receives 80+ notifications per day. Build a smart notification manager that batches, summarises, and prioritises alerts so users get the signal without the noise — without requiring them to manually configure everything.',
  },
  {
    _id: 'ps-ae-4',
    track: 'attention-economy',
    order: 4,
    title: 'Digital Sabbath Enforcer',
    description:
      'Intentional offline time is nearly impossible when every app fights for re-engagement. Build a tool that lets users schedule and enforce device-free windows — blocking apps, silencing alerts, and providing a "why I stepped away" summary when they return.',
  },
  {
    _id: 'ps-ae-5',
    track: 'attention-economy',
    order: 5,
    title: 'The Slow News Reader',
    description:
      'Breaking news is engineered for anxiety, not understanding. Build a news aggregator that de-duplicates stories, strips out outrage bait, surfaces long-form explainers, and shows you the same story evolving over days — so you stay informed without being overwhelmed.',
  },

  // Track 2: Money & Markets for Everyone
  {
    _id: 'ps-mm-1',
    track: 'money-markets',
    order: 1,
    title: 'First Salary, First Steps',
    description:
      'Most young professionals receive their first salary with no idea what to do with it. Build a guided financial onboarding tool for first-time earners — covering budgeting, emergency funds, tax basics, and the first investment — without requiring any prior financial knowledge.',
  },
  {
    _id: 'ps-mm-2',
    track: 'money-markets',
    order: 2,
    title: 'Jargon-Free Investing',
    description:
      'Financial products are deliberately complex. Build an investment explainer that translates mutual funds, SIPs, bonds, and equity into plain language — with real examples, honest risk disclosures, and zero upselling — so anyone can make an informed decision.',
  },
  {
    _id: 'ps-mm-3',
    track: 'money-markets',
    order: 3,
    title: 'Expense Autopsy',
    description:
      "Most people know they overspend but don't know where. Build a tool that analyses bank statements or UPI transaction history and surfaces spending patterns, hidden subscriptions, and unnecessary recurring costs — with actionable suggestions, not just charts.",
  },
  {
    _id: 'ps-mm-4',
    track: 'money-markets',
    order: 4,
    title: 'The Goal-Based Saver',
    description:
      'Generic savings advice ignores individual goals. Build a savings planner that works backwards from a specific goal — a trip, a laptop, a course — and creates a realistic, week-by-week savings plan that adjusts dynamically as income or expenses change.',
  },
  {
    _id: 'ps-mm-5',
    track: 'money-markets',
    order: 5,
    title: 'Credit Score Demystified',
    description:
      'Credit scores determine access to loans, rentals, and more — but most people don\'t understand what affects theirs. Build a tool that explains a user\'s credit score in plain terms, shows exactly what is hurting it, and gives a prioritised action plan to improve it.',
  },

  // Track 3: Build Your Own Thing
  {
    _id: 'ps-byo-1',
    track: 'build-your-own',
    order: 1,
    title: 'The One-Person Invoice Machine',
    description:
      'Freelancers lose hours every month on admin — creating invoices, chasing payments, tracking what is owed. Build a lightweight invoicing tool designed for solo operators: fast to use, professional-looking output, and smart follow-up reminders that do not feel like nagging.',
  },
  {
    _id: 'ps-byo-2',
    track: 'build-your-own',
    order: 2,
    title: 'Portfolio Without the Pain',
    description:
      'Most freelancers and creators have no portfolio, or one they are embarrassed by. Build a tool that helps solo operators create and maintain a professional portfolio from their existing work — pulling from GitHub, Dribbble, social posts, or file uploads — with minimal manual effort.',
  },
  {
    _id: 'ps-byo-3',
    track: 'build-your-own',
    order: 3,
    title: 'Rate My Rate',
    description:
      'Freelancers consistently underprice their work, especially at the start. Build a tool that helps a freelancer determine a fair market rate for their skills — factoring in experience, location, niche, and current demand — and gives them language to defend that rate with clients.',
  },
  {
    _id: 'ps-byo-4',
    track: 'build-your-own',
    order: 4,
    title: 'The Scope Creep Stopper',
    description:
      "Scope creep kills freelance profitability. Build a project scoping tool that helps freelancers write clear, bounded project agreements before work begins — with templates for common project types, built-in change request flows, and a record of what was agreed.",
  },
  {
    _id: 'ps-byo-5',
    track: 'build-your-own',
    order: 5,
    title: 'Client Relationship Manager for One',
    description:
      'Freelancers need client management tools, but Salesforce is overkill. Build a lightweight CRM designed for solo operators — tracking leads, active projects, follow-ups, and communication history in a single view, without requiring setup or configuration.',
  },
  {
    _id: 'ps-byo-6',
    track: 'build-your-own',
    order: 6,
    title: 'The Content Calendar for Creators',
    description:
      'Creators burn out trying to post consistently without a system. Build a content planning tool for solo creators — helping them batch ideas, schedule posts across platforms, repurpose long-form content into short-form formats, and track what actually performs.',
  },

  // Track 4: AI That Actually Does Things
  {
    _id: 'ps-ai-1',
    track: 'ai-does-things',
    order: 1,
    title: 'The Inbox Agent',
    description:
      'Email is broken. Build an AI agent that does not just summarise your inbox — it actually handles it. Draft replies in your voice, unsubscribe from junk, flag what needs action, and archive the rest. The goal is zero inbox anxiety, not zero inbox.',
  },
  {
    _id: 'ps-ai-2',
    track: 'ai-does-things',
    order: 2,
    title: 'Research on Autopilot',
    description:
      'Deep research takes hours of tabbing between sources, synthesising notes, and organising findings. Build an AI agent that takes a research brief, autonomously searches and reads sources, and delivers a structured, cited summary — ready to act on, not just read.',
  },
  {
    _id: 'ps-ai-3',
    track: 'ai-does-things',
    order: 3,
    title: 'The Meeting Aftermath Agent',
    description:
      'Most meetings end with vague next steps and no one accountable. Build an AI agent that takes a meeting transcript or recording, extracts action items, assigns owners, creates tasks in the right tools (Notion, Linear, Slack), and follows up until things are done.',
  },
  {
    _id: 'ps-ai-4',
    track: 'ai-does-things',
    order: 4,
    title: 'Automated Competitive Intelligence',
    description:
      "Staying on top of competitors is time-consuming and usually gets deprioritised. Build an AI agent that continuously monitors competitor websites, social channels, and news — and delivers a concise weekly briefing on what's changed, what's new, and what it means for you.",
  },
  {
    _id: 'ps-ai-5',
    track: 'ai-does-things',
    order: 5,
    title: 'The Job Application Agent',
    description:
      'Applying to jobs is repetitive and demoralising. Build an AI agent that, given a target role and a resume, autonomously finds relevant openings, tailors the resume and cover letter for each, submits applications, and tracks the pipeline — so the candidate can focus on interviews.',
  },

  // Track 5: Health & Body Intelligence
  {
    _id: 'ps-hb-1',
    track: 'health-body',
    order: 1,
    title: 'The Sleep Decoder',
    description:
      'Sleep data from wearables is abundant but rarely actionable. Build a tool that analyses sleep patterns — from a wearable or manual input — and connects them to daily habits like caffeine, screen time, and exercise, surfacing specific changes that would actually improve sleep quality.',
  },
  {
    _id: 'ps-hb-2',
    track: 'health-body',
    order: 2,
    title: 'Symptom Journal That Learns',
    description:
      'Chronic symptoms are hard to communicate to doctors because patients rarely have useful data. Build a symptom tracker that learns what questions to ask over time, identifies patterns across entries, and generates a structured summary a doctor can actually use in a 10-minute appointment.',
  },
  {
    _id: 'ps-hb-3',
    track: 'health-body',
    order: 3,
    title: 'Energy Budget Planner',
    description:
      'Most people have no model of their own energy — they just run out of it. Build a tool that helps users track their daily energy levels against their activities, identify what drains and restores them, and plan their week to match high-demand tasks with high-energy windows.',
  },
  {
    _id: 'ps-hb-4',
    track: 'health-body',
    order: 4,
    title: 'The Habit-Health Connector',
    description:
      'We log habits in one app and health metrics in another, with no connection between them. Build a tool that ingests data from multiple sources — fitness trackers, food logs, mood journals — and surfaces genuine correlations: not generic advice, but insights specific to the user.',
  },
  {
    _id: 'ps-hb-5',
    track: 'health-body',
    order: 5,
    title: 'Lab Report Translator',
    description:
      "Blood test results are full of numbers with no context. Build a tool that takes a lab report — via photo or PDF upload — and explains every value in plain language: what it measures, what the user's result means, what's worth discussing with a doctor, and what lifestyle changes are relevant.",
  },
]

const mutations = problemStatements.map((ps) => ({
  createOrReplace: {
    _id: ps._id,
    _type: 'problemStatement',
    title: ps.title,
    description: ps.description,
    track: ps.track,
    order: ps.order,
  },
}))

const url = `https://${PROJECT_ID}.api.sanity.io/v${API_VERSION}/data/mutate/${DATASET}`

console.log(`Seeding ${mutations.length} problem statements to ${url} ...`)

const response = await fetch(url, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
  },
  body: JSON.stringify({ mutations }),
})

const result = await response.json()

if (!response.ok) {
  console.error('Sanity API error:', JSON.stringify(result, null, 2))
  process.exit(1)
}

const created = result.results?.filter((r) => r.operation === 'create').length ?? 0
const updated = result.results?.filter((r) => r.operation === 'update').length ?? 0
console.log(`Done. Created: ${created}, Updated: ${updated}`)
console.log('Transaction ID:', result.transactionId)
