# Photography Portfolio Website - v2 Revamp

## Overview

This document outlines the v2 revamp of the photography portfolio website. The v2 branch runs in parallel with v1 (main branch) and is deployed to a separate Vercel project at `v2.ankitbhatia.com`.

## Branch Strategy

- **main** - Production v1 (ankitbhatia.com)
- **v2/revamp** - Development v2 (v2.ankitbhatia.com)

## Development Setup

### Local Development

```bash
# Ensure you're on the v2/revamp branch
git branch

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Run linter
npm run lint
```

### Environment Variables

Ensure your `.env.local` contains:

```
NEXTAUTH_SECRET=your_secret_here
NEXTAUTH_URL=http://localhost:3000 (local) or https://v2.ankitbhatia.com (production)
BLOB_READ_WRITE_TOKEN=your_blob_token
```

## v2 Features & Improvements

### Planned Enhancements

- [ ] Redesigned hero section with video background
- [ ] New photo grid layout with advanced filtering
- [ ] Enhanced lightbox with social sharing
- [ ] Blog/portfolio showcase section
- [ ] Improved mobile responsiveness
- [ ] Animation improvements with Framer Motion
- [ ] Dark mode toggle
- [ ] Performance optimizations
- [ ] SEO improvements with structured data
- [ ] Analytics integration

### v1 Features (Maintained)

✅ Multi-category photo upload and management
✅ Admin dashboard with photo CRUD operations
✅ Fullscreen lightbox viewer with keyboard/swipe controls
✅ Photography portfolio with category filtering
✅ Responsive design
✅ NextAuth authentication

## Deployment Strategy

### Prerequisites

1. **Vercel Project Setup**
   - Create a new Vercel project connected to `v2/revamp` branch
   - Name it something like "webapp-v2" or "portfolio-v2"
   - Point it to `v2.ankitbhatia.com` subdomain

2. **Environment Variables on Vercel**
   ```
   NEXTAUTH_SECRET
   NEXTAUTH_URL=https://v2.ankitbhatia.com
   BLOB_READ_WRITE_TOKEN
   ```

3. **DNS Configuration**
   - Add CNAME record: `v2 → cname.vercel.com` at your DNS registrar
   - Or use Vercel's automatic DNS management if available

### Deployment Flow

1. Push commits to `v2/revamp` branch
2. Vercel automatically deploys to `v2.ankitbhatia.com`
3. Preview each commit before merging to main
4. When v2 is production-ready:
   - Merge `v2/revamp` → `main`
   - Update `ankitbhatia.com` DNS to point to new Vercel deployment
   - Archive or deprecate the old v1 deployment

## Testing Checklist

Before merging v2 to production:

- [ ] All photography features working (upload, delete, edit, filtering)
- [ ] Lightbox functionality on all devices
- [ ] Admin panel operations
- [ ] Authentication flow
- [ ] Mobile responsiveness
- [ ] Performance metrics acceptable
- [ ] Build size within limits
- [ ] All links and navigation working
- [ ] Social sharing working correctly
- [ ] Error handling graceful

## File Structure

```
src/
├── app/
│   ├── api/
│   │   ├── photos/
│   │   │   ├── route.ts (GET)
│   │   │   ├── upload/route.ts (POST)
│   │   │   ├── delete/route.ts (POST)
│   │   │   └── update/route.ts (POST)
│   │   ├── auth/
│   │   └── [auth]/[...nextauth].ts
│   ├── admin/
│   │   ├── page.tsx
│   │   └── login/page.tsx
│   ├── photography/
│   │   └── page.tsx
│   ├── components/
│   │   ├── Button/
│   │   ├── Lightbox/
│   │   ├── Image/
│   │   └── ...
│   ├── features/
│   │   ├── Header/
│   │   ├── Footer/
│   │   └── ...
│   ├── layout.tsx
│   └── globals.css
├── lib/
│   └── types.ts
└── middleware.ts (if needed for v2)
```

## Rollback Plan

If issues occur with v2:

1. Keep `main` branch stable at all times
2. All v2 development happens on `v2/revamp` only
3. Never force-push to main
4. Create feature branches off `v2/revamp` if needed: `v2/feature-name`
5. Use git tags for version milestones: `v2.0.0-beta`, `v2.0.0-rc1`, `v2.0.0`

## Next Steps

1. ✅ Create `v2/revamp` branch
2. Create new Vercel project for v2
3. Configure v2.ankitbhatia.com subdomain
4. Start implementing v2 features
5. Test thoroughly before production deployment

## Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Vercel Deployment Guide](https://vercel.com/docs)
- [Tailwind CSS v4](https://tailwindcss.com)
- [Framer Motion](https://www.framer.com/motion/)
- [NextAuth.js](https://next-auth.js.org)

## Contact & Support

For questions or issues with v2 development, refer to the main README.md or project documentation.
