# v2 Component Architecture Summary

## 🎯 Recommended Structure for Your v2

We've adopted the **Hybrid Approach** - combining global reusable components with route-specific components.

### Current Folder Structure (Created)

```
src/app/
├── components/                    ✅ Global Reusable Components
│   ├── Button/
│   ├── Lightbox/
│   ├── Image/
│   ├── Card/
│   ├── Icons/
│   ├── Link/
│   ├── Loader/
│   └── AuthProvider/
│
├── features/                      ✅ Shared Layout Components
│   ├── Header/
│   ├── Footer/
│   ├── Banner/
│   └── (other layout features)
│
├── hooks/                         ✅ Custom Hooks (NEW)
│   └── .gitkeep
│
├── admin/                         ✅ Admin Route
│   ├── page.tsx                   (Main page)
│   ├── layout.tsx                 (Route layout)
│   └── (components)/              (Route-specific components)
│
├── photography/                   ✅ Photography Route
│   ├── page.tsx                   (Main page)
│   ├── layout.tsx                 (Route layout)
│   └── (components)/              (Route-specific components)
│
├── api/                           ✅ API Routes
├── page.tsx                       ✅ Home Page
└── layout.tsx                     ✅ Root Layout
```

---

## 📂 Where to Put Components

### Global Components (`src/app/components/`)

Used across **multiple pages/routes**:

```typescript
// Example: src/app/components/Button/Button.tsx
// Used in: /admin, /photography, home page, everywhere

// Example: src/app/components/Modal/Modal.tsx
// Reusable modal that works in any context

// Example: src/app/components/Image/Image.tsx
// Shared image wrapper with optimization
```

**Decide:** Is this component used in 2+ places? → Put it here

---

### Route-Specific Components (`src/app/{route}/(components)/`)

Used in **only one route**:

```typescript
// Example: src/app/admin/(components)/PhotoUploadForm.tsx
// Only used in /admin page

// Example: src/app/admin/(components)/AdminStats.tsx
// Only used in /admin page

// Example: src/app/photography/(components)/CategoryFilter.tsx
// Only used in /photography page
```

**Decide:** Is this component specific to `/admin` or `/photography`? → Put it here

---

### Shared Hooks (`src/app/hooks/`)

Custom React hooks used across the app:

```typescript
// Example: src/app/hooks/useAuth.ts
// Get current user and auth status

// Example: src/app/hooks/usePhotos.ts
// Fetch and manage photos

// Example: src/app/hooks/useLocalStorage.ts
// Persist data to localStorage
```

**Decide:** Is this logic reused in multiple components? → Create a hook

---

## 🔄 Import Examples

### From Global Components
```typescript
// ✅ GOOD
import Button from '@/app/components/Button'
import Modal from '@/app/components/Modal'
import Image from '@/app/components/Image'

// From any file:
// - src/app/page.tsx
// - src/app/admin/page.tsx
// - src/app/photography/page.tsx
```

### From Route-Specific Components
```typescript
// ✅ In admin/page.tsx or admin/layout.tsx
import PhotoUploadForm from './​(components)/PhotoUploadForm'
import AdminStats from './​(components)/AdminStats'

// ✅ In photography/page.tsx
import CategoryFilter from './​(components)/CategoryFilter'
import GalleryGrid from './​(components)/GalleryGrid'
```

### From Hooks
```typescript
// ✅ From any component
import { useAuth } from '@/app/hooks/useAuth'
import { usePhotos } from '@/app/hooks/usePhotos'

function MyComponent() {
  const { user, isLoading } = useAuth()
  const { photos, loading, error } = usePhotos()
  // ...
}
```

---

## 🚀 Building v2 Features

### Step 1: Create a new hook (if needed)
```bash
cd src/app/hooks
touch useNewFeature.ts
```

### Step 2: Create global component (if reusable)
```bash
cd src/app/components
mkdir NewComponent
cd NewComponent
touch index.tsx  # Export here
touch NewComponent.tsx  # Main logic
touch types.ts  # TypeScript types
```

### Step 3: Create route-specific components
```bash
cd src/app/admin/​(components)
touch AdminFeature.tsx

cd src/app/photography/​(components)
touch GalleryFeature.tsx
```

### Step 4: Commit
```bash
git add .
git commit -m "v2: Add new feature components"
git push origin v2/revamp
```

---

## 📋 When to Refactor

### Move Local → Global When:
- ✅ Component is used in 2+ routes
- ✅ Component logic is decoupled from route
- ✅ Other developers need to reuse it

### Example:
```typescript
// Start: admin/(components)/PhotoCard.tsx
// Later: Also needed in /photography
// Action: Move to src/app/components/PhotoCard/

// Before:
import PhotoCard from './(components)/PhotoCard'

// After:
import PhotoCard from '@/app/components/PhotoCard'
```

---

## 📚 Documentation Files

You now have complete guidance:

| File | Purpose |
|------|---------|
| **V2_COMPONENT_ARCHITECTURE.md** ⭐ | This file - Architecture decisions |
| V2_QUICKSTART.md | Quick start guide |
| V2_WORKFLOW.md | Git workflow & development |
| V2_SETUP.md | Deployment & strategy |
| MULTI_CATEGORY_IMPLEMENTATION.md | How multi-category feature works |

---

## ✅ Next Steps

1. **Review** this architecture guide
2. **Create first v2 component** in `src/app/components/`
3. **Build route-specific features** in `admin/(components)/` and `photography/(components)/`
4. **Commit regularly** with clear messages
5. **Test locally** before pushing

---

## 🎓 Key Principles

1. **Reusable first** → Check if component can be global
2. **Specific second** → Create route-specific if only used there
3. **Consistent naming** → Use folder + index.tsx pattern
4. **Easy refactoring** → Moving components should be simple
5. **Clear imports** → Use absolute paths with `@/`

---

## 💡 Pro Tips

- Use `src/app/hooks/` for custom logic (reduces component size)
- Keep components **small and focused** (single responsibility)
- Use TypeScript types in `types.ts` for better DX
- Create an `index.tsx` that exports your component (cleaner imports)
- Collocate styles with components (CSS modules or Tailwind classes)

---

**Ready to start building v2? Let's go! 🚀**

Next: Read V2_WORKFLOW.md for git commands
