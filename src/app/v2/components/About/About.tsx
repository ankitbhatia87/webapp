'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import RevealSection from '../RevealSection';

export default function About() {
  const [profilePhoto, setProfilePhoto] = useState('/assets/v2/brand/profile-photo.jpg');

  useEffect(() => {
    fetch('/api/assets')
      .then((response) => response.json())
      .then((assets: { profilePhoto?: string }) => {
        if (assets.profilePhoto) setProfilePhoto(assets.profilePhoto);
      })
      .catch(() => undefined);
  }, []);

  return (
    <RevealSection id="about" className="v2-section py-20">
      <div className="wrap">
        <div className="sec-head">
          <div className="kicker">About</div>
          <h2>The person behind the code.</h2>
        </div>
        <div className="about-grid">
          <div className="avatar">
            <Image
              src={profilePhoto}
              alt="Ankit Bhatia"
              width={300}
              height={300}
              className="rounded-full"
              priority
            />
          </div>
          <div className="about-text">
            <p>
              Hey! I'm Ankit - a frontend engineer, architect, and lifelong builder based in Melbourne. Over the past 16+ years, I've worked across fintech, payments and healthcare, helping teams build products that scale and engineering foundations that last. I enjoy tackling complex technical challenges, mentoring engineers, and finding simple solutions to difficult problems. When I'm not writing code or sketching architecture, you'll probably find me behind a camera, exploring photography as a creative outlet.
            </p>
          </div>
        </div>
      </div>
    </RevealSection>
  );
}
