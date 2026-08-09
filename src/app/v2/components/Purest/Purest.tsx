const CARDS = [
  {
    letter: 'P',
    title: 'Performance',
    desc: 'Performance isn`t an afterthought - it`s designed into every solution through Core Web Vitals, efficient architecture, and continuous optimisation for exceptional user experiences',
  },
  {
    letter: 'U',
    title: 'User-centric',
    desc: 'Great software starts with people. Every engineering decision is shaped by user needs, product goals, and measurable customer outcomes.',
  },
  {
    letter: 'R',
    title: 'Responsive architecture',
    desc: "Engineering adaptive interfaces that deliver consistent performance and usability across devices, screen sizes, and real-world network conditions.",
  },
  {
    letter: 'E',
    title: 'Engineering Excellence',
    desc: 'Creating sustainable engineering foundations through clean architecture, reusable platforms, maintainable code, and standards that accelerate delivery across teams.',
  },
  {
    letter: 'S',
    title: 'Security & compliance',
    desc: 'Making security a core engineering principle through secure-by-default architecture, proactive risk reduction, and engineering practices that scale with the platform.',
  },
  {
    letter: 'T',
    title: 'Testability',
    desc: 'Designing software that is observable, testable, and easy to evolve, enabling teams to deliver changes with confidence and minimal risk.',
  },
];

export default function Purest() {
  return (
    <RevealSection id="purest" className="v2-section py-20">
      <div className="wrap">
        <div className="sec-head pb-10">
          <div className="kicker">My Philosophy</div>
          <h2>The PUREST approach to frontend excellence.</h2>
          <p>
            Six principles I hold every architecture decision to, and, each one earned on a real
            production system, not a whiteboard.
          </p>
        </div>
        <div className="purest-grid">
          {CARDS.map((card) => (
            <div key={card.letter} className="purest-card">
              <div className="letter">{card.letter}</div>
              <h3>{card.title}</h3>
              <p>{card.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </RevealSection>
  );
}
import RevealSection from '../RevealSection';
