export default function Footer() {
  return (
    <footer className="v2-footer">
      <div className="wrap">
        <div className="cta-card">
          <h2>Let&apos;s build something amazing together.</h2>
          <p>
            Open to Staff Engineer and Frontend Architecture roles — ideally where checkout,
            payments, or compliance meet real engineering scale.
          </p>
          <div className="contact-row">
            <a className="btn-primary" href="mailto:ankitbhatia.aus@gmail.com">
              Get in touch
            </a>
            <a className="btn-ghost" href="/api/resume?download=1" download>
              Download CV ↓
            </a>
            <a
              className="btn-ghost"
              href="https://www.linkedin.com/in/bhatia87"
              target="_blank"
              rel="noopener noreferrer"
            >
              LinkedIn ↗
            </a>
          </div>
        </div>

        <div className="copyright">
          <span>© 2026 Ankit Bhatia — Essendon North, VIC</span>
          <span>Built for Staff Engineering review</span>
        </div>
      </div>
    </footer>
  );
}
