export default function ProblemStatements() {
  return (
    <main className="min-h-screen bg-[var(--background)] flex items-center justify-center overflow-hidden relative pt-20">
      {/* Background grid */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage:
            'linear-gradient(var(--card-border) 1px, transparent 1px), linear-gradient(90deg, var(--card-border) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
      />

      {/* Glow blobs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[var(--magenta)] opacity-10 rounded-full blur-[120px]" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[var(--cyan)] opacity-10 rounded-full blur-[120px]" />

      {/* Modal */}
      <div className="relative z-10 border-2 border-[var(--card-border)] bg-[var(--card-bg)] p-10 max-w-md w-full mx-4 text-center shadow-2xl">
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[var(--magenta)] via-[var(--yellow)] to-[var(--cyan)]" />

        <h1 className="font-[var(--font-pixel)] text-[var(--yellow)] text-lg mb-4 leading-relaxed">
          shhh...
        </h1>
        <p className="font-[var(--font-mono)] text-[var(--foreground)] text-base leading-relaxed opacity-80">
          We&apos;ll let you in on these soon.
        </p>
        <p className="font-[var(--font-mono)] text-[var(--cyan)] text-sm mt-4 opacity-60">
          Stay tuned — problem statements drop closer to the event.
        </p>

        <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[var(--cyan)] via-[var(--yellow)] to-[var(--magenta)]" />
      </div>
    </main>
  );
}
