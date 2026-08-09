export default function HeroBackground() {
  return (
    <div className="absolute inset-0 z-0 overflow-hidden">
      {/* Animated Grid */}
      <div className="absolute inset-0">
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(rgba(20, 184, 166, 0.07) 1px, transparent 1px),
              linear-gradient(90deg, rgba(20, 184, 166, 0.07) 1px, transparent 1px)
            `,
            backgroundSize: '44px 44px',
            animation: 'panGrid 40s linear infinite',
            WebkitMaskImage: 'radial-gradient(ellipse 65% 55% at 50% 15%, black 20%, transparent 78%)',
            maskImage: 'radial-gradient(ellipse 65% 55% at 50% 15%, black 20%, transparent 78%)',
          }}
        />
      </div>

      {/* Floating Orbs */}
      <div
        className="absolute w-[420px] h-[420px] top-[-160px] left-[-100px] rounded-full blur-[64px] animate-drift1"
        style={{ background: 'radial-gradient(circle, rgba(20, 184, 166, 0.32), transparent 72%)' }}
      />
      <div
        className="absolute w-[360px] h-[360px] top-[-40px] right-[-120px] rounded-full blur-[64px] animate-drift2"
        style={{ background: 'radial-gradient(circle, rgba(91, 140, 255, 0.22), transparent 72%)' }}
      />
      <div
        className="absolute w-[300px] h-[300px] bottom-[-160px] left-[38%] rounded-full blur-[64px] animate-drift3"
        style={{ background: 'radial-gradient(circle, rgba(61, 220, 132, 0.16), transparent 72%)' }}
      />

      {/* Gradient Overlay */}
      <div 
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(circle at 50% 0%, rgba(20, 184, 166, 0.08) 0%, transparent 60%)'
        }}
      />
    </div>
  );
}
