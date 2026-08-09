'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import RevealSection from '../RevealSection';

const PROJECTS = [
  {
    slug: 'p1',
    company: 'Banxa',
    tag: 'Fintech · Crypto On-Ramp',
    title: 'Banxa — Checkout & Compliance',
    desc: 'Led frontend delivery for self-custodial wallet validation (MiCA) and reworked blocking API patterns in the checkout flow.',
    stat: 'LCP 7.0s → 3.0s',
    image: '/assets/v2/work/p1.png',
  },
  {
    slug: 'p2',
    company: 'Novo',
    tag: 'Fintech · SMB Banking',
    title: 'Novo — Debit Card & Funding Platform',
    desc: "Architected the micro-frontend SPA behind Express ACH, Novo Funding, and Debit Card — later the platform's top revenue line.",
    stat: '60% of platform revenue',
    image: '/assets/v2/work/p2.png',
  },
  {
    slug: 'p3',
    company: 'Sberbank',
    tag: 'Banking · Micro Frontends',
    title: 'Sberbank — Modular Delivery Architecture',
    desc: 'Designed reusable, independently deployable React components so teams could ship without a shared release-train bottleneck.',
    stat: 'Independent team deploys',
    image: '/assets/v2/work/p3.png',
  },
];

export default function Projects() {
  const [workBanners, setWorkBanners] = useState<Record<string, string>>({});

  useEffect(() => {
    fetch('/api/assets', { cache: 'no-store' })
      .then((response) => response.json())
      .then((assets: { workBanners?: Record<string, string> }) => {
        console.log('Fetched assets:', assets);
        if (assets.workBanners) setWorkBanners(assets.workBanners);
      })
      .catch(() => undefined);
  }, []);

  return (
    <RevealSection id="projects" className="v2-section py-20">
      <div className="wrap">
        <div className="sec-head">
          <div className="kicker">Featured Work</div>
          <h2>Some of the products I&apos;ve helped build.</h2>
        </div>
        <div className="project-grid">
          {PROJECTS.map((p) => (
            <div key={p.slug} className="project-card">
              <div
                className={`project-thumb ${p.slug}`}
                style={{
                  backgroundImage: `url(${workBanners[p.slug] || p.image})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center'
                }}
              >
                
              </div>
              <div className="project-body">
                <span className="project-tag">{p.tag}</span>
                <h3>{p.title}</h3>
                <p>{p.desc}</p>
                <span className="project-stat">{p.stat}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </RevealSection>
  );
}
