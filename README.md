# Summer Hacks 2026 — Website

The official hackathon website for Summer Hacks 2026. Built with Next.js App Router and connected to Sanity CMS for managing mentors, judges, and partners.

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Styling**: Tailwind CSS 4
- **Animation**: Framer Motion
- **CMS**: Sanity (project ID: `h9q3fpz7`, dataset: `production`)

## Local Development

**1. Clone the repo**
```bash
git clone https://github.com/prem-thatikonda29/summerhacks-2026.git
cd summerhacks-2026
```

**2. Install dependencies**
```bash
npm install
```

**3. Set up environment variables**
```bash
cp .env.example .env.local
```

Open `.env.local` and fill in your value:
```
SANITY_REVALIDATE_SECRET=your_secret_here
```

Generate a secret with:
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

**4. Run the dev server**
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## CMS — Managing Content

All mentors, judges, and partners are managed centrally through Sanity Studio by the Summer Hacks team. The website reads from the Sanity API at build/request time — no CMS access is needed to run or deploy this site.

Content changes published in the studio appear on all connected deployments instantly via webhook revalidation.

## On-Demand Revalidation (Webhook)

When content is published in Sanity, it POSTs to `/api/revalidate` which triggers Next.js to regenerate the page immediately. As a fallback, pages also revalidate every hour automatically.

To set this up for a new deployment:

1. Generate a secret and add it to your production environment as `SANITY_REVALIDATE_SECRET`
2. In Sanity → API → Webhooks, create a new webhook:
   - **URL**: `https://your-site.com/api/revalidate?secret=YOUR_SECRET`
   - **Dataset**: `production`
   - **Trigger on**: Create, Update, Delete
   - **Filter**: `_type in ["mentor", "judge", "partner"]`
   - **HTTP method**: POST
   - **Include drafts**: Off

## Project Structure

```
src/
├── app/
│   ├── page.tsx              # Home page — fetches CMS data server-side
│   ├── api/revalidate/       # Webhook endpoint for on-demand ISR
│   └── problem-statements/   # Problem statements page
├── components/
│   ├── Speakers.tsx          # Judges & Mentors section (driven by Sanity)
│   ├── Sponsors.tsx          # Partners section (driven by Sanity)
│   └── ...                   # Hero, About, Tracks, Schedule, Prizes, FAQ, Footer
└── lib/
    ├── sanity.ts             # Sanity client
    └── queries.ts            # GROQ queries for mentors, judges, partners
```

## Deployment

The site is deployed at [itm-summerhacks.xyz](https://www.itm-summerhacks.xyz).

Make sure `SANITY_REVALIDATE_SECRET` is set in your hosting provider's environment variables before deploying.
