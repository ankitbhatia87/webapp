const STATS = [
  { num: '16+', lbl: 'Years building production frontends' },
  { num: '$10M+', lbl: 'SMB funding enabled (Novo)' },
  { num: '60%', lbl: 'Of platform revenue from one feature' },
  { num: '7s→3s', lbl: 'Checkout LCP improvement (Banxa)' },
];

export default function Impact() {
  return (
    <RevealSection id="impact" className="v2-section py-12">
      <div className="wrap">
        <div className="sec-head">
          <div className="kicker">Impact</div>
          <h2>Numbers that reflect real impact.</h2>
        </div>
        <div className="impact-bar">
          {STATS.map((stat) => (
            <div key={stat.num} className="impact-stat">
              <div className="num">{stat.num}</div>
              <div className="lbl">{stat.lbl}</div>
            </div>
          ))}
        </div>
      </div>
    </RevealSection>
  );
}
import RevealSection from '../RevealSection';
