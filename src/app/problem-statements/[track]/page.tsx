import { notFound } from 'next/navigation'
import Link from 'next/link'
import { getProblemStatements } from '@/lib/queries'
import { REVEAL_TIME, TRACK_META } from '@/lib/config'

export const revalidate = 60

export function generateStaticParams() {
  return Object.keys(TRACK_META).map((track) => ({ track }))
}

export default async function ProblemStatementsPage({
  params,
}: {
  params: Promise<{ track: string }>
}) {
  const { track } = await params
  const meta = TRACK_META[track]

  if (!meta) notFound()

  const isRevealed = new Date() >= REVEAL_TIME
  const statements = isRevealed ? await getProblemStatements(track) : []

  return (
    <main className="min-h-screen bg-[var(--background)] relative pt-20 pb-16 md:pb-24">
      {/* Background grid */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage:
            'linear-gradient(var(--card-border) 1px, transparent 1px), linear-gradient(90deg, var(--card-border) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
      />

      {/* Glow blob */}
      <div
        className="absolute top-1/4 left-1/4 w-96 h-96 opacity-10 rounded-full blur-[120px]"
        style={{ background: meta.color }}
      />

      <div className="relative z-10 max-w-3xl mx-auto px-6 sm:px-8 md:px-6">
        {/* Back link */}
        <Link
          href="/#tracks"
          className="inline-block font-mono text-sm text-gray-400 hover:text-white mt-8 mb-8 transition-colors duration-200"
        >
          ← Back to Tracks
        </Link>

        {/* Track heading */}
        <h1
          className="font-pixel text-sm md:text-lg mb-1 leading-relaxed"
          style={{ color: meta.color }}
        >
          {meta.name}
        </h1>
        <p className="font-mono text-xs text-gray-500 mb-3">({meta.subtitle})</p>
        <div className="w-16 h-0.5 mb-8 md:mb-12" style={{ background: meta.color }} />

        {/* Content */}
        {!isRevealed ? (
          <div className="border-2 border-dashed border-white/20 p-5 sm:p-8 text-center">
            <p className="font-mono text-gray-400">
              Problem statements will be revealed on April 16 at 10:00 AM IST.
            </p>
          </div>
        ) : statements.length === 0 ? (
          <div className="border-2 border-dashed border-white/20 p-5 sm:p-8 text-center">
            <p className="font-mono text-gray-400">
              No problem statements yet. Check back soon.
            </p>
          </div>
        ) : (
          <div className="flex flex-col gap-6">
            {statements.map((ps, i) => (
              <div
                key={ps._id}
                className="relative border-2 border-dashed border-white/30 p-6 hover:border-white/60 transition-colors duration-300"
              >
                <div
                  className="absolute -top-3 -left-3 w-8 h-8 flex items-center justify-center font-pixel text-xs text-black"
                  style={{ background: meta.color }}
                >
                  {i + 1}
                </div>
                <h2 className="font-pixel text-xs text-white mb-3 leading-relaxed">
                  {ps.title}
                </h2>
                <p className="text-sm text-gray-400 leading-relaxed">{ps.description}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  )
}
