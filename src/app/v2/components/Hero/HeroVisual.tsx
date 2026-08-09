export default function HeroVisual() {
  return (
    <div className="hero-visual relative w-full max-w-3xl h-105 mx-auto">
      {/* Code Card */}
      <div className="card-float code-card">
        <div className="bar">
          <span />
          <span />
          <span />
        </div>
        <pre dangerouslySetInnerHTML={{__html: `
<span class="k">function</span> <span class="f">buildImpact</span>(problem) {\n  <span class="k">const</span> scope = discoverConstraints();\n  <span class="k">const</span> tradeoff = chooseArchitecture(scope);\n  <span class="k">const</span> shipped = implement(tradeoff);\n  <span class="c">// then make it someone else's</span>\n  <span class="c">// problem to maintain, safely.</span>\n  <span class="k">return</span> { shipped, ownable: <span class="s">true</span> };\n}\n`}} />
      </div>

      {/* Metric Card */}
      <div className="card-float metric-card">
        <div className="title">Proven Result - Banxa</div>
        <div className="row">
          <span>LCP (before)</span>
          <b>7.0s</b>
        </div>
        <div className="row">
          <span>LCP (after)</span>
          <b style={{ color: 'var(--green)' }}>3.0s</b>
        </div>
        <div className="row">
          <span>Fix</span>
          <b>API rework</b>
        </div>
      </div>

      {/* Architecture Card */}
      <div className="card-float arch-card">
        <div className="title">Micro-frontend architecture - Sberbank / Novo</div>
        <div className="arch-flow">
          <div className="node">
            <div className="ic" style={{ background: 'rgba(91, 140, 255, 0.15)', color: '#5B8CFF' }}>
              ⚛
            </div>
            <span>React</span>
          </div>
          <div className="arrow">→</div>
          <div className="node">
            <div className="ic" style={{ background: 'rgba(20, 184, 166, 0.15)', color: '#14B8A6' }}>
              ◆
            </div>
            <span>GraphQL</span>
          </div>
          <div className="arrow">→</div>
          <div className="node">
            <div className="ic" style={{ background: 'rgba(61, 220, 132, 0.15)', color: '#3DDC84' }}>
              ⬡
            </div>
            <span>Services</span>
          </div>
        </div>
      </div>
    </div>
  );
}
