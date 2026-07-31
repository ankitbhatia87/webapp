# v2 Website Implementation Plan

## 🎯 Strategy: Complete Isolation Between v1 and v2

To make it easy to delete v1 once v2 launches, we'll use a **namespace isolation strategy**.

---

## 📁 Folder Structure (v1/v2 Isolation)

```
src/app/
├── v2/                          🆕 ALL V2 CODE GOES HERE
│   ├── page.tsx                 (v2 home page at /v2)
│   ├── layout.tsx               (v2-specific layout)
│   ├── globals-v2.css           (v2-only styles)
│   ├── components/              (v2 components - isolated)
│   │   ├── Hero/
│   │   ├── Navigation/
│   │   ├── PurestSection/
│   │   ├── ProjectCard/
│   │   ├── ImpactBar/
│   │   ├── Timeline/
│   │   ├── CallToAction/
│   │   └── ThreeJSBackground/
│   ├── hooks/                   (v2-specific hooks)
│   │   ├── useScrollParallax.ts
│   │   ├── useIntersectionObserver.ts
│   │   └── useThreeJS.ts
│   └── lib/                     (v2 utilities)
│       ├── three-setup.ts
│       └── animations.ts
│
├── components/                  ✅ V1 COMPONENTS (unchanged)
├── features/                    ✅ V1 FEATURES (unchanged)
├── admin/                       ✅ V1 ADMIN (unchanged)
├── photography/                 ✅ V1 PHOTOGRAPHY (unchanged)
├── api/                         ✅ V1 API ROUTES (shared)
├── page.tsx                     ✅ V1 HOME (unchanged)
└── layout.tsx                   ✅ V1 ROOT LAYOUT (unchanged)
```

### ✅ Benefits of This Approach

1. **Zero Conflict**: v1 and v2 never touch each other's code
2. **Easy Testing**: Access v2 at `/v2` while v1 stays at `/`
3. **Simple Deletion**: Delete `src/app/v2/` folder when ready
4. **Clean Migration**: Just move v2 routes to root when launching

---

## 🎨 Design Analysis from index-v3.html

### Visual Style
- **Dark Theme**: `--bg:#0A0B0E`, surface variations
- **Accent Colors**: Teal/Gold `#14B8A6`, Blue `#5B8CFF`, Green `#3DDC84`
- **Typography**: 
  - Display: Space Grotesk
  - Body: Inter
  - Mono: IBM Plex Mono
- **Effects**: Glassmorphism, gradients, blur, grain texture

### Key Components Needed

#### 1. **Navigation** (Sticky with scroll effects)
- Logo lockup with animation
- Nav links (Home, PUREST, Projects, Journey, About)
- CTA button
- Squeeze/expand on scroll

#### 2. **Hero Section** (Complex)
- **Background Layers**:
  - Animated grid pattern
  - 3 floating orbs with drift animations
  - Three.js constellation (desktop only)
  - Parallax shapes (6 elements)
  - Glassmorphism overlay
- **Content**:
  - Large heading with gradient shimmer animation
  - Value proposition text
  - Two CTA buttons (Primary + Ghost)
  - Tech stack chips
- **Floating Cards** (right side):
  - Code snippet card
  - Metrics card
  - Architecture flow card

#### 3. **PUREST Framework** (6-card grid)
- P = Pragmatism
- U = Users First
- R = Reliability
- E = Efficiency
- S = Simplicity
- T = Trade-offs
Each card has letter, title, description, hover effects

#### 4. **Impact Bar** (4-stat grid)
- 3x Performance boost
- 120K Users impacted
- 87% Uptime maintained
- 14 Projects shipped

#### 5. **Projects Showcase** (3-column grid)
- Each card:
  - Gradient thumbnail with title
  - Tag (SCALE/ZERO-TO-ONE/VELOCITY)
  - Project name
  - Description
  - Stat/metric
  - Hover: lift + border glow

#### 6. **Journey Timeline** (Horizontal scrollable)
- Year dots with labels
- Current position highlighted
- Connected line
- Positions: Junior → Mid → Staff → Senior Staff (current)

#### 7. **About Section**
- Avatar circle
- Bio text

#### 8. **Call-to-Action Card**
- Gradient background
- Large heading
- Contact buttons

#### 9. **Footer**
- Copyright
- Social links

---

## 🛠️ Component Breakdown

### Phase 1: Foundation Components (Week 1)

#### `src/app/v2/components/Navigation/`
```typescript
// Navigation.tsx
- Sticky header with backdrop blur
- Scroll-triggered size change
- Logo with scale animation
- Nav links with underline animation
- CTA button
```

#### `src/app/v2/components/Hero/`
```typescript
// Hero.tsx (orchestrator)
- HeroBackground.tsx (grid, orbs, glass)
- HeroContent.tsx (heading, CTA, tech chips)
- HeroVisual.tsx (floating cards)
- ThreeJSCanvas.tsx (constellation)
```

#### `src/app/v2/components/ParallaxShapes/`
```typescript
// ParallaxShapes.tsx
- 6 fixed positioned elements
- Scroll-linked transforms
- Different speeds for depth
```

### Phase 2: Content Sections (Week 2)

#### `src/app/v2/components/PurestSection/`
```typescript
// PurestSection.tsx
- 6-card responsive grid
- PurestCard.tsx (reusable)
- Hover animations
```

#### `src/app/v2/components/ImpactBar/`
```typescript
// ImpactBar.tsx
- 4-column grid (2 on mobile)
- ImpactStat.tsx (reusable)
```

#### `src/app/v2/components/ProjectsGrid/`
```typescript
// ProjectsGrid.tsx
- 3-column grid (1 on mobile)
- ProjectCard.tsx
- Gradient thumbnails
- Hover effects
```

#### `src/app/v2/components/Timeline/`
```typescript
// Timeline.tsx
- Horizontal scroll
- TimelineItem.tsx
- Connected dots
- Current position highlight
```

### Phase 3: Footer & Utilities (Week 3)

#### `src/app/v2/components/CallToAction/`
```typescript
// CallToAction.tsx
- Gradient card
- Email/Calendar buttons
```

#### `src/app/v2/components/Footer/`
```typescript
// Footer.tsx
- Copyright
- Social icons
```

### Custom Hooks

#### `src/app/v2/hooks/useScrollParallax.ts`
```typescript
export function useScrollParallax(speed: number) {
  const [offset, setOffset] = useState(0);
  
  useEffect(() => {
    const handleScroll = () => {
      setOffset(window.scrollY * speed);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [speed]);
  
  return offset;
}
```

#### `src/app/v2/hooks/useIntersectionObserver.ts`
```typescript
export function useIntersectionObserver(options) {
  // Reveal animations on scroll
}
```

#### `src/app/v2/hooks/useThreeJS.ts`
```typescript
export function useThreeJS(canvasRef) {
  // Three.js constellation setup
}
```

---

## 🎭 Animation Requirements

### CSS Animations
- **panGrid**: Grid background panning (40s)
- **drift1/2/3**: Orb floating (17s, 21s, 19s)
- **shimmer**: Gradient text shimmer (7s)
- **floatA/B/C**: Card floating (7s, 8s, 9s)
- **pfloat1/2/3**: Parallax shape floating

### Framer Motion
- Reveal animations (fade + slide + blur)
- Hover transitions
- Nav squeeze on scroll

### Three.js
- Constellation of dots
- Mouse interaction
- Respects prefers-reduced-motion

---

## 📦 Dependencies to Add

```bash
npm install three @types/three
# Already have: framer-motion, tailwind
```

---

## 🗂️ File Structure Detail

```
src/app/v2/
├── page.tsx                     # Main v2 page
├── layout.tsx                   # v2-specific layout (fonts, meta)
├── globals-v2.css               # All v2 styles
│
├── components/
│   ├── Navigation/
│   │   ├── index.tsx
│   │   ├── Navigation.tsx
│   │   └── types.ts
│   │
│   ├── Hero/
│   │   ├── index.tsx
│   │   ├── Hero.tsx
│   │   ├── HeroBackground.tsx   # Grid, orbs, glass
│   │   ├── HeroContent.tsx      # Text, buttons, chips
│   │   ├── HeroVisual.tsx       # Floating cards
│   │   ├── CodeCard.tsx
│   │   ├── MetricCard.tsx
│   │   ├── ArchCard.tsx
│   │   └── types.ts
│   │
│   ├── ThreeJSBackground/
│   │   ├── index.tsx
│   │   ├── ThreeJSBackground.tsx
│   │   └── constellation.ts     # Three.js logic
│   │
│   ├── ParallaxShapes/
│   │   ├── index.tsx
│   │   ├── ParallaxShapes.tsx
│   │   └── shapes.ts            # Shape configs
│   │
│   ├── PurestSection/
│   │   ├── index.tsx
│   │   ├── PurestSection.tsx
│   │   ├── PurestCard.tsx
│   │   └── data.ts              # PUREST content
│   │
│   ├── ImpactBar/
│   │   ├── index.tsx
│   │   ├── ImpactBar.tsx
│   │   ├── ImpactStat.tsx
│   │   └── data.ts
│   │
│   ├── ProjectsGrid/
│   │   ├── index.tsx
│   │   ├── ProjectsGrid.tsx
│   │   ├── ProjectCard.tsx
│   │   └── data.ts              # Projects data
│   │
│   ├── Timeline/
│   │   ├── index.tsx
│   │   ├── Timeline.tsx
│   │   ├── TimelineItem.tsx
│   │   └── data.ts
│   │
│   ├── AboutSection/
│   │   ├── index.tsx
│   │   └── AboutSection.tsx
│   │
│   ├── CallToAction/
│   │   ├── index.tsx
│   │   └── CallToAction.tsx
│   │
│   └── Footer/
│       ├── index.tsx
│       └── Footer.tsx
│
├── hooks/
│   ├── useScrollParallax.ts
│   ├── useIntersectionObserver.ts
│   ├── useScrollShrink.ts       # Nav shrink on scroll
│   └── useThreeJS.ts
│
└── lib/
    ├── three-setup.ts           # Three.js utilities
    ├── animations.ts            # Animation helpers
    └── constants.ts             # Colors, fonts, etc.
```

---

## 🚀 Implementation Steps

### Step 1: Setup (Day 1)
```bash
# Create v2 folder structure
mkdir -p src/app/v2/components
mkdir -p src/app/v2/hooks
mkdir -p src/app/v2/lib

# Install dependencies
npm install three @types/three

# Create base files
touch src/app/v2/page.tsx
touch src/app/v2/layout.tsx
touch src/app/v2/globals-v2.css
```

### Step 2: Layout & Styles (Day 1-2)
- Create `globals-v2.css` with all CSS from index-v3.html
- Setup fonts (Space Grotesk, Inter, IBM Plex Mono)
- Create color variables
- Setup animations

### Step 3: Navigation (Day 2)
- Build sticky nav component
- Add scroll-triggered animations
- Logo, links, CTA button

### Step 4: Hero Background (Day 3)
- Animated grid pattern
- Floating orbs
- Glassmorphism layer
- Parallax shapes

### Step 5: Hero Content (Day 3-4)
- Heading with gradient shimmer
- CTA buttons
- Tech chips
- Floating cards (code, metrics, arch)

### Step 6: Three.js Background (Day 4-5)
- Constellation setup
- Mouse interaction
- Performance optimization
- Prefers-reduced-motion support

### Step 7: Content Sections (Day 6-10)
- PUREST grid
- Impact bar
- Projects grid
- Timeline
- About
- CTA
- Footer

### Step 8: Animations & Polish (Day 11-12)
- Reveal animations
- Hover effects
- Smooth scrolling
- Mobile responsive

### Step 9: Testing & Optimization (Day 13-14)
- Cross-browser testing
- Mobile testing
- Performance audit
- Accessibility check

---

## 🔄 Migration Path (When Ready to Launch)

### Option A: Replace Root (Recommended)
```bash
# 1. Test v2 thoroughly at /v2
# 2. When ready, move everything:

# Backup v1
mv src/app/page.tsx src/app/page-v1-backup.tsx
mv src/app/layout.tsx src/app/layout-v1-backup.tsx

# Promote v2 to root
mv src/app/v2/page.tsx src/app/page.tsx
mv src/app/v2/layout.tsx src/app/layout.tsx
mv src/app/v2/components src/app/components-v2
# Update imports

# Delete v1
rm -rf src/app/components-v1
rm -rf src/app/features
rm src/app/page-v1-backup.tsx

# Keep admin/photography/api (shared)
```

### Option B: Side-by-side (Temporary)
```bash
# Keep both accessible:
# / → v1 (redirect to /v2)
# /v2 → v2 (new design)
# Gradually migrate users
```

---

## 📊 Data Structure

### Projects Data
```typescript
// src/app/v2/lib/data.ts

export interface Project {
  id: string;
  title: string;
  tag: 'SCALE' | 'ZERO-TO-ONE' | 'VELOCITY';
  description: string;
  stat: string;
  gradient: [string, string]; // CSS gradient colors
}

export const projects: Project[] = [
  {
    id: 'p1',
    title: 'Adobe Stock',
    tag: 'SCALE',
    description: '...',
    stat: '3× performance boost',
    gradient: ['#1E2A4A', '#3A2E1E']
  },
  // ...
];
```

### PUREST Data
```typescript
export interface PurestPrinciple {
  letter: string;
  title: string;
  description: string;
}

export const purestPrinciples: PurestPrinciple[] = [
  {
    letter: 'P',
    title: 'Pragmatism',
    description: 'Perfect doesn't ship...'
  },
  // ...
];
```

---

## 🎨 Tailwind + CSS Strategy

- **Use Tailwind** for layout, spacing, responsive
- **Use CSS** for complex animations (grid pan, orbs, shimmer)
- **Use Framer Motion** for reveal animations
- **Keep globals-v2.css** for theme variables and keyframes

---

## ✅ Checklist Before Starting

- [ ] Read V2_COMPONENT_ARCHITECTURE.md (understand structure)
- [ ] Install dependencies (`three`, `@types/three`)
- [ ] Create `src/app/v2/` folder
- [ ] Copy CSS from index-v3.html to globals-v2.css
- [ ] Extract all data (projects, PUREST, timeline)
- [ ] Plan component order (foundation → content → polish)

---

## 🔥 Quick Start Command

```bash
# Start development
npm run dev

# Access v2 at:
http://localhost:3000/v2

# v1 remains at:
http://localhost:3000/
```

---

## 💡 Key Principles

1. **Complete Isolation**: v2 never imports from v1 components
2. **Namespace Everything**: All v2 code in `src/app/v2/`
3. **Easy Deletion**: When ready, just `rm -rf src/app/v2/` or promote to root
4. **Shared APIs**: Keep `/api` routes shared (photos, auth)
5. **Test Separately**: v2 at `/v2`, v1 at `/`

---

**Ready to build? Start with Step 1! 🚀**

Next: Create folder structure and extract CSS
