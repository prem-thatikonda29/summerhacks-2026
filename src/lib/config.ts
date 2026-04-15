export const REVEAL_TIME = new Date('2026-04-16T10:00:00+05:30')

export const TRACK_SLUGS: Record<number, string> = {
  1: 'attention-economy',
  2: 'money-markets',
  3: 'build-your-own',
  4: 'ai-does-things',
  5: 'health-body',
}

export const TRACK_META: Record<string, { name: string; subtitle: string; color: string }> = {
  'attention-economy': { name: 'Productivity, Focus & Digital Wellness', subtitle: 'The Attention Economy', color: 'var(--cyan)' },
  'money-markets': { name: 'FinTech, Money & Financial Literacy', subtitle: 'Money & Markets for Everyone', color: 'var(--yellow)' },
  'build-your-own': { name: 'Creator Economy, Freelancing & Entrepreneurship', subtitle: 'Build Your Own Thing', color: 'var(--magenta)' },
  'ai-does-things': { name: 'AI Agents, Automation & Smart Assistants', subtitle: 'AI That Actually Does Things', color: '#22c55e' },
  'health-body': { name: 'HealthTech, Fitness & Wellbeing', subtitle: 'Health & Body Intelligence', color: '#a855f7' },
}
