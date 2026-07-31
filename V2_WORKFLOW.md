# v2 Development Workflow Guide

## Quick Start

```bash
# Clone and setup
git clone <repo-url>
cd webapp-next

# Switch to v2 branch
git checkout v2/revamp

# Install dependencies
npm install

# Create .env.local from .env.example
cp .env.example .env.local

# Edit .env.local with your credentials
nano .env.local

# Start development
npm run dev

# Open browser
open http://localhost:3000
```

## Git Workflow for v2 Development

### Create Feature Branches from v2/revamp

```bash
# Always start from v2/revamp
git checkout v2/revamp
git pull origin v2/revamp

# Create a feature branch
git checkout -b v2/feature-name

# Make changes and commit
git add .
git commit -m "v2: description of changes"

# Push to remote
git push origin v2/feature-name

# Create Pull Request to v2/revamp (not main!)
# Review and test on preview deployment
# Merge when approved
```

### Important: Never commit v2 changes to main!

✅ **DO:**
- All v2 commits go to `v2/revamp` or `v2/*` branches
- Create PRs to `v2/revamp`
- Test on `v2.ankitbhatia.com` before merging

❌ **DON'T:**
- Never commit to `main` branch during v2 development
- Never merge `v2/revamp` to `main` until ready for production
- Never push directly to `main`

## Vercel Setup (One-time)

1. **Create a new Vercel project**
   - Go to [vercel.com/new](https://vercel.com/new)
   - Select this GitHub repository
   - Name: "webapp-v2" or "portfolio-v2"
   - Framework preset: Next.js
   - **Environment Variables:**
     - `NEXTAUTH_SECRET` - Same as v1
     - `NEXTAUTH_URL` - `https://v2.ankitbhatia.com`
     - `BLOB_READ_WRITE_TOKEN` - Your Vercel Blob token
   - Deploy

2. **Configure Domain**
   - In Vercel project settings → Domains
   - Add domain: `v2.ankitbhatia.com`
   - Choose DNS option or add CNAME
   - At your registrar, add: `v2 CNAME cname.vercel.com`

3. **Enable Auto-Deployment**
   - Git Integration should be automatic
   - `v2/revamp` branch → `v2.ankitbhatia.com`
   - All branches → preview deployments

## Development Checklist

### Before Starting v2 Development

- [ ] On `v2/revamp` branch (`git branch` shows `* v2/revamp`)
- [ ] All dependencies installed (`npm install`)
- [ ] `.env.local` configured with correct tokens
- [ ] Dev server running (`npm run dev`)
- [ ] Can access http://localhost:3000

### During Development

- [ ] Follow existing code patterns in v1
- [ ] Keep TypeScript strict mode (`npm run lint`)
- [ ] Test locally thoroughly
- [ ] Commit often with clear messages
- [ ] Push to feature branches, not directly to `v2/revamp`
- [ ] Create PRs for review

### Before Merging to v2/revamp

- [ ] All tests pass
- [ ] No TypeScript errors (`npm run lint`)
- [ ] Builds successfully (`npm run build`)
- [ ] Works on preview deployment
- [ ] No console errors in browser
- [ ] Mobile responsive (test on real device if possible)
- [ ] Code review completed

### Before Merging v2/revamp to main (Production)

- [ ] Complete feature parity with v1
- [ ] All v2 features thoroughly tested
- [ ] Performance acceptable (Lighthouse score check)
- [ ] SEO optimized
- [ ] Analytics configured
- [ ] User feedback collected
- [ ] Rollback plan documented
- [ ] Announce to users (if needed)

## v1 vs v2 Key Differences

### v1 (main)
- Deployed to: `ankitbhatia.com`
- Vercel Project: Original/Primary
- Status: Current production
- Updates: Bug fixes and minor improvements only

### v2 (v2/revamp)
- Deployed to: `v2.ankitbhatia.com`
- Vercel Project: New v2 Project
- Status: Development/Preview
- Updates: Major features and redesigns

## Switching Between v1 and v2

```bash
# Switch to v1 (main)
git checkout main
git pull origin main

# Switch to v2
git checkout v2/revamp
git pull origin v2/revamp
```

## Common Issues & Solutions

### "Changes not showing on v2.ankitbhatia.com"
1. Push to `v2/revamp` branch: `git push origin v2/revamp`
2. Check Vercel deployments page for progress
3. Wait 2-3 minutes for build to complete
4. Hard refresh browser (Cmd+Shift+R)

### "I accidentally committed to main!"
```bash
# Undo the last commit (keep changes locally)
git reset HEAD~1

# Switch to v2/revamp
git checkout v2/revamp

# Re-apply changes
git add .
git commit -m "v2: your message"
git push origin v2/revamp

# Push empty commit to main to restore it
git checkout main
git reset origin/main --hard
git push origin main --force-with-lease
```

### "I need to sync v2 with latest v1 changes"
```bash
git checkout v2/revamp
git merge main
# Resolve any conflicts
git push origin v2/revamp
```

### "Build is failing on Vercel"
1. Check build logs in Vercel dashboard
2. Run `npm run build` locally to reproduce
3. Fix errors and commit
4. Push to `v2/revamp`
5. Vercel will auto-rebuild

## Performance Optimization Tips

- Use Next.js Image component for photos
- Enable ISR (Incremental Static Regeneration) for gallery pages
- Implement code splitting for admin-only components
- Monitor bundle size: `npm run build` shows size report
- Use Vercel Analytics to track real performance

## Testing & QA

### Manual Testing Checklist

```
Photography Page:
- [ ] Photos load correctly
- [ ] Category filtering works
- [ ] Lightbox opens on click
- [ ] Keyboard navigation (arrows, escape)
- [ ] Mobile swipe gestures work
- [ ] Loading states show
- [ ] Error states handled

Admin Panel:
- [ ] Login works
- [ ] Upload new photos
- [ ] Edit categories
- [ ] Delete photos
- [ ] Multi-category selection works
- [ ] Admin-only access enforced

General:
- [ ] Mobile responsive (test on real phone)
- [ ] Touch interactions smooth
- [ ] No console errors
- [ ] Links navigate correctly
- [ ] Social sharing working
```

## Deployment to Production (When Ready)

```bash
# 1. Final testing on v2.ankitbhatia.com
# 2. Tag release
git checkout v2/revamp
git tag -a v2.0.0 -m "v2.0.0 - Major redesign"
git push origin v2.0.0

# 3. Merge to main
git checkout main
git merge v2/revamp
git push origin main

# 4. Vercel will auto-deploy main to ankitbhatia.com
# 5. Monitor for issues

# 6. If rollback needed
git revert HEAD
git push origin main
```

## Resources

- [Next.js 16 Docs](https://nextjs.org/docs)
- [Git Branching Guide](https://git-scm.com/book/en/v2/Git-Branching-Branch-Management)
- [Vercel Deployment Docs](https://vercel.com/docs/deployments/overview)
- [Tailwind CSS v4 Docs](https://tailwindcss.com/docs)

## Questions?

Refer to V2_SETUP.md for architecture overview or check the main README.md for general project info.
