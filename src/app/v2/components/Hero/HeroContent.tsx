export default function HeroContent() {
  return (
    <div>
      {/* Heading with gradient shimmer */}
      <h1 className="display font-bold h1-hero">
        Building scalable products through{' '}
        <span 
          className="relative z-10 bg-linear-to-r from-(--gold) via-(--blue) to-(--gold) bg-clip-text text-transparent bg-size-[200%_100%] animate-shimmer"
        >
          architecture, performance &amp; product thinking.
        </span>
      </h1>

      {/* Value Proposition */}
      <p className="value-prop">
        Staff-level Frontend Engineer with 16+ years crafting fintech and payments experiences that are fast, compliant, and built to outlast the person who wrote them.
      </p>

      {/* CTA Buttons */}
      <div className="flex flex-wrap gap-3.5 mb-8">
        <a
          href="#projects"
          className="cta-button cta-button-primary hover-lift"
        >
          View My Work →
        </a>
        <a
          href="/api/resume?download=1"
          download
          target="_blank"
          rel="noopener noreferrer"
          className="cta-button cta-button-secondary"
        >
          Download CV ↓
        </a>
      </div>

      {/* Tech Stack */}
      <div className="flex flex-wrap gap-4.5 items-center">
        <span className="mono tech-stack-label">Tech Stack</span>
        {['React', 'TypeScript', 'Next.js', 'GraphQL', 'Node.js', 'AWS'].map((tech) => (
          <span
            key={tech}
            className="tech-chip"
          >
            <span className="tech-chip-dot" />
            {tech}
          </span>
        ))}
      </div>
    </div>
  );
}
