'use client';

import { useEffect, useRef, type ReactNode } from 'react';

type RevealSectionProps = {
  id: string;
  className: string;
  children: ReactNode;
};

export default function RevealSection({ id, className, children }: RevealSectionProps) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    if (!window.matchMedia('(prefers-reduced-motion: no-preference)').matches) {
      element.classList.add('in');
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          element.classList.add('in');
        } else {
          element.classList.remove('in');
        }
      },
      { threshold: 0.12, rootMargin: '0px 0px -8% 0px' },
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return <section ref={ref} id={id} className={`${className} reveal`}>{children}</section>;
}
