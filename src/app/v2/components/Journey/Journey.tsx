const ITEMS = [
  { year: '2008', label: 'Web Designer,\nVinove', current: false },
  { year: '2011', label: 'Lead Engineer,\nHCL', current: false },
  { year: '2014', label: 'Sr. Interactive Dev,\nPublicis Sapient', current: false },
  { year: '2019', label: 'Technical Lead,\nTEKsystems / Epsilon', current: false },
  { year: '2021', label: 'Sr. Frontend Eng II,\nNovo', current: false },
  { year: '2024', label: 'Lead Software Eng,\nSberbank', current: false },
  { year: '2025', label: 'Senior UI Engineer,\nBanxa, Melbourne', current: false },
  { year: 'Now', label: 'Targeting Staff\nEngineer scope', current: true },
];

export default function Journey() {
  return (
    <RevealSection id="journey" className="v2-section py-20">
      <div className="wrap">
        <div className="sec-head">
          <div className="kicker">My Journey</div>
          <h2>A journey of growth, learning and building.</h2>
        </div>
        <div className="journey-track">
          {ITEMS.map((item) => (
            <div key={item.year} className={`j-item${item.current ? ' current' : ''}`}>
              <div className="j-dot" />
              <div className="j-year">{item.year}</div>
              <div className="j-label">
                {item.label.split('\n').map((line, i) => (
                  <span key={i} style={{ display: 'block' }}>{line}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </RevealSection>
  );
}
import RevealSection from '../RevealSection';
